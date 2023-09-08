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

// const stream = fs.createReadStream(req.file.path);
  // let verificar = true;
  // let objeto = {};
  // let array = [];

  // stream.pipe(csv())
  //   .on('data', (row) => {

  //     if ((row['product_code'] === undefined) || (row['new_price'] === undefined)) {
  //       objeto.r1 = false;
  //     }

  //       if(rowCount < 1){
  //         objeto.r2 = false;
  //       }
  //       console.log(rowCount);

  //     });
      // if (!Number.isInteger(row['new_price'])) {
      //   objeto.r3 = false;
      // }

      // console.log(objeto);

      // if(verificar){
      //   const campos = campos1.length === campos2.length && campos1.every((value, index) => value === campos2[index]);
      //   if(campos){
      //     verificar = false;
      //   }else{
      //     stream.unpipe();
      //     res.json({ message: 'Informe todos os campos necessários: product_code, new_price!' });
      //   }
      // }


      // console.log('Código Produto:', row['product_code'], 'Preço Novo:', row['new_price']);