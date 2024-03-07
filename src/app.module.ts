import { Module } from '@nestjs/common';
import { RegisterUserCommandHandler } from './application/user/register-user.command-handler';
import { CreateUserController } from './infraestructure/create-user.controller';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [RegisterUserCommandHandler],
})
export class AppModule {}
