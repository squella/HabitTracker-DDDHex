import { v4 as uuidv4 } from 'uuid';

export class Id {
    private readonly value: string;

    constructor(value: string) {
        this.value = value;
    }

    public static create(): Id {
        return new Id(uuidv4());
    }

    public static fromExisting(value: string): Id {
        if (!value || value.length === 0) {
            throw new Error('Invalid ID: must be a non-empty string');
        }
        return new Id(value);
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: Id): boolean {
        return this.value === other.getValue();
    }
}
