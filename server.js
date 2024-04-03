const { log } = require('console');
const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Use the cors middleware
app.use(cors());

// Servir os arquivos estáticos na pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'pages/html/neo.html'));
});

app.get('/neo.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'pages/html/neo.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no localhost:${PORT}`);
});
