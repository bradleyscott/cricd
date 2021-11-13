import App from './app';
import BattingStatsController from './battingStats/controller';
import EventsController from './matchEvents/controller';
import PingController from './ping.controller';
import BattingStatsProcessor from './battingStats/processor';
import EventPersister from './shared/processors/eventPersister';
import EventsRepository from './shared/services/eventsRepository';
import BowlingStatsController from './bowlingStats/controller';
import BowlingStatsProcessor from './bowlingStats/processor';
import InningStatsController from './inningsStats/controller';
import InningsStatsProcessor from './inningsStats/processor';
import AuthController from './auth/controller';
import SupabaseAuthProvider from './auth/service';

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
