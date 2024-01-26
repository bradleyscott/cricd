/* eslint-disable no-console */
import { Command } from 'commander';
import chalk from 'chalk';
import {
  EventsRepository,
  MongoRepository,
} from '@cricd/core/services/index.js';
import 'dotenv/config';
import { MatchInfo } from '@cricd/core/types.js';
import { log } from '@cricd/core';
import ScoreCommand from './commands/score.js';

const { REPO_URL, REPO_DB } = process.env;
const repoUrl = REPO_URL ?? 'mongodb://localhost:27017';
const repoDb = REPO_DB ?? 'cricd';

const eventsRepository = new EventsRepository(repoUrl, repoDb);
const matchRepository = new MongoRepository<MatchInfo>(
  repoUrl,
  repoDb,
  'match'
);

const program = new Command()
  .name('cricd-cli')
  .description('CLI for cricket scoring app cricd')
  .option(
    '-l --logLevel <logLevel>',
    'Set the min log level that will display to screen.',
    (value) => Number(value),
    4
  )
  .addCommand(new ScoreCommand(eventsRepository, matchRepository).command);

console.log(chalk.bold.white(program.name()));
console.log(chalk.white(program.description()));
console.log('---');

program.parse();
log.settings.minLevel = program.opts().logLevel;
