import React, { useEffect, useState } from "react"
import { Departamentos } from '../../../Departamentos/Departamentos'

interface ContainerProps { 
    departamento: string
}

const Departamento: React.FC<ContainerProps> = ({ departamento }) => {

    return (
        <div className="dataContainerFull">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="33" ><path d="M80-160v-400l240-240 240 240v400H80Zm80-80h120v-120h80v120h120v-287L320-687 160-527v287Zm120-200v-80h80v80h-80Zm360 280v-433L433-800h113l174 174v466h-80Zm160 0v-499L659-800h113l108 108v532h-80Zm-640-80h320-320Z" fill="#6F9CEB"/></svg>
            <div>
                <p className="dataLabel">Departamento:</p>
                <p className='dataContainerText'>{departamento}</p>
            </div>
        </div>

    )
}

export default Departamento