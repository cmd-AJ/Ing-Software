import { When, Then } from '@cucumber/cucumber';
import { getUsers } from './src/controller/db.js'

import chai from 'chai';

const expect = chai.expect;
let userList;

When('I fetch all users from the database', async function () {
    userList = await getUsers();
});

Then('I should get a list of users', function () {
    expect(userList).to.be.an('array');
    // Aquí podrías añadir más aserciones para verificar el contenido de la lista de usuarios
});