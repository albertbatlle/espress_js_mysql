import express from 'express';
const router = express.Router();
import connection from '../database/connection.js';
import { v4 as uuidv4 } from 'uuid';


// TODO: Crear las rutas para el CRUD productos. Validar los datos:
// - Que llegue el objecto por el body
// - Que llegue con las props adecuadas
// - Que lleguen los valores de las prop adecuadas

router.get('/products', async (req, res) => {
    //res.send('Got a POST request')
    try{
        const sql = 'SELECT * FROM products;';
        const [result] = await connection.query(sql);
        return res.json(result);
    } catch (error){
        console.log(error);        
    }
  })

router.get('/product/:id', async(req, res) => {
    try {
        const ProductId = req.params.id;
        const sql = `SELECT * FROM products WHERE IdProduct = "${ProductId}";`;
        const [result] = await connection.query(sql);
        return res.json(result);
    } catch (error) {
        console.log(error);
    }
})

router.post('/product/', async (req, res) => {
    //res.send('Got a POST request')
    const ProductBody = req.body;
    try {
        const ProductId = uuidv4();
        const sql =
            `INSERT INTO products VALUES ("${ProductId}", "${ProductBody.name_product}", ${ProductBody.uds}, default);`;
            await connection.query(sql);
            res.json({ "msg": "Producto registrado correctamente!" });
    } catch (err) {
        console.log(err);        
    }
  })

router.put('/product/:id', async(req, res) => {
    // res.send('Got a PUT request at /user')
    try {
        const ProductId = req.params.id;
        const ProductBody = req.body;
        const sql =
            `UPDATE products set name_product = "${ProductBody.name_product}" WHERE IdProduct = "${ProductId}";`;
            await connection.query(sql);
            res.json({ "msg": "Producto modificado correctamente!"});
    } catch (err) {
        console.log(err);
    }
    

  })

router.delete('/product/:id', async(req, res) => {
    //res.send('Got a DELETE request at /user')
    try {
        const ProductId = req.params.id;
        const sql =
            `DELETE FROM products WHERE IdProduct = "${ProductId}";`;
            await connection.query(sql);
            res.json({ "msg": "Producto suprimido correctamente!" });
    } catch (err) {
        console.log(err);
    }
  })

export default router;