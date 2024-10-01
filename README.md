# express_mysql_base
Ejemplo base de un servidor web que conecta con MySQL

# Pasos para crear un proyecto en NodeJS, en este caso un servidor web que conecta con MySQL

## 1- Paso (inicia un proyecto, creando un archivo: package.json)
```
npm init
```
- package.json: Incluye toda la info de nuestro proyecto y sus dependencias. Es un archivo IMPORTANTE!

## 2- Instalar Dependencias (en nuestro caso express y mysql2)
```
npm install express mysql2
```
## 3- Desinstalar paquetes:
```
npm uninstall "nombre paquete"
```
## 4- En el caso de tener un nuevo repositorio clonado, no aparece la carpeta de las dependencias físicas (node_modules). Al tener el package.json, ejecutamos este comando en terminal:
```
npm install 
```

## 5- Express: Framework para crear servidor web. 
### Documentación
https://expressjs.com/

## 6- Crear "hola mundo" (para utilizar import), añadir en el package.json la prop "type" y valor "module"
```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
## 7- Separar las rutas en otra carpeta: "routes"

## 8- Conexión al servidor MySQL con el paquete "mysql2" en la ruta: "database/connection.js". Esta conexión la exportamos ya que nos servirá en otros módulos crear consultas con el método "query"

## 9- Crear el CRUD en las rutas

## 10- Si añadimos en el "package.json" esta linea:  
```
"scripts": {
    "start": "node --watch server"
  },
```
## podremos arrancar el servidor sin tanto código:
```
npm start
```

Webserver -> Devuelve maquetación para el navegador.

API REST 
