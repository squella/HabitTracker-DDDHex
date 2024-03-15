import { Id } from '../id';
import { User } from '../user/user';
import { Habit } from './habit'

export interface HabitRepository {
  save(habit: Habit): void
  findByName(name: string): Habit | undefined
  findDuplicateForUser(userId: Id, name: string): Habit | undefined;
  isHabitSaved(habit: Habit): boolean
  findHabitsByUserId(userId: Id): Habit[]

}