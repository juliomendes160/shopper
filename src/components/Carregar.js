import React from 'react';
import axios from 'axios';

function Carregar() {

    let file = null;

    const handleFileChange = (event) => {
        file = document.getElementById("fileInput").files[0]
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file){
            alert('Por favor, selecione um arquivo antes de enviar.');
            return
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
        }
        catch (error) {
            console.error('Erro ao enviar o arquivo:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Formulário de Envio de Arquivo</h1>
                <div>
                    <label htmlFor="fileInput"></label>
                    <input type="file" id="fileInput" onChange={handleFileChange} />
                </div>
                <button type="submit">VALIDAR</button>
            </form>
        </>
    );
}

export default Carregar;