import { Id } from "../../../src/domain/id";
import { User } from "../../../src/domain/user/user"

export class UserMother {
    private id: Id = Id.create()
    private username: string = 'username'
    private fullname: string = 'fullname'

    withId(id: Id){
        this.id = id
        return this
    }

    withUsername(username: string){
        this.username = username
        return this
    }

    withFullname(fullname: string){
        this.fullname = fullname
        return this
    }

    build(): User{
        return new User(this.id, this.username, this.fullname)
    }

}