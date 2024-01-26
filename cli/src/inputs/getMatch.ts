import { input, confirm } from '@inquirer/prompts';
import { MongoRepository } from '@cricd/core/services/index.js';
import { MatchInfo } from '@cricd/core/types';
import { v4 as uuid } from 'uuid';

const maybeGetExistingMatch = (
  matchRepository: MongoRepository<MatchInfo>,
  matchId: string
) => matchRepository.getById(matchId);

const getInnings = async () =>
  Number(
    await input({
      message: 'How many innings will each team bat?',
      default: '1',
      validate: (value) => {
        const numValue = Number(value);
        if (Number.isNaN(numValue)) return 'Please enter a number';
        if (!Number.isInteger(numValue))
          return 'Teams can only bat whole numbers of innings';
        if (numValue < 1) return 'Teams must bat at least once';
        return true;
      },
    })
  );

const getOvers = async () =>
  (await confirm({
    message: 'Is this a limited over match?',
    default: true,
  }))
    ? Number(
        await input({
          message: 'How many overs per innings?',
          default: '20',
          validate: (value) => {
            if (Number.isNaN(Number(value))) return 'Please enter a number';
            return true;
          },
        })
      )
    : 0;

async function getMatch(
  matchRepository: MongoRepository<MatchInfo>,
  matchId?: string
): Promise<MatchInfo> {
  let match: MatchInfo | null = null;
  if (matchId) match = await maybeGetExistingMatch(matchRepository, matchId);
  if (!match) {
    const homeTeamName = await input({
      message: 'What is the name of the home team?',
      default: 'Home team',
    });
    const awayTeamName = await input({
      message: 'What is the name of the away team?',
      default: 'Away team',
    });

    match = {
      id: uuid(),
      teamA: {
        id: uuid(),
        name: homeTeamName,
      },
      teamB: {
        id: uuid(),
        name: awayTeamName,
      },
      homeTeam: {
        id: uuid(),
        name: homeTeamName,
      },
      overs: await getOvers(),
      innings: await getInnings(),
    };
  }

  await matchRepository.insert(match);
  return match;
}

export default getMatch;
