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
  database: 'mi_juego'   
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
    const { nombre, correo, contraseña } = req.body;
  
    const query = 'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)';
  
    db.query(query, [nombre, correo, contraseña], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user' });
        return;
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
  