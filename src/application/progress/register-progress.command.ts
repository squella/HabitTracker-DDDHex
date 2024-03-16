import { Id } from "src/domain/id";


export class RegisterProgressCommand {
    constructor(
        readonly id: Id,
        readonly userId: Id,
        readonly habitId: Id,
        readonly date: Date,
        readonly progressDetail: string,
        readonly progressAmount: number
    ) {}
}
