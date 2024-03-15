import { Id } from "src/domain/id";

export class GetHabitsQuery {
    constructor(public readonly userId: Id) {}
}
