import { describe, it, expect } from 'vitest'
import { getChatIdWithDPI, getChatMessages, getHirings } from '../../src/controller/ChatController';
import { conseguirtrabajo, getUser, getWorkersByJob, userExists } from '../../src/controller/UserController'

describe('Conseguir a un usuario', () => {
    it('adds one plus one and returns two', async () => {
        expect( await getUser( '3833 86608 0102','5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5' )).toEqual(null)
      })
});


describe('Login Credenciales', () => {
  it('Soy empleador Ricardo Tapia e ingreso mis credenciales correctamente', async () => {
    expect((await userExists('3833 86608 0102','5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5' ))).toBe(true);
  });
  it('Soy empleador Ricardo Tapia e ingreso mis credenciales incorrectamente', async () => {
    expect((await userExists('3833 86608','59fc5' ))).toBe(false);
  });
  it('Soy empleador Ricardo Tapiay y puse mi password incorrectamente', async () => {
    expect((await userExists('3833 86608 0102','' ))).toBe(false);
  });
  it('Soy empleador Ricardo Tapiay y puse mi dpi incorrectamente', async () => {
    expect((await userExists('3833 86608 0106','5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5' ))).toBe(false);
  });
  
});


describe('Quiero buscar un trabajo', () => {
  it('Soy empleador Ricardo Tapia Y necesitoo a un Carpintero', async () => {
    expect( Array.isArray(await getWorkersByJob('Carpintero'))).toBe(true);
  });
  it('Soy empleador Ricardo Tapia Y necesitoo a un Developer', async () => {
    expect( Array.isArray(await getWorkersByJob('Developer') )).toBe(true);
  }); //TOMAR NOTA EN EL CASO DE QUE NO RETORNE un trabajador una o dos o puede ser que no existe el trabajo o no hay nadie con ese trabajo  
  it('Quiero saber acerca del usuario su trabajo ', async () => {
    const data = (await conseguirtrabajo('3833 86608 0102'))
    expect((data[0].nombre_trabajo)).toBe(null) //no tiene trabajo
  });

  
});


describe('Quiero buscar a un contacto y sus mensajes', () => {
  it('Soy empleador Ricardo Tapia Y necesito hablar a Jose', async () => {
    expect( Array.isArray(await getChatMessages( "3834 49898 0101" ,"3810 35859 0101"))).toBe(true);
  });
  it('Como dev tengo que ver a que id del chat pertenece la tupla de dpi', async () => {
    const data = await getChatIdWithDPI("3834 49898 0101" ,"3810 35859 0101") 
    expect((data[0]["idchat"])).toBe(5);
  }); //TOMAR NOTA EN EL CASO DE QUE NO RETORNE un trabajador una o dos o puede ser que no existe el trabajo o no hay nadie con ese trabajo  
  it('Quiero saber quien esta contratado', async () => {
    const data = (await getHirings('3810 35859 0101'))
    expect(Array.isArray(data)).toBe(true) //no tiene trabajo
  });
});


describe('getWorkersByJob', () => {
  it('Deberia de regresar un objecto con los atributos correctos', async () => {
    const job = 'Carpintero'; // Asegúrate de que esto coincida con los datos que estás probando
    const workers = await getWorkersByJob(job);

    // Verifica que la respuesta sea un array y tenga al menos un elemento
    expect(workers).not.toHaveLength(0); // Asegúrate de que hay al menos un trabajador

    // Enfócate solo en el primer trabajador
    const firstWorker = workers[0];

    // Verifica que el primer objeto trabajador tenga las propiedades esperadas
    expect(firstWorker).toHaveProperty('nombre');
    expect(firstWorker).toHaveProperty('telefono');
    expect(firstWorker).toHaveProperty('municipio');
    expect(firstWorker).toHaveProperty('rating');
    expect(firstWorker).toHaveProperty('imagen');
    expect(firstWorker).toHaveProperty('dpi');

    // Verifica que el primer objeto tenga los tipos correctos
    expect(firstWorker).toEqual({
      nombre: expect.any(String),
      telefono: expect.any(String),
      municipio: expect.any(String),
      rating: expect.anything(), // Permite valores null o vacíos
      imagen: expect.any(String),
      dpi: expect.any(String)
    });
  });
});