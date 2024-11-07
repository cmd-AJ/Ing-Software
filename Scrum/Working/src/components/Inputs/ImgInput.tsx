import React, { useEffect, useState } from 'react';
import './InputStyles.css';

interface ContainerProps {
    type: boolean;
    image: string;
    setImage: (image: string) => void;
}
  
const FileUpload: React.FC<ContainerProps> = ({ image, setImage, type }) => {
   const [img, setImg] = useState(false)

   useEffect(() => {
	if (image === '') {
		setImg(false)
	} else {
		setImg(true)
	}
   },[image])

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
        
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result.toString());
                }
            };
            reader.readAsDataURL(file);

        }
    };

    return (
        <div className='img-input-size'>
           { img && <label htmlFor="file-input" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
               
                    <img
                        src={image}
                        alt="Subir archivo"
                        className={type ? 'rectangular-image-upload' : 'circular-image-upload'}
                    />
                
            </label>}
            {/* Input de tipo file oculto */}
            <input
                id="file-input"
                type="file"
                accept="image/*"
                style={ img ? { display: 'none' } : {}} 
                onChange={handleFileUpload}
            />
        </div>
    );
};
  
export default FileUpload;

