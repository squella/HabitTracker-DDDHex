import { Id } from "../id";
import { ChallengeDescription } from "./challenge-description";
import { ChallengeDuration } from "./challenge-duration";

export class Challenge {
    readonly id: Id;
    readonly habitId: Id;
    readonly description: ChallengeDescription;
    readonly timesToComplete: number;
    private _duration: ChallengeDuration;
    private _completedTimes: number = 0;

    constructor(
        id: Id,
        habitId: Id,
        description: string,
        timesToComplete: number,
        startDate: Date,
        endDate: Date
    ) {
        this.id = id;
        this.habitId = habitId;
        this.description = new ChallengeDescription(description);
        this.timesToComplete = timesToComplete;
        this._duration = new ChallengeDuration(startDate, endDate);
    }

    get duration() {
        return this._duration;
    }

    get completedTimes() {
        return this._completedTimes;
    }

    // Método para registrar un intento de completar el desafío
    recordAttempt(): void {
        if (!this.isWithinDuration()) {
            throw new Error("Cannot record attempt outside the challenge duration");
        }
        this._completedTimes++;
    }

    // Método para verificar si el desafío está dentro de la duración válida
    isWithinDuration(): boolean {
        const now = new Date();
        return now >= this._duration.startDate && now <= this._duration.endDate;
    }

    // Método para verificar si el desafío ha sido completado
    isCompleted(): boolean {
        return this._completedTimes >= this.timesToComplete;
    }

    // Método para extender la fecha límite del desafío
    extendEndDate(newEndDate: Date): void {
        if (newEndDate <= this._duration.endDate) {
            throw new Error("New end date must be after the current end date");
        }
        this._duration = new ChallengeDuration(this._duration.startDate, newEndDate);
    }
}

