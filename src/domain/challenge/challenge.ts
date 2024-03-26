import { Id } from "../id";
import { ChallengeState } from "./challenge-state";
import { ChallengeDescription } from "./challenge-description";
import { ChallengeDuration } from "./challenge-duration";
import { ChallengeProgressRecordedEvent } from "./challenge-progress-recorded.event";
import { DomainEventPublisher } from "../../../src/infraestructure/challenge/domain.event-publisher";
import { ChallengeCompletedEvent } from "./challenge-completed-recorded.event";

export class Challenge {
    readonly id: Id;
    readonly userId: Id;
    readonly habitId: Id;
    readonly description: ChallengeDescription;
    readonly timesToComplete: number;
    private _duration: ChallengeDuration;
    private _completedTimes: number = 0;
    private _state: ChallengeState;

    constructor(
        id: Id,
        habitId: Id,
        userId: Id,
        description: string,
        timesToComplete: number,
        startDate: Date,
        endDate: Date,
        state: ChallengeState = ChallengeState.Pending
    ) {
        this.id = id;
        this.userId = userId;
        this.habitId = habitId;
        this.description = new ChallengeDescription(description);
        this.timesToComplete = timesToComplete;
        this._duration = new ChallengeDuration(startDate, endDate);
        this._state = state;
    }

    get duration(): ChallengeDuration {
        return this._duration;
    }

    get completedTimes(): number {
        return this._completedTimes;
    }

    get state(): ChallengeState {
        return this._state;
    }

    recordAttempt(): void {
        if (!this.isWithinDuration()) {
            throw new Error("Cannot record attempt outside the challenge duration.");
        }
        this._completedTimes++;
        if (this.isCompleted()) {
            this.markAsCompleted(); // Solo se marca como completado.
        } else {
            // Emitir solo si el desafío no está completado pero se registra un intento.
            DomainEventPublisher.publish(new ChallengeProgressRecordedEvent(this.id, this.userId, new Date()));
        }
    }    

    isWithinDuration(): boolean {
        const now = new Date();
        return now >= this._duration.startDate && now <= this._duration.endDate;
    }

    isCompleted(): boolean {
        return this._completedTimes >= this.timesToComplete;
    }

    extendEndDate(newEndDate: Date): void {
        if (newEndDate <= this._duration.endDate) {
            throw new Error("New end date must be after the current end date.");
        }
        this._duration = new ChallengeDuration(this._duration.startDate, newEndDate);
    }

    // Puede ser útil tener métodos para cambiar directamente el estado del desafío en casos especiales
    // como suspender o caducar un desafío manualmente o basado en otros criterios.
    suspendChallenge(): void {
        this._state = ChallengeState.Suspended;
    }

    expireChallenge(): void {
        this._state = ChallengeState.Expired;
    }

    markAsCompleted(): void {
        if (!this.isWithinDuration()) {
            throw new Error("The challenge cannot be marked as completed as it is outside the challenge duration.");
        }
        if (!this.isCompleted()) {
            throw new Error("The challenge cannot be marked as completed as the required attempts have not been met.");
        }
        this._state = ChallengeState.Completed;
        // Emitir un evento específico para la finalización del desafío.
        DomainEventPublisher.publish(new ChallengeCompletedEvent(this.id, this.userId, new Date()));
    }
    
}
