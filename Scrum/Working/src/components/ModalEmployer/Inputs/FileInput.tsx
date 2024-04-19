import React from 'react';

const FileUpload = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Accede al primer archivo seleccionado
    console.log('Archivo seleccionado:', file);
    // Aquí puedes manejar el archivo seleccionado, como cargarlo a un servidor o procesarlo de alguna manera
  };

  return (
    <div>
      <h2>Subir archivo</h2>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;