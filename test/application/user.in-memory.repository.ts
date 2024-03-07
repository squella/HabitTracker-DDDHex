import { User } from "src/domain/user/user";
import { UserRepository } from "src/domain/user/user.repository";

export class UserInMemoryRepository implements UserRepository{
    private users: User[] = []

    save(user: User): void {
        this.users.push(user)
    }

    isUserSaved(user: User): boolean {
        return this.users.some((u: User) => u.id === user.id)
    }

    findById(id: string): User {
        throw new Error("Method not implemented.");
    }
    findByUsername(username: string): User {
        throw new Error("Method not implemented.");
    }
}