import express from "express"
import { pool } from "./db.js"

const alert = () => window.alert("tenco")

const app = express()
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/vuelo', async(req, res)=>{
    const [resultado] = await pool.query('select * from vuelo')
    const vista = 
    `<div>
        <table style="border:1.5px solid black">
            <thead>
                <th style="border:1.5px solid black">cuidad origen</th>
                <th style="border:1.5px solid black">cuidad destino</th>
            </thead>
            <tbody>
            ${resultado.map(viaje=>{
                return '<tr><td style="border:1.5px solid black">'+ viaje.pais_destino +'</td><td style="border:1.5px solid black">'+ viaje.pais_origen +'</td></tr>'
            })}
            </tbody>
        </table>
    </div>`

    res.send(resultado)
    
})

app.get('/reserva/:rut', async (req, res) => {
    const rut = req.params.rut;
  
    try {
      const [rows] = await pool.query('SELECT * FROM reserva WHERE rut_cliente = ?', [rut]);
  
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: 'No se encontró ninguna reserva para el Rut proporcionado.' });
      }
    } catch (error) {
      console.error('Error al obtener la reserva:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

app.put('/cliente/:rut', async (req, res) => {
    const rut = req.params.rut;
    const { nombre, apellido, correo, telefono } = req.body;
  
    try {
      const [result] = await pool.query('UPDATE cliente SET nombre=?, apellido=?, correo=?, telefono=? WHERE rut=?', [nombre, apellido, correo, telefono, rut]);
  
      if (result.affectedRows > 0) {
        res.json({ message: 'Cliente actualizado correctamente.' });
      } else {
        res.status(404).json({ message: 'No se encontró ningún cliente para el Rut proporcionado.' });
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  });

app.get('/cliente/:rut', async (req, res) => {
    const rut = req.params.rut;
  
    try {
      const [rows] = await pool.query('SELECT * FROM cliente WHERE rut = ?', [rut]);
  
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: 'No se encontró ningún cliente para el Rut proporcionado.' });
      }
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  });

app.delete('/cliente/:rut/reserva', async (req, res) => {
    const rut = req.params.rut;
  
    try {
      // Buscar la reserva asociada al Rut del cliente
      const [reserva] = await pool.query('SELECT * FROM reserva WHERE rut_cliente = ?', [rut]);
  
      if (reserva.length > 0) {
        // Si se encuentra la reserva, eliminarla
        const [result] = await pool.query('DELETE FROM reserva WHERE rut_cliente = ?', [rut]);
  
        if (result.affectedRows > 0) {
          res.json({ message: 'Reserva cancelada correctamente.' });
        } else {
          res.status(500).json({ message: 'Error al cancelar la reserva.' });
        }
      } else {
        // Si no se encuentra la reserva
        res.status(404).json({ message: 'No se encontró ninguna reserva para el Rut proporcionado.' });
      }
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  });

  app.
  get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario_reserva.html');
  });
  
  app.post('/cliente/:rut/reserva', (req, res) => {
    const { id_estado_reserva, rut_cliente, id_vuelo } = req.body;
  
    const sql = 'INSERT INTO reserva (id_estado_reserva, rut_cliente, id_vuelo) VALUES (?, ?, ?)';
    connection.query(sql, [id_estado_reserva, rut_cliente, id_vuelo], (err, result) => {
      if (err) {
        console.error('Error al agregar reserva:', err);
        res.send('Error al agregar reserva');
      } else {
        console.log('Reserva agregada correctamente');
        res.send('Reserva agregada correctamente');
      }
    });
  });
  

app.listen(3000)


console.log("Escuchando en puerto 3000")
