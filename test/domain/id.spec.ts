import { Id } from '../../src/domain/id';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

describe('Id', () => {
  it('creates a new Id with a valid UUID', () => {
    const id = Id.create();
    expect(uuidValidate(id.getValue())).toBeTruthy();
  });

  it('creates an Id from an existing value', () => {
    const value = uuidv4();
    const id = Id.fromExisting(value);
    expect(id.getValue()).toBe(value);
  });

  it('throws an error when creating an Id from an invalid value', () => {
    expect(() => {
      Id.fromExisting('');
    }).toThrow('Invalid ID: must be a non-empty string');

    expect(() => {
      Id.fromExisting(null);
    }).toThrow('Invalid ID: must be a non-empty string');
  });

  it('returns the correct value for an Id', () => {
    const value = uuidv4();
    const id = Id.fromExisting(value);
    expect(id.getValue()).toBe(value);
  });

  it('correctly checks the equality of two Ids', () => {
    const value = uuidv4();
    const id1 = Id.fromExisting(value);
    const id2 = Id.fromExisting(value);
    const id3 = Id.create();

    expect(id1.equals(id2)).toBeTruthy();
    expect(id1.equals(id3)).toBeFalsy();
  });
});
