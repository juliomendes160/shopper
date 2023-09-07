import React from 'react';
// import axios from 'axios';

function Carregar() {

    var file = null;

    const handleFileChange = (event) =>{
        file =  document.getElementById("fileInput").files[0]
        console.log(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!file) return alert('Por favor, selecione um arquivo antes de enviar.');

        // try {
        //     const formData = new FormData();
        //     formData.append('file', selectedFile);
      
        //     // Faça a solicitação POST para o servidor Node.js
        //     const response = await axios.post('http://seu-servidor:porta/upload', formData, {
        //       headers: {
        //         'Content-Type': 'multipart/form-data', // Certifique-se de definir o tipo de conteúdo correto
        //       },
        //     });
      
        //     console.log(response.data); // Exiba a resposta do servidor no console
      
        //     // Lide com a resposta do servidor, se necessário
      
        //   } catch (error) {
        //     console.error('Erro ao enviar o arquivo:', error);
        //     // Lide com erros, se necessário
        //   }
    };
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Formulário de Envio de Arquivo</h1>
                <div>
                    <label htmlFor="fileInput"></label>
                    <input type="file" id="fileInput" onChange={handleFileChange}/>
                </div>
                <button type="submit">VALIDAR</button>
            </form>
        </>
    );
}

export default Carregar;