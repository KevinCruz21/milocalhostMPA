const express = require('express');
const app = express();
const port = 3000;
// Get the client
const mysql = require('mysql2/promise');

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'registro',
});
console.log("🟢 Iniciando el servidor...");

app.get('/', (req, res) => {
    console.log("🔵 Se recibió una solicitud en '/'");
    res.send('Hello World!');
});
app.get('/registro',async (req, res) => { //req = request, peticion; res = response, respuesta
    const datos = req.query;
    // A simple SELECT query
try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
      [datos.usuario, datos.clave]
    );
    if (results.length > 0){
        res.status(200).send(`Registro exitoso`)
    } else {
        res.status(401).send(`Datos incorrectos`)
    }
  
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
});
app.get('/validar', (req, res) => {
    res.send('Sesion Validada');
});


app.listen(port, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${port}`);
});