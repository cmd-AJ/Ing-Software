import React from 'react';
import './InputStyles.css';

interface ContainerProps {
    type: boolean
    image: string;
    setImage: (image: string) => void;
  }
  
  const FileUpload: React.FC<ContainerProps> = ({ image, setImage, type }) => {
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
              className='img-input-size'
          >
              {/* Botón con imagen */}
              <label htmlFor="file-upload" style={{width: '100%', display: 'flex',justifyContent: 'center'}}>
                  <img
                      src={image}
                      alt="Subir archivo"
                      className={type ? 'rectangular-image-upload' : 'circular-image-upload'}
                  />
              </label>
              {/* Input de tipo file oculto */}
              <input
                    id='file-upload'
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
              />
          </div>
      );
  };
  
  export default FileUpload;
  