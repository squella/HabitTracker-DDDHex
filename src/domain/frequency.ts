
export class Frequency {
    private readonly value: number;
    private readonly unit: string;
  
    constructor(value: number, unit: string) {
      this.validate(value, unit);
      this.value = value;
      this.unit = unit;
    }
  
    private validate(value: number, unit: string): void {
      if (value <= 0) {
        throw new Error("Frequency value must be greater than zero.");
      }
  
      const allowedUnits = ["hour", "day", "week", "month"];
      if (!allowedUnits.includes(unit)) {
        throw new Error("Frequency unit is not valid. Allowed units are hour, day, week, month.");
      }
    }
  
    public getValue(): number {
      return this.value;
    }
  
    public getUnit(): string {
      return this.unit;
    }
  
    public isPractical(maxHoursPerDay: number): boolean {
        switch (this.unit) {
            case "hour":
                return this.value <= maxHoursPerDay;
            case "day":
                return true;
            case "week":
                return this.value <= maxHoursPerDay * 7;
            case "month":
                return (this.value * 24) / 30 <= maxHoursPerDay;
            default:
                return false;
        }
    }
}
  