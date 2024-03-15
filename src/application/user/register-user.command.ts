import { Id } from "src/domain/id";

export class RegisterUserCommand {
  constructor(
    readonly id: Id,
    readonly username: string,
    readonly fullname: string,

  ) {}
}
