import { HabitService } from '../../src/domain/habit/habit.service'
import { UserRepository } from '../../src/domain/user/user.repository';
import { HabitRepository } from '../../src/domain/habit/habit.repository';
import { Id } from '../../src/domain/id';
import { GetHabitsQuery } from '../../src/application/habit/get-habits.query';

class MockUserRepository {
    users = [{ id: '1', username: 'testUser', fullname: 'Test User' }];
  
    findById(userId: string) {
      return this.users.find(user => user.id === userId);
    }
  }
  
  class MockHabitRepository {
    habits = [
      { id: '1', userId: '1', name: 'Running', description: 'Morning Running', frequency: 'daily' },
      { id: '2', userId: '1', name: 'Reading', description: 'Read 50 pages', frequency: 'daily' }
    ];
  
    findHabitsByUserId(userId: string) {
      return this.habits.filter(habit => habit.userId === userId);
    }
  }
  
  describe('HabitService', () => {
    let habitService: HabitService;
    let userRepository: UserRepository;
    let habitRepository: HabitRepository;
  
    beforeEach(() => {
      userRepository = new MockUserRepository() as any;
      habitRepository = new MockHabitRepository() as any;
      habitService = new HabitService(userRepository, habitRepository);
    });
  
    // Pruebas a continuación...

    it('should throw an error if the user is not found', () => {
        const query = new GetHabitsQuery(new Id('nonExistingUserId'));
        expect(() => habitService.getHabitsByUser(query)).toThrow('User not found');
    });

    it('should throw an error if the user does not exist', () => {
        const query = new GetHabitsQuery(new Id('non-existing-user'));
      
        // Aquí pasamos una función a `expect` para que `.toThrow` pueda capturar la excepción
        expect(() => habitService.getHabitsByUser(query)).toThrow('User not found');
      });
      
      
      it('should return an empty array if the user has no habits', () => {
        // Asegurándote de que el usuario exista en tu MockUserRepository
        const query = new GetHabitsQuery(new Id('existing-user-with-no-habits'));
        
        // La ejecución no debería lanzar un error, por lo que no usamos `.toThrow`
        const habits = habitService.getHabitsByUser(query);
      
        expect(habits).toEqual([]);
      });
      
    
      

  });
  