import DeclarationEvent from '../matchEvents/types/declarationEvent.class'
import BowledEvent from '../matchEvents/types/dismissals/bowledEvent.class'
import CaughtEvent from '../matchEvents/types/dismissals/caughtEvent.class'
import DoubleHitEvent from '../matchEvents/types/dismissals/doubleHitEvent.class'
import HitWicketEvent from '../matchEvents/types/dismissals/hitWicketEvent.class'
import LBWEvent from '../matchEvents/types/dismissals/lbwEvent.class'
import RetiredEvent from '../matchEvents/types/dismissals/retiredEvent.class'
import RetiredNotOutEvent from '../matchEvents/types/dismissals/retiredNotOutEvent.class'
import StumpedEvent from '../matchEvents/types/dismissals/stumpedEvent.class'
import TimedOutEvent from '../matchEvents/types/dismissals/timedOutEvent.class'
import ByeEvent from '../matchEvents/types/extras/byeEvent.class'
import LegByeEvent from '../matchEvents/types/extras/legByeEvent.class'
import NoBallEvent from '../matchEvents/types/extras/noBallEvent.class'
import PenaltyRunsEvent from '../matchEvents/types/extras/penaltyRunsEvent.class'
import WideEvent from '../matchEvents/types/extras/wideEvent.class'
import MatchEvent from '../matchEvents/types/matchEvent.type'
import RunsEvent from '../matchEvents/types/runsEvent.class'
import BaseProcessor from '../matchEvents/baseProcessor'
import EventsRepository from '../matchEvents/eventsRepository.service'
import log from '../shared/utils/logger.util'
import InningStats from './inningStats.class'
import FallOfWicket from './fallOfWickets.type'
import MatchEventTypes from '../matchEvents/types/matchEventTypes.enum'

class InningStatsProcessor extends BaseProcessor<InningStats> {
    private _eventsRepository: EventsRepository

    constructor(eventsRepository: EventsRepository) {
        super()
        this._eventsRepository = eventsRepository
    }

    async processStats(match: string, inning: string): Promise<InningStats> {
        let events: any[] = []
        try {
            events = await this.getEvents(match, inning)
        } catch (error) {
            log.error(`Failed to get MatchEvents for match ${match}, inning ${inning}`)
            return Promise.reject(error)
        }

        const stats = new InningStats()
        stats.match = match
        stats.inning = inning

        for (let i = 0; i < events.length; i++) {
            const e = events[i]
            let s: InningStats
            try {
                s = await this.processEvent(e)
            } catch (error: any) {
                log.error(`Failed to process MatchEvent ${e.id}: ${error.message}`)
                return Promise.reject(error)
            }

            stats.runs += s.runs
            stats.extras = this.updateExtrasMap(stats.extras, s.extras)
            stats.wickets.push(...s.wickets)
            stats.fallOfWickets = this.updateFallOfWickets(stats, s, e)
            stats.legalDeliveries += s.legalDeliveries
            stats.over = Math.floor(stats.legalDeliveries / 6)
            stats.overBall = stats.legalDeliveries % 6
            if (s.declaration) stats.declaration = s.declaration
        }
        return stats
    }

    private updateExtrasMap(current: Map<MatchEventTypes, number>, updated: Map<MatchEventTypes, number>): Map<MatchEventTypes, number> {
        updated.forEach((value, key) => {
            if (value > 0) current.set(key, current.get(key) || 0 + value)
        })
        return updated
    }

    private updateFallOfWickets(state: InningStats, increment: InningStats, e: MatchEvent): FallOfWicket[] {
        if (increment.wickets.length > 0) {
            state.fallOfWickets.push({
                runs: state.runs,
                wicketNumber: state.wickets.length,
                over: state.over,
                overBall: state.overBall,
                event: e
            })
        }
        return state.fallOfWickets
    }

    private async getEvents(match: string, inning: string): Promise<MatchEvent[]> {
        const query = new RunsEvent()
        query.match = match
        query.inning = inning

        let events: MatchEvent[] = []
        try {
            events = await this._eventsRepository.get(query)
        } catch (e) { return Promise.reject(e) }

        return Promise.resolve(events)
    }

