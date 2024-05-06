import { When, Then } from '@cucumber/cucumber';
import {createUser } from './src/controller/UserController.tsx'


import chai from 'chai';

const expect = chai.expect;
let userList;

const dpi = '3834 49898 0101'
const password = 'irving123'
const name = 'Andre'
const lastnames = 'Jo'
const phoneNumber = '4970-0499'
const role = 'Empleador'

When('Quiero registrarme a Sabte y tengo mis credenciales', async function () {
    userList = createUser(dpi, name, lastnames, password, email, phoneNumber, role)
});

Then('Then Le pido en la interfaz sus credenciales y revisar base de datos si no hay usuario existente y luego agregar datos a la base', function () {
    expect(userList).to.be.an(String);
    // Aquí podrías añadir más aserciones para verificar el contenido de la lista de usuarios
});


