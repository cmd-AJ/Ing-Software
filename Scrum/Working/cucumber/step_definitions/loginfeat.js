import { When, Then } from '@cucumber/cucumber';
import { userExists } from './src/controller/UserController.tsx'


import chai from 'chai';

const expect = chai.expect;
let userList;

const dpi = '3834 49898 0101'
const password = 'irving123'

When('Pido iniciar sesion para buscar a alguien', async function () {
    userList = await userExists(dpi, password);
});

Then('reviso base de datos y devuelve estado si existe el usuario', function () {
    expect(userList).to.be.an(true);
    // Aquí podrías añadir más aserciones para verificar el contenido de la lista de usuarios
});

