Feature: Byes should be scored
	The rules relating to byes are outlined at https://en.wikipedia.org/wiki/Bye_(cricket)
	A bye counts as one of the 6 balls in an over
	A bye counts as a delivery faced by a batsman
	Runs taken from byes are awarded to the batting team as extras

	Scenario: 1 bye is run
	When a bye is bowled
	And the batsmen run a single
	Then 1 run is credited to the batting side as a bye extras
	And the ball is counted as a legal ball in that over
	And the batsman previously off strike is now on strike

	Scenario: 2 byes are run
	When a bye is bowled
	And the batsmen run two runs
	Then 2 runs are credited to the batting side as a bye extras
	And the ball is counted as a legal ball in that over