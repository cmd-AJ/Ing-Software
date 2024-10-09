import { describe, it, expect } from 'vitest'
import { getChatIdWithDPI, getChatMessages, getHirings, chatBetweenUsersExist } from '../../src/controller/ChatController';
import { getLoginUser, conseguirtrabajo, getWorkersByJob, userExists } from '../../src/controller/UserController'
import { getThreadComments, getThreadPosts } from '../../src/controller/ThreadController'

describe('Obtener los posts', () => {
  it('deberia de existir al menos un post', async () => {
    const user = await getThreadPosts();
    const firstUser = user[0]
    expect(firstUser).toBeDefined(); // Verifica que se haya obtenido un usuario
  });

});

describe('Obtener los Comentarios', () => {
  it('deberia de existir al menos un comentario para el post con ID 2', async () => {
    const comment = await getThreadComments(2);
    const firstComment = comment[0]
    expect(firstComment).toBeDefined(); // Verifica que seq haya obtenido un comentario
  });

});

describe('Conseguir a un usuario', () => {
  it('Debería iniciar sesión correctamente con credenciales válidas', async () => {
    const user = await getLoginUser('3833 86608 0102', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5');
    expect(user).toBeDefined(); // Verifica que se haya obtenido un usuario
    expect(user).toHaveProperty('dpi', '3833 86608 0102'); // Verifica propiedades específicas
    // Puedes agregar más verificaciones según lo que devuelva el endpoint
  });

  it('Debería fallar con credenciales inválidas', async () => {
    const user = await getLoginUser('3833 86608 0102', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfmm');
    expect(user).toBeNull(); // Espera que la función regrese null en caso de error
  });
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

describe('Comprabar si chat eentre 2 usuarios existe', () => {
  it('Al ingresar 2 dpi que tienen un chat juntos', async () => {

    const chatExists = await chatBetweenUsersExist("3810 35859 0101", "3834 49898 0101")
    expect(chatExists).toBe(true);
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

describe('Quiero saber que contrataciones he realizado', () => {
    it('utilizando mi dpi', async () => {
    const data = (await getHirings('3834 49898 0101'))
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