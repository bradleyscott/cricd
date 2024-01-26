/* eslint-disable no-console */
import { Command } from 'commander';
import EventsRepository from '@cricd/core/services/eventsRepository.js';
import MongoRepository from '@cricd/core/services/mongoRepository.js';
import { MatchInfo } from '@cricd/core/types.js';
import { CricdCommand } from './types.js';
import getMatch from '../inputs/getMatch.js';

export default class ScoreCommand implements CricdCommand {
  eventsRepository: EventsRepository;

  matchRepository: MongoRepository<MatchInfo>;

  command: Command;

  constructor(
    eventsRepository: EventsRepository,
    matchRepository: MongoRepository<MatchInfo>
  ) {
    this.eventsRepository = eventsRepository;
    this.matchRepository = matchRepository;
    this.command = new Command()
      .name('score')
      .description('Score a new or existing match')
      .option(
        '-m --match [match]',
        'A match id if resuming scoring of an existing match. Otherwise a new match is created'
      )
      .action(this.action.bind(this)); // eslint-disable-line no-use-before-define
  }

  async action(options: { match?: string }, command: Command) {
    console.log(command.description());

    const { match: matchId } = options;
    console.log(await getMatch(this.matchRepository, matchId));
  }
}
