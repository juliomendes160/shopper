const express = require('express');
const cors = require('cors');
const multer = require('multer')
const mysql = require('mysql');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = process.env.PORT || 3001;

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1992',
  database: 'shopper',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

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

  const stream = fs.createReadStream(req.file.path);
  let message = "";
  let verificar = true;

  stream.pipe(csv())
  .on('data', (row) => {
    const campos1 = ['product_code', 'new_price'];
    const campos2 = Object.keys(row);

    if(verificar){
      const campos = campos1.length === campos2.length && campos1.every((value, index) => value === campos2[index]);
      if(campos){
        verificar = false;
      }else{
        stream.unpipe();
        res.json({ message: 'Informe todos os campos necessários: product_code, new_price!' });
      }
    }



    console.log('Código Produto:', row['product_code'], 'Preço Novo:', row['new_price']);
  })
  .on('end', () => {
    res.json({ message: 'Leitura do arquivo concluída.' });
  })
  .on('error', (error) => {
    message = 'Erro ao ler o arquivo:';
    console.error(message, error);
  });

  
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});