const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando!');
});

app.post('/upload', (req, res) => {

  console.log(req.body);

  res.json({ message: 'Arquivo CSV recebido com sucesso.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});