Feature: Wides should be scored
	The rules relating to a wide are outlined at https://en.wikipedia.org/wiki/Wide_(cricket)
	A wide does not count as one of the 6 balls in an over
	A wide does not count as a delivery faced by a batsman
	1 run is awarded to the batting team as an extra
	Any further runs taken are awarded to the batting team as extras
	Wides are recorded against the bowler
	A batsman may be given out run out, stumped, hit wicket or obstructing the field

	Scenario: Wide without further runs
	When a wide is bowled
	And the batsmen didn't run
	Then 1 run is credited to the batting side as a wide extra
	And 1 run is added to the bowler's total

	Scenario: Wide with further runs
	When a wide is bowled
	And the batsmen run 2 runs
	Then 3 runs are credited to the batting side as wide extras
	And 3 runs are added to the bowler's total

	Scenario: Runout on the 1st run on a wide
	When a wide is bowled
	And the batsmen is run out attempting the 1st run
	Then 1 run is credited to the batting side as a wide extra
	But no runs are credited to the batsman
	And 1 run is added to the bowler's total
	And the batsman previously off strike is now on strike

	Scenario: Runout on the 2nd run on a wide
	When a wide is bowled
	And the batsmen is run out attempting the 2nd run
	Then 2 runs are credited to the batting side as wide extras
	And 2 runs are added to the bowler's total