    async processRuns(e: RunsEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.runs = e.runs
        if (e.penaltyRuns) {
            const p = await this.processPenaltyRuns(e.penaltyRuns)
            increment.runs += p.runs
            increment.extras.set(e.penaltyRuns.type, p.runs)
        }
        if (e.dismissal) increment.wickets.push(e.dismissal)
        increment.legalDeliveries = 1
        return Promise.resolve(increment)
    }

    async processNoBall(e: NoBallEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.runs = e.runs + 1
        increment.extras.set(e.type, increment.runs)
        if (e.penaltyRuns) {
            const p = await this.processPenaltyRuns(e.penaltyRuns)
            increment.runs += p.runs
            increment.extras.set(e.penaltyRuns.type, p.runs)
        }
        if (e.dismissal) increment.wickets.push(e.dismissal)
        return Promise.resolve(increment)
    }

    async processWide(e: WideEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.runs = e.runs + 1
        increment.extras.set(e.type, increment.runs)
        if (e.penaltyRuns) {
            const p = await this.processPenaltyRuns(e.penaltyRuns)
            increment.runs += p.runs
            increment.extras.set(e.penaltyRuns.type, p.runs)
        }
        if (e.dismissal) increment.wickets.push(e.dismissal)
        return Promise.resolve(increment)
    }

    async processLegBye(e: LegByeEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.runs = e.runs
        increment.extras.set(e.type, increment.runs)
        if (e.penaltyRuns) {
            const p = await this.processPenaltyRuns(e.penaltyRuns)
            increment.runs += p.runs
            increment.extras.set(e.penaltyRuns.type, p.runs)
        }
        if (e.dismissal) increment.wickets.push(e.dismissal)
        increment.legalDeliveries = 1
        return Promise.resolve(increment)
    }

    async processBye(e: ByeEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.runs = e.runs
        increment.extras.set(e.type, increment.runs)
        if (e.penaltyRuns) {
            const p = await this.processPenaltyRuns(e.penaltyRuns)
            increment.runs += p.runs
            increment.extras.set(e.penaltyRuns.type, p.runs)
        }
        if (e.dismissal) increment.wickets.push(e.dismissal)
        increment.legalDeliveries = 1
        return Promise.resolve(increment)
    }

    processPenaltyRuns(e: PenaltyRunsEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.runs = e.runs
        increment.extras.set(e.type, increment.runs)
        return Promise.resolve(increment)
    }

    processBowled(e: BowledEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.wickets.push(e)
        increment.legalDeliveries = 1
        return Promise.resolve(increment)
    }

    processCaught(e: CaughtEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.wickets.push(e)
        increment.legalDeliveries = 1
        return Promise.resolve(increment)
    }

    processLBW(e: LBWEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.legalDeliveries = 1
        increment.wickets.push(e)
        return Promise.resolve(increment)
    }

    processStumped(e: StumpedEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.legalDeliveries = 1
        increment.wickets.push(e)
        return Promise.resolve(increment)
    }

    processHitWicket(e: HitWicketEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.legalDeliveries = 1
        increment.wickets.push(e)
        return Promise.resolve(increment)
    }

    processDoubleHit(e: DoubleHitEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.legalDeliveries = 1
        increment.wickets.push(e)
        return Promise.resolve(increment)
    }

    processTimedOut(e: TimedOutEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.wickets.push(e)
        return Promise.resolve(increment)
    }

    processRetiredNotOut(e: RetiredNotOutEvent): Promise<InningStats> {
        const increment = new InningStats()
        return Promise.resolve(increment)
    }

    processRetired(e: RetiredEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.wickets.push(e)
        return Promise.resolve(increment)
    }

    processDeclaration(e: DeclarationEvent): Promise<InningStats> {
        const increment = new InningStats()
        increment.declaration = e
        return Promise.resolve(increment)
    }
}

export default InningStatsProcessor
