import React, { useState } from 'react';

function Carregar() {
    
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            console.log(selectedFile);
        } else {
        alert('Por favor, selecione um arquivo antes de enviar.');
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileInput"></label>
                    <input type="file" id="fileInput" onChange={handleFileChange}/>
                </div>
                <button type="submit">VALIDAR</button>
            </form>
        </div>
    );
}

export default Carregar;