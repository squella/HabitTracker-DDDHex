import { Id } from "../id";
import { User } from "./user";

export interface UserRepository{
    save(user: User):void
    findById(id:Id): User | undefined
    findByUsername(username: string): User | undefined
}

export const userRepository = Symbol('UserRepository')