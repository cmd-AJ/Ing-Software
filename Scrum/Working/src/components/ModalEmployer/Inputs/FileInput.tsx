import React from "react";

interface ContainerProps {
  image: string;
  setImage: (image: string) => void;
}

const FileUpload: React.FC<ContainerProps> = ({ image, setImage }) => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          const file = files[0]; // Accede al primer archivo seleccionado
      
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              setImage(reader.result.toString());
            }
          };
          reader.readAsDataURL(file);
      
          console.log("Archivo seleccionado:", file);
          // Aquí puedes manejar el archivo seleccionado, como cargarlo a un servidor o procesarlo de alguna manera
        }
      };
      

  return (
    <div
      style={{
        marginTop: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      {/* Botón con imagen */}
      <label htmlFor="file-upload">
        <img
          src={image} // Cambiado de href a src para la imagen
          alt="Subir archivo"
          height="100px"
          style={{ cursor: "pointer", borderRadius: '50%' }}
        />
      </label>
      {/* Input de tipo file oculto */}
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUpload;
