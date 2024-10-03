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

exports.getAllUsers = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await connection.query("select * from users");
        // TODO: Verificar porque no sale el mensaje "No se encontraron usuarios"
        if (result.length === 0) {            
            return res.status(206).json({
                message: "No hi ha usuaris a la base de dades "
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
        const Userid = req.params.id;
        const [result] = await connection.query(`SELECT * FROM users WHERE id = "${Userid}"`);
        return res.status(200).json(result);
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
        // TODO: Que el email no este registrado en MySQL.
        const id = uuidv4();
        const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        // evitar inyección sql
        connection = await db.getConnection();
        const sql = "insert into users values(?, ?, ?, ?, default, default )";
        await connection.query(sql, [id, username, email, hashPassword]);
        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: { id, username, email, hashPassword }
        })

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
        connection = await db.getConnection();
        const UserId = req.params.id;
        const { username, email, password} = req.body;
        
        const [result] = await connection.query(`UPDATE users SET  WHERE id = "${Userid}"`);
        res.status(201).json({
            message: "Usuario eliminado correctamente"
        })

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
        connection = await db.getConnection();
        const Userid = req.params.id;
        const [result] = await connection.query(`DELETE FROM users WHERE id = "${Userid}"`);
        // return res.status(200).json(result);
        res.status(201).json({
            message: "Usuario eliminado correctamente"
        })
    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo eliminar el usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}

// TODO: get_id, put i delete