const express = require("express");
const api = new express();
require("dotenv").config();

const userRoutes = require("./routes/user.routes.js");

// config middlewares 
api.use(express.json());
api.use("/api/v1",userRoutes);
api.use((req, res) => { // 404
    res.status(404).json({ 
        message: "Ruta no encontrada",
        error: "Error 404"
    });
});

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => {
    console.log(`Servidor corriendo en "http://localhost:${PORT}`);
});
