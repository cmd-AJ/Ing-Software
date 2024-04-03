import React, { useState } from 'react'
import { InputChangeEventDetail, IonInput } from '@ionic/react'
import { useMaskito } from '@maskito/react'
import './Input.css'


/**
 * Código obtenido de github
 * Repositorio: validador-dpi-nit
 * Autor: alextello
 */
//--------------------------------------------------------------------------------
/**
 * @param {string} cui - número de DPI
 * @returns {boolean} true para CUI válido y false para CUI no válido
 * */
const cuiValido = (cui: string): boolean => {
    if (!cui) {
        return false;
    }

    var cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;

    if (!cuiRegExp.test(cui)) {
        return false;
    }

    cui = cui.replace(/\s+/g, ''); //Arreglo en la expresión regular utilizada (antes: /\s/, después: /\s+/g)
    var depto = parseInt(cui.substring(9, 11), 10);
    var muni = parseInt(cui.substring(11, 13));
    var numero = cui.substring(0, 8);
    var verificador = parseInt(cui.substring(8, 9));

    var munisPorDepto = [
        /* 01 - Guatemala tiene:      */ 17 /* municipios. */,
        /* 02 - El Progreso tiene:    */  8 /* municipios. */,
        /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */,
        /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */,
        /* 05 - Escuintla tiene:      */ 13 /* municipios. */,
        /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */,
        /* 07 - Sololá tiene:         */ 19 /* municipios. */,
        /* 08 - Totonicapán tiene:    */  8 /* municipios. */,
        /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */,
        /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */,
        /* 11 - Retalhuleu tiene:     */  9 /* municipios. */,
        /* 12 - San Marcos tiene:     */ 30 /* municipios. */,
        /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */,
        /* 14 - Quiché tiene:         */ 21 /* municipios. */,
        /* 15 - Baja Verapaz tiene:   */  8 /* municipios. */,
        /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */,
        /* 17 - Petén tiene:          */ 14 /* municipios. */,
        /* 18 - Izabal tiene:         */  5 /* municipios. */,
        /* 19 - Zacapa tiene:         */ 11 /* municipios. */,
        /* 20 - Chiquimula tiene:     */ 11 /* municipios. */,
        /* 21 - Jalapa tiene:         */  7 /* municipios. */,
        /* 22 - Jutiapa tiene:        */ 17 /* municipios. */
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

    // Se verifica el correlativo con base
    // en el algoritmo del complemento 11.
    var total = 0;

    for (var i = 0; i < numero.length; i++) {
        total += parseInt(numero[i]) * (i + 2);
    }

    var modulo = (total % 11);

    return modulo === verificador;
}

//-------------------------------------------------------------------------

interface ContainerProps { 
    setDpi : (dpi : string) => void,
    validateDpi : Boolean,
    setValidateBoolean : (validateDpi : boolean) => void 
}

const dpiInput: React.FC<ContainerProps> = ({setDpi, validateDpi, setValidateBoolean}) => {
    const dpiMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),' ',...Array(5).fill(/\d/),' ',...Array(4).fill(/\d/)]
        }
    })

    const [isTouched, setIsTouched] = useState(false)

    const validate = (value: string) => {            
        (value !== '' && cuiValido(value)) ? setValidateBoolean(true) : setValidateBoolean(false);
    }

    const markTouched = () => {
        setIsTouched(true);
    } 

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setDpi(value);
    }

    const [focus, setFocus] = useState(false)

    const handleFocus = () => {
        setFocus(true)
    }

    return (
        <IonInput 
            label='DPI' 
            labelPlacement={ focus ? 'stacked' : 'floating' }
            fill='outline' 
            placeholder='XXXX XXXXX XXXX' 
            className={`${'inputs'} ${validateDpi === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
            color='tertiary'
            errorText='DPI inválido'
            ref={async (dpiRef) => {
                if (dpiRef) {
                    const input = await dpiRef.getInputElement()
                    dpiMask(input)
                }
            }}
            onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }} // Ejecuta markTouched() y validate() cuando se desenfoca
            onIonChange={handleInputChange}
            onFocus={handleFocus}    
        ></IonInput>
    )
}

export default dpiInput 