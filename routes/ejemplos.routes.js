// Si queremos exportar estas rutas de mi server, necesito utilizar la clase Router de express
import express from 'express';
// podemos obviar new
const router = new express.Router();

router.get('/', function (req, res) {
    res.send('Hello World GET!');
});

router.post('/', function (req, res) {
    res.send('Hello World POST!');
  });

router.put('/', function (req, res) {
    res.send('Hello World PUT!');
  });

router.delete('/', function (req, res) {
    res.send('Hello World DELETE!');
  });

  export default router;