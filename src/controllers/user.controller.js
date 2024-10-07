const db = require("../config/dbMySQL.js");
const { v4: uuidv4 } = require('uuid');
// uuidv4()
// "G6A(7Hr|_ed$jr7#5k}?"
const CryptoJS = require("crypto-js");
const Joi = require("joi");
const connection = require("../config/dbMySQL.js");
// creamos schema de validacion de user
const userSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const userUpdateSchema = Joi.object({
    username: Joi.string().min(3).max(15),
    password: Joi.string().min(6)
});

exports.getAllUsers = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await connection.query("select * from users");
        // TODO: Verificar porque no sale el mensaje "No se encontraron usuarios"
        if (result.length === 0) {            
            return res.status(200).json({
                message: "No hay usuarios en la base de datos"
            });
        }      
        
        return res.status(200).json({result});
    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo obtener los usuarios",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}

exports.getUserById = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await db.query(`SELECT * FROM users WHERE id = ?`, [req.params.id]);
        if (result.length === 0) {
            return res.status(400).json({
                message: "No se pudo obtener el usuario con id: "+ req.params.id
            });
        }
        return res.status(200).json({
            message: "Usuario encontrado",
            result
        })

    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo obtener el usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}

exports.createUser = async (req, res) => {
    let connection;
    try {        
        // validar
        const { error } = userSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                "message": error.details[0].message,
                error: "Error de validación general"
            });           
        }
        // destructuring object (te lo deja en un objeto de 3 constantes en este caso: username, email y password, los nombres tienen que ser igual a la propiedad del dato)
        const { username, email, password} = req.body;
        connection = await db.getConnection();
        // TODO: Que el email no este registrado en MySQL.
        const [userEmailExists] = await db.query("select email from users where email = ?", [email]);
        if (userEmailExists.length > 0) {
            return res.status(400).json({
                message: `Usuario con email: ${email} ya existe!`,
                error: "Error de validación."
            });
        }

        const id = uuidv4();
        const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        // evitar inyección sql        
        const sql = "insert into users values(?, ?, ?, ?, default, default )";
        await db.query(sql, [id, username, email, hashPassword]);
        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: { id, username, email, hashPassword }
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo registrar el usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}

exports.updateUser = async (req, res) => {
    let connection;
    try {
        const id = req.params.id;        
        connection = await db.getConnection();
        // validar si la id por la url existe
        const [result] = await db.query("select * from users where id = ?", [id]);
        if (result.length === 0) {
            return res.status(400).json({
                message: "No se encontro usuario con id: " + id
            });
        }
        // validar el formato (en este caso, no dejamos que deje actualizar el mail)
        const { error } = userUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        }

        const { username, password } = req.body;

        const updateFields = [];
        const values = [];
        
        // construimos la consulta dinámicamente
        if (username) {
            updateFields.push("username = ?");
            values.push(username);
        }
        const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        if (password) {
            updateFields.push("password = ?");            
            values.push(hashPassword);
        }
        values.push(id);

        // validar que no vengan otras props
        if (updateFields.length === 0) {
            return res.status(400).json({ 
                message: "No se han proporcionado los datos de validación correctos ('username' y 'password')",
                error: "Error de validación"
            });
        }

        const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
        await db.query(sql, values);
        res.status(201).json({
            message: "Usuario modificado correctamente",
            user: { id, username, hashPassword }
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo modificar el usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }

}

exports.deleteUser = async (req, res) => {
    let connection;
    try {
        const Userid = req.params.id;
        connection = await db.getConnection();
        
        const [result] = await connection.query(`SELECT * FROM users WHERE id = ?`, [Userid]);
        if (result.length === 0) {
            return res.status(400).json({
                message: "No se encontro usuario con id: " + Userid
            });
        }
        await db.query(`DELETE FROM users WHERE id = ?`, [Userid]);
        return res.status(200).json({
            message: "Usuario eliminado correctamente",
            result
        });
        
    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo eliminar el usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}
