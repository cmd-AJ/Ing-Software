import { When, Then } from '@cucumber/cucumber';
import {getWorkersByJob } from '../src/controllerUserController.tsx'


import chai from 'chai';

const expect = chai.expect;
let userList;

job = 'Carpintero'

When('Pido buscar a un trabajador por su trabajo en la searchbar', async function () {
    userList = getWorkersByJob(job)
});

Then('Tusuario mete en la searchbar tipo de trabajo y Despliega un listado de trabajadores con el tipo de trabajo buscado', function () {
    expect(userList).to.be.an(String);
    // Aquí podrías añadir más aserciones para verificar el contenido de la lista de usuarios
});


