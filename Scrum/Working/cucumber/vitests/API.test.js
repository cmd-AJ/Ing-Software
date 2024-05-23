import { describe, it, expect } from 'vitest'
import { getUsers  } from '../../src/controller/db'
import { getUser } from '../../src/controller/UserController'

describe('Conseguir todos los usuarios', () => {
    it('Quiero conseguir un array de usuarios', async () => {
      expect(Array.isArray(await getUsers())).toBe(true);
    });
    it('adds one plus one and returns two', async () => {
        expect( await getUser( '4568 87080 0101','mora' )).toEqual(null)
      })
});