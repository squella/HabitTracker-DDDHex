import { Id } from "../id";
import { Challenge } from "./challenge";

export interface ChallengeRepository {
    save(challenge: Challenge): void;
    findById(id: Id): Challenge | null;

}
