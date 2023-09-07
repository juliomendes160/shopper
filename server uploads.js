const express = require('express');
const cors = require('cors');
const multer = require('multer')
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando!');
});

app.post('/upload', upload.single('file'), (req, res) => {
  fs.readFile(req.file.path, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
    console.log(data);
  });

  res.json({ message: 'Arquivo CSV recebido com sucesso.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});