const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer')
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

function Consutar(code){
  const codigoProduto = code; // Substitua pelo código desejado


const sql = 'SELECT COUNT(*) AS count FROM products WHERE code = ?';

connection.query(sql, [codigoProduto], (err, results) => {
  if (err) {
    console.error('Erro ao executar a consulta:', err);
    return;
  }

  const rowCount = results[0].count;

  if (rowCount > 0) {
    return true;
  } else {
    return false;
  }

  connection.end();
});
}

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
        
      }
    }

    if(Consutar(row['product_code'])){
      console.log(`O código ${codigoProduto} existe na tabela products.`);
    }else{
      console.log(`O código ${codigoProduto} não existe na tabela products.`);
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

  res.json({ message: 'Arquivo CSV recebido com sucesso.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});