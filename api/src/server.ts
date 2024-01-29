import { MatchInfo } from '@cricd/core/types.js';
import {
  EventsRepository,
  MongoRepository,
} from '@cricd/core/services/index.js';
import * as processors from '@cricd/core/processors/index.js';
import App from './app.js';
import * as controllers from './controllers/index.js';
import MongoAuthProvider from './auth/service.js';

const { REPO_URL, REPO_DB, JWT_SECRET } = process.env;

const repoUrl = REPO_URL ?? 'mongodb://localhost:27017';
const repoDb = REPO_DB ?? 'cricd';

const eventsRepository = new EventsRepository(repoUrl, repoDb);
const authProvider = new MongoAuthProvider(
  new MongoRepository(repoUrl, repoDb, 'users'),
  JWT_SECRET ?? ''
);

const app = new App([
  new controllers.PingController(),
  new controllers.EventsController(
    [new processors.EventPersister(eventsRepository)],
    authProvider
  ),
  new controllers.MatchController(
    new MongoRepository<MatchInfo>(repoUrl, repoDb, 'match'),
    authProvider
  ),
  new controllers.AuthController(authProvider),
  new controllers.BattingStatsController(
    new processors.BattingStatsProcessor(eventsRepository)
  ),
  new controllers.BowlingStatsController(
    new processors.BowlingStatsProcessor(eventsRepository)
  ),
  new controllers.InningStatsController(
    new processors.InningsStatsProcessor(eventsRepository)
  ),
]);

app.listen();
