// Importamos express
import express from 'express';
// Import routes
import ejemplosRoutes from "./routes/ejemplos.routes.js";
import UserRoutes from './routes/crud.user.routes.js';

// Import database connection
// import connection from './database/connection.js';

// connection.query("select * from test;")

// creamos un objeto "server"
const server = express()
const port = 3000;

// gestión de req json
server.use(express.json());
// rutes / endpoints
// use(): Método para asignar middlewares
// "/api/v1": parte inicial de la URL antes de los endpoints
server.use("/api/v1", ejemplosRoutes, UserRoutes);

// crear servidor
server.listen(port, () => {
  console.log(`Servidor escuchando por el puerto ${port}`)
})
