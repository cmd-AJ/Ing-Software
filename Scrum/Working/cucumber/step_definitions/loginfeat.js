import { Given, When, Then } from '@cucumber/cucumber';
import chai from 'chai';
import { userExists } from '../../src/controller/UserController'; // Adjust the relative path as needed

const expect = chai.expect;
let userList;
const dpi = '3834 49898 0101';
const password = 'irving123';
let employer = 'some employer'; // Replace with actual employer if needed

Given('Tengo mis credenciales, DPI y password, empleador', function () {
    // This step would typically be used to set up state, but since you're using constants, it may not be necessary to do anything here.
    // If you have more logic to establish the context for your scenario, such as setting up a mock user, do it here.
    this.dpi = dpi;
    this.password = password;
    this.employer = employer;
});

When('Pido iniciar sesion para buscar a alguien', async function () {
    // Simulate the login action
    userList = await userExists(this.dpi, this.password);
});

Then('reviso base de datos', function () {
    // Since the actual database check is asynchronous and happens in the 'When' step,
    // this step might simply ensure that the user list is defined, for example.
    expect(userList).to.exist;
});

Then('devuelve estado si existe el usuario', function () {
    // Assert that the user exists. The exact assertion will depend on what `userExists` returns.
    // For example, if `userExists` returns an array of users, you could check that it's not empty:
    expect(userList).to.be.an('array').that.is.not.empty;
    // Or, if `userExists` returns a boolean, you could assert that it's true:
    // expect(userList).to.be.true;
});

