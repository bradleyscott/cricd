import EventsRepository from '@cricd/core/services/eventsRepository.js';
import { Command } from 'commander';

export interface CricdCommand {
  command: Command;
  eventsRepository: EventsRepository;
}
