Feature: Leg byes should be scored
	The rules relating to byes are outlined at https://en.wikipedia.org/wiki/Leg_bye
	A leg bye counts as one of the 6 balls in an over
	A leg bye counts as a delivery faced by a batsman
	Runs taken from leg byes are awarded to the batting team as extras

	Scenario: 1 leg bye is run
	When a leg bye is bowled
	And the batsmen run a single
	Then 1 run is credited to the batting side as a leg bye extras
	And the ball is counted as a legal ball in that over
	And the batsman previously off strike is now on strike

	Scenario: 2 leg byes are run
	When a leg bye is bowled
	And the batsmen run two runs
	Then 2 runs are credited to the batting side as a leg bye extras
	And the ball is counted as a legal ball in that over