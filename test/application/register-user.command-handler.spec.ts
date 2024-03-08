import {v4 as uuidv4} from 'uuid';
import { UserInMemoryRepository } from './user.in-memory.repository';
import { RegisterUserCommand } from "../../src/application/user/register-user.command";
import { RegisterUserCommandHandler } from '../../src/application/user/register-user.command-handler';
import { UserMother } from './user.mother';



describe('RegisterUserCommandHandler',()=>{

    const user = new UserMother().build();
    const repository = new UserInMemoryRepository()
    const command = new RegisterUserCommand(user.id, user.username, user.fullname)
    const handler = new RegisterUserCommandHandler(repository)

    it('should register the user', () => {
        handler.handler(command)

        expect(repository.isUserSaved(user)).toBeTruthy()
      
    })
    
    it('should throw an error if the user already exists', () => {
        repository.withUsers([user])
        
        expect(() => {
            handler.handler(command);
        }).toThrow(`the user with id equal to ${command.id} already exists`);
    })


    it('should throw an error if the user is not valid', () => {

        const invalidUser = new UserMother().withUsername('').withFullname('').build();
        const command = new RegisterUserCommand(invalidUser.id, invalidUser.username, invalidUser.fullname);
        expect(() => {
            handler.handler(command);
        }).toThrow(`The user with usermane equal to ${command.username} and fullname equal to ${command.username} is not valid`);
    })
})
