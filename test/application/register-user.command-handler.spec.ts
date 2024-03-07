import {v4 as uuidv4} from 'uuid';
import { UserInMemoryRepository } from './user.in-memory.repository';
import { User } from '../../src/domain/user/user';
import { RegisterUserCommand } from "../../src/application/user/register-user.command";
import { RegisterUserCommandHandler } from '../../src/application/user/register-user.command-handler';



describe('RegisterUserCommandHandler',()=>{

    it('should register the user', () => {
        const repository = new UserInMemoryRepository()
        const id = uuidv4();
        const username = 'pepe'
        const fullname = 'Pepe delosPalotes'

        const user = new User(id, username, fullname)
        const command = new RegisterUserCommand(id, username, fullname)
        const handler = new RegisterUserCommandHandler(repository)

        handler.handler(command)

        expect(repository.isUserSaved(user)).toBeTruthy()
      
    })
    
    it('should throw an error if the user already exists', () => {
      
    })

    it('should throw an error if the user is not valid', () => {
  
  
  
    })
})
