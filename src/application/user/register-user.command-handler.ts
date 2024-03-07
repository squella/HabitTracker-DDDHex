import { Injectable } from '@nestjs/common';
import { RegisterUserCommand } from './register-user.command';
import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user';

@Injectable()
export class RegisterUserCommandHandler {
    
    constructor(private readonly repository: UserRepository) {
        
    }

  handler(command: RegisterUserCommand) {
    const user = new User(command.id, command.username, command.fullname)
    this.repository.save(user)
  }
}
