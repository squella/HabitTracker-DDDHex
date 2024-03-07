import { Controller } from '@nestjs/common';
import { RegisterUserCommandHandler } from 'src/application/user/register-user.command-handler';

@Controller()
export class CreateUserController {
  constructor(private commandHandler: RegisterUserCommandHandler) {}
}
