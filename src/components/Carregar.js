import React from 'react';

function Carregar() {

    const handleFileChange = (event) => {
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(document.getElementById('fileInput').files[0]){
            
        }else{
            alert('Por favor, selecione um arquivo antes de enviar.');
        }
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