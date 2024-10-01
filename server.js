// importa el paquete express de "node_modules"
import express from 'express';

// TODO: Desarrollar parte server: APIRest con un CRUD de productos (4 campos incluyendo a PK)

// Importem Routes
import ProductRoutes from "./routes/crud.productos.routes.js";

// creem objecte server
const server = express();
const port = 3000;

// server.get('/', (req, res) => {
//   res.send('Hello World!')
// });

server.use(express.json());
server.use("/api/v1", ProductRoutes);

server.listen(3000, () => {
    console.log(`Servidor escuchando por el puerto 3000`)
});