import { Id } from "../id";

export class User {
  constructor(
    readonly id: Id,
    readonly username: string,
    readonly fullname: string,
  ) {}
}