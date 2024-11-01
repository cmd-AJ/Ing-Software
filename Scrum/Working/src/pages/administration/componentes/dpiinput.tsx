import React from 'react';
import { useMaskito } from '@maskito/react';

/**
 * Código obtenido de github
 * Repositorio: validador-dpi-nit
 * Autor: alextello
 */
//--------------------------------------------------------------------------------
/**
 * @param {string} cui - número de DPI
 * @returns {boolean} true para CUI válido y false para CUI no válido
 */
const cuiValido = (cui: string): boolean => {
    if (!cui) {
        return false;
    }

    const cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;

    if (!cuiRegExp.test(cui)) {
        return false;
    }

    cui = cui.replace(/\s+/g, ''); // Normalize whitespace
    const depto = parseInt(cui.substring(9, 11), 10);
    const muni = parseInt(cui.substring(11, 13), 10);
    const numero = cui.substring(0, 8);
    const verificador = parseInt(cui.substring(8, 9), 10);

    const munisPorDepto = [
        17, 8, 16, 16, 13, 14, 19, 8, 24, 21, 9, 30, 32, 21, 8, 17, 14, 5, 11, 11, 7, 17
    ];

    if (depto === 0 || muni === 0) {
        return false;
    }

    if (depto > munisPorDepto.length) {
        return false;
    }

    if (muni > munisPorDepto[depto - 1]) {
        return false;
    }

    // Validate the correlativo based on the complement 11 algorithm
    let total = 0;

    for (let i = 0; i < numero.length; i++) {
        total += parseInt(numero[i]) * (i + 2);
    }

    const modulo = total % 11;

    return modulo === verificador;
}

//-------------------------------------------------------------------------

interface ContainerProps { 
    dpi: string; // Add dpi prop
    setDpi: (dpi: string) => void;
    validateDpi: boolean;
    setValidateBoolean: (validateDpi: boolean) => void;
    inputClassName: string; // Added inputClassName to the interface
}

const DpiInput: React.FC<ContainerProps> = ({ dpi, setDpi, validateDpi, setValidateBoolean, inputClassName }) => {
    const dpiMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/), ' ', ...Array(5).fill(/\d/), ' ', ...Array(4).fill(/\d/)]
        }
    });

    const validate = (value: string) => {  
        const isValid = value !== '' && cuiValido(value);
        setValidateBoolean(isValid);
        return isValid; // Return the validation result
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Validate before updating the parent state
        if (validate(value)) {
            setDpi(value); // Update parent state only if valid
        }
    }

    return (
        <div>
            <input
                type="text"
                value={dpi} // Use the dpi prop directly
                onChange={handleInputChange} // Use standard onChange
                placeholder="INGRESA TU DPI"
                className={inputClassName} // Use inputClassName prop for styling
                ref={dpiMask} // Apply Maskito to manage input masking
            />
            {/* Display an error message if the input is invalid */}
            {!validateDpi && <span className="error">Invalid DPI</span>}
        </div>
    );
}

export default DpiInput;
