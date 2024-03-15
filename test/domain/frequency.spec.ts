import { Frequency } from '../../src/domain/frequency';

describe('Frequency', () => {
  describe('isPractical', () => {
    it('should return true for a daily habit within practical hours', () => {
      const frequency = new Frequency(2, 'day');
      expect(frequency.isPractical(24)).toBeTruthy();
    });
  
    it('should return false for an hourly habit that exceeds practical daily hours', () => {
      const frequency = new Frequency(25, 'hour');
      expect(frequency.isPractical(24)).toBeFalsy();
    });
  
    it('should return true for a weekly habit spread out to be practical', () => {
      const frequency = new Frequency(7, 'week'); // 1 hour a day
      expect(frequency.isPractical(1)).toBeTruthy();
    });
  
    it('should return false for a monthly habit that cannot be spread out to fit into practical daily hours', () => {
      const frequency = new Frequency(31, 'month'); // More than 1 hour per day
      expect(frequency.isPractical(1)).toBeFalsy();
    });
  });

  
  describe('constructor and validation', () => {
    it('should successfully create a frequency object for valid value and unit', () => {
      const validFrequency = new Frequency(1, 'day');
      expect(validFrequency.getValue()).toBe(1);
      expect(validFrequency.getUnit()).toBe('day');
    });

    it('should throw an error for a non-positive frequency value', () => {
      expect(() => new Frequency(0, 'hour')).toThrow("Frequency value must be greater than zero.");
      expect(() => new Frequency(-1, 'week')).toThrow("Frequency value must be greater than zero.");
    });

    it('should throw an error for an invalid frequency unit', () => {
      expect(() => new Frequency(1, 'minute')).toThrow("Frequency unit is not valid. Allowed units are hour, day, week, month.");
      expect(() => new Frequency(1, 'year')).toThrow("Frequency unit is not valid. Allowed units are hour, day, week, month.");
    });

    it('should allow frequency creation with all valid units', () => {
      const validUnits = ['hour', 'day', 'week', 'month'];
      validUnits.forEach(unit => {
        expect(() => new Frequency(1, unit)).not.toThrow();
      });
    });
  });
});
