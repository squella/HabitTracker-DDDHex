import { Injectable } from '@nestjs/common';
import { RegisterUserCommand } from './register-user.command';
import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user';

@Injectable()
export class RegisterUserCommandHandler {
    
    constructor(private readonly repository: UserRepository) {

    }

  handler(command: RegisterUserCommand) {
    if (this.repository.findById(command.id)){
        throw new Error(`the user with id equal to ${command.id} already exists`)
    }
    if (!command.username || !command.fullname) {
        throw new Error(`The user with usermane equal to ${command.username} and fullname equal to ${command.username} is not valid`);
    }
    const user = new User(command.id, command.username, command.fullname)
    this.repository.save(user)
  }
}
