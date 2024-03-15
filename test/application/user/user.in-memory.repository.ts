import { Id } from "src/domain/id";
import { User } from "src/domain/user/user";
import { UserRepository } from "src/domain/user/user.repository";

export class UserInMemoryRepository implements UserRepository{
    private users: User[] = []

    save(user: User): void {
        this.users.push(user)
    }

    withUsers(users: User[]){
        this.users = users
    }

    isUserSaved(user: User): boolean {
        return this.users.some((u: User) => u.id === user.id)
    }

    findById(id: Id): User {
        return this.users.find((user: User): boolean => user.id === id)
    }
    
    findByUsername(username: string): User {
        return this.users.find((user: User): boolean => user.username === username)
    }
}