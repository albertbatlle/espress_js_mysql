import mysql from "mysql2/promise";

// TODO: Añadir la conexión a MySQL
const dataConnection = {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "test"
}

const URLConnection = `
    mysql://${dataConnection.user}:${dataConnection.password}@${dataConnection.host}:${dataConnection.port}/${dataConnection.database}
`;

try {
    var connection = await mysql.createConnection(URLConnection);
    console.log("Conexión a MySQL correcta!");
    
} catch (err) {
    console.log(err);
}


export default connection;