const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'lucasrodriig94@gmail.com', 
        pass: 'tunc ollx syhu ryze' 
    }
});

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'lucasrodriig94@gmail.com', 
        subject: `Nuevo mensaje de ${name}`,
        text: message,
        replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Mensaje enviado: ' + info.response);
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});


//////// BASE DE DATOS PARA EL JUEGO ///////////////

const mysql = require('mysql2');


const db = mysql.createConnection({
  host: '54.80.216.7',   
  user: 'lucas',         
  password: 'admin',    
  database: 'mi_juego',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

//////////////////////////primer solicitud///////////////////////////////

app.post('/register', (req, res) => {
    const { nombre, correo, pass } = req.body;
  
    const query = 'INSERT INTO usuarios (nombre, correo, pass) VALUES (?, ?, ?)';
  
    db.query(query, [nombre, correo, pass], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user' });
        return;
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
  

//////////////////////////likes///////////////////////////////

  // Ruta para obtener el número de "Me gusta"
app.get('/', (req, res) => {
    const query = 'SELECT total_likes FROM mi_juego.likes WHERE id = 1';
    
    db.query(query, (err, result) => {
        if (err) {
            console.log(err); 
            res.status(500).json({ error: 'Error obteniendo los Me gusta' });
        } else {
            res.status(200).json(result[0]);
        }
    });
});

app.post('/like', (req, res) => {
    const query = 'UPDATE mi_juego.likes SET total_likes = total_likes + 1 WHERE id = 1';
    
    db.query(query, (err, result) => {
        if (err) {
            console.log(err); 
            res.status(500).json({ error: 'Error updating likes' });
        } else {
            res.status(200).json({ message: 'Sucess add like' });
        }
    });
});