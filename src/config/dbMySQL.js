const mysql = require("mysql2/promise");

// El uso de un pool de conexiones permite:
// 1- Compartir conexiones: Puedes reabrir una serie de conexiones en lugar de abrir una cada vez.
// 2- Evitar cuellos de botella: Administra conexiones y las reasigna según las necesidades
// 3- AL tener disponible la conexión, nos evita la necesidad de utilizar await en la conexión de la misma
let db;
try {
    db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        connectionLimit: 5, // Máx de conexiones en el pool
    });
    console.log(`Conectado al servidor de MySQL: ${process.env.DB_HOST}`);
} catch (error) {
    console.log("Error en la conexión MySQL server: " + error);
}

module.exports = db;
