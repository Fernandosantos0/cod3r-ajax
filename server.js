const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const { resolve } = require('path');

// Invocando o express
const app = express();

// Criando uma pasta estática
app.use(express.static(resolve(__dirname)));

// Tratando os dados passado no body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando o módulo de upload de arquivos
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, resolve(__dirname, 'upload'));
    },
    filename: function(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}}`);
    }
});

const upload = multer({ storage }).single('arquivo');

// Rotas
app.get('/teste', (req, res) => res.status(200).send('Ok'));

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if(err) return res.status(400).end('Ocorreu um erro.');

        res.status(201).end('Concluído com sucesso');
    });
});

app.post('/formulario', (req, res) => {
    res.status(201).send({
        ...req.body,
        id: 1
    });
});

app.get('/parOuImpar', (req, res) => {
    const par = parseInt(req.query.numero) % 2 === 0;
    res.send({
        resultado: par ? 'par' : 'ímpar'
    })
});

app.listen(8080, '127.0.0.1', () => console.log('Executando...'));