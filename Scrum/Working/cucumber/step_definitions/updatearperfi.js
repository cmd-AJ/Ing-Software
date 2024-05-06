import { When, Then } from '@cucumber/cucumber';
import {updatecuenta } from './src/controller/UserController.tsx'


import chai from 'chai';

const expect = chai.expect;
let userList;

const DPI = '3834 49898 0101'
const sexo = 'M'
const imagen = 'Andre'
const municipio = 'Santa Rosa'
const fecha_nacimiento = '2004-04-01'
const rating = '5.0'
const numero = '6'

When('Quiero registrarme a Sabte y tengo mis credenciales', async function () {
    userList = updatecuenta(municipio, imagen, sexo, fecha_nacimiento, rating, numero, DPI)
});

Then('Then Le pido en la interfaz sus credenciales y revisar base de datos si no hay usuario existente y luego agregar datos a la base', function () {
    expect(userList).to.be.an(String);
    // Aquí podrías añadir más aserciones para verificar el contenido de la lista de usuarios
});


