import { user } from './user-use-case'

describe('Register user', () => {
   it('Should register a user in the database', () => { const registerUser = new user('Teste da Silva', 'teste@gmail.com', 'Teste123')
   expect(registerUser.loginUser).toBeTruthy()
 })
})
