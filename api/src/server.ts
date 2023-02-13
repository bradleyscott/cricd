import App from './app.js';
import BattingStatsController from './battingStats/controller.js';
import EventsController from './matchEvents/controller.js';
import PingController from './ping.controller.js';
import BattingStatsProcessor from './battingStats/processor.js';
import EventPersister from './shared/processors/eventPersister.js';
import EventsRepository from './shared/services/eventsRepository.js';
import BowlingStatsController from './bowlingStats/controller.js';
import BowlingStatsProcessor from './bowlingStats/processor.js';
import InningStatsController from './inningsStats/controller.js';
import InningsStatsProcessor from './inningsStats/processor.js';
import AuthController from './auth/controller.js';
import SupabaseAuthProvider from './auth/service.js';

const { SUPABASE_URL, SUPABASE_CLIENT_KEY, EVENTS_REPO_URL, EVENTS_REPO_DB } =
  process.env;
const eventsRepository = new EventsRepository(
  EVENTS_REPO_URL ?? 'mongodb://localhost:27017',
  EVENTS_REPO_DB ?? 'cricd'
);
const authProvider = new SupabaseAuthProvider(
  SUPABASE_URL ?? '',
  SUPABASE_CLIENT_KEY ?? ''
);

const app = new App([
  new PingController(),
  new EventsController([new EventPersister(eventsRepository)]),
  new AuthController(authProvider),
  new BattingStatsController(new BattingStatsProcessor(eventsRepository)),
  new BowlingStatsController(new BowlingStatsProcessor(eventsRepository)),
  new InningStatsController(new InningsStatsProcessor(eventsRepository)),
]);

app.listen();
