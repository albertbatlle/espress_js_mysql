// TODO: Desarrollar el código para las funciones de "/signin", "/singup"
const db = require("../config/dbMySQL.js");
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// creamos schema de validacion
const userSignupSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const userSigninSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Signup o Creación user
exports.signupUser = async (req, res) => {
    let connection;
    try {        
        // validar
        const { error } = userSignupSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                "message": error.details[0].message,
                error: "Error de validación general"
            });           
        }
        // destructuring object (te lo deja en un objeto de 3 constantes en este caso: email y password, los nombres tienen que ser igual a la propiedad del dato)
        const { username, email, password } = req.body;
        connection = await db.getConnection();
        // TODO: Que el email no este registrado en MySQL.
        const [userEmailExists] = await db.query("select email from users where email = ?", [email]);
        if (userEmailExists.length > 0) {
            return res.status(400).json({
                message: `Usuario con email: ${email} ya registrado!`,
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

// Signin o Login
exports.signinUser = async (req, res) => {
    let connection;
    try {     
        
        // validar el formato
        const { error } = userSigninSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        }

        // destructuring
        const { email, password } = req.body;
        connection = await db.getConnection();
        
        // Obtenemos la información de la base de datos
        const [user] = await connection.query("select * from users where email = ?", [email]);
        if (user.length === 0) {
            return res.status(200).json({
                message: `Usuario con email: ${email} no encontrado `,
                error: "Error de inicio de sesión"
            });            
        }
        
        // desencriptar password
        const originalPassword  = CryptoJS.AES.decrypt(user[0].password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
        if (originalPassword !== password) {
            return res.status(200).json({
                message: "Password incorrecto",
                error: "Error de inicio de sesión"
            });
        }

        const token = jwt.sign ({ 
            id: user[0].id,
            email: user[0].email
         }, process.env.JWT_SECRET, {expiresIn: "1h"});

        return res.status(200).json({
            message: "Login OK!",
            token,
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

// Iniciación del perfil
exports.profile = async(req, res) => {
    res.json({
        message: "Bienvenido a tu perfil de usuario: " + req.user.email,
        user: req.user
    });
    
}

// Ruta privada
exports.private = async(req, res) => {
    res.json({
        message: `Bienvenido ${req.user.email} a tu ruta privada`
    })
}