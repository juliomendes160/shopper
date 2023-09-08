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

app.post('/upload', upload.single('file'), async (req, res) => {
  let objeto = {};
  let array = [];

  fs.readFile(req.file.path, 'utf8', (err, data) => {
    const linhas = data.split('\n');

    linhas.forEach(async (linha, index) => {

      const colunas = linha.split(',');

      if (index != 0) {

        if ((linhas[0].split(',')[0] != 'product_code') && (linhas[0].split(',')[1] != 'new_price')) {
          objeto.r1 = false;
        } else {
          objeto.r1 = true;
        }

        const sql = 'SELECT COUNT(*) AS count FROM products WHERE code = ?';

        const resultados = await Promise.all(
          linhas.slice(1).map(async (linha) => {
            const colunas = linha.split(',');
            const rowCount = await new Promise((resolve, reject) => {
              connection.query(sql, colunas[0], (err, results) => {
                if (err) {
                  console.error('Erro ao executar a consulta:', err);
                  reject(err);
                  return;
                }
                resolve(results[0].count);
              });
            });
            return rowCount;
          })
        );
        
        objeto.r2 = resultados;
       
        const decimal = /^[0-9]+\.[0-9]{2}/;
        if (!decimal.test(colunas[1])) {
          objeto.r3 = false;
        } else {
          objeto.r3 = true;
        }

        array.push(objeto);

        if (linhas.length - 1 == index) {
          console.log(array);
          res.json(array);
        }
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});