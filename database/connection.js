import mysql from "mysql2/promise";

// 'mysql://root:password@localhost:3306/test'
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
    
} catch (error) {
    console.log(err);
}

export default connection;