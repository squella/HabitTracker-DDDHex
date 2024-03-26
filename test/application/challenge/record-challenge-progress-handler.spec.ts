import { DomainEventPublisher } from "../../../src/infraestructure/challenge/domain.event-publisher";
import { RecordChallengeProgressCommand } from "../../../src/application/challenge/record-challenge.command";
import { RecordChallengeProgressCommandHandler } from "../../../src/application/challenge/record-challenge.command-handler";
import { ChallengeState } from "../../../src/domain/challenge/challenge-state";
import { ChallengeMother } from './challenge.mother';


const challengeRepository = {
    findById: jest.fn(),
    save: jest.fn()
  };
  
  const achievementRepository = {
    save: jest.fn()
  };
  

  describe('RecordChallengeProgressCommandHandler', () => {
    it('should create an achievement when a challenge is completed', () => {
      
      const mockChallenge = ChallengeMother.createDefault();
      challengeRepository.findById.mockReturnValue(mockChallenge);
  
      // Instanciar el manejador con los repositorios mock
      const handler = new RecordChallengeProgressCommandHandler(challengeRepository, achievementRepository);
  
      const command = new RecordChallengeProgressCommand(mockChallenge.id, mockChallenge.userId, 1);
      handler.handle(command);
  
      expect(challengeRepository.save).toHaveBeenCalledWith(mockChallenge);
      expect(achievementRepository.save).toHaveBeenCalled();
  
      // Verificar si el desafío se marcó como completado
      expect(mockChallenge.state).toBe(ChallengeState.Completed);
      // Verificar que se haya publicado el evento correcto (si aplicable)
      const publishedEvents = DomainEventPublisher.getPublishedEvents();
      expect(publishedEvents.length).toBe(1);
      
    });
  
  });