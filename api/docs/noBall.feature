Feature: No balls should be scored
	The rules relating to a no ball are outlined at https://en.wikipedia.org/wiki/No_ball
	1 run is awarded to the batting team
	This run is an extra and is not added to the batsman's total
	If the batsman hits the ball, any runs taken are credited to the bastman
	If the batsman doesn't hit the ball, but runs are taken, they are extras
	No balls are recorded against the bowler
	A batsman can not be given out bowled, LBW, caught, stumped or hit wicket
	A batsman can be given out run out, or obstructing the field
	A no ball does not count as one of the six balls in an over

	Scenario: No ball without further runs
	When a no ball is bowled
	And the batsmen didn't run
	Then 1 run is credited to the batting side as a no ball extra
	And 1 run is added to the bowler's total

	Scenario: No ball when batsman hits the ball and takes runs
	When a no ball is bowled
	And the batsman hits the ball
	And the batsmen run 2 runs
	Then 1 run is credited to the batting side as a no ball extra
	And 2 runs are credited to the batsman
	And 3 runs are added to the bowler's total

	Scenario: No ball when batsman doesn't hit the ball but runs are taken
	When a no ball is bowled
	And the batsman doesn't hit the ball
	And the batsmen run 2 runs
	Then 3 runs are credited to the batting side as no ball extras
	And 3 runs are added to the bowler's total

	Scenario: Runout on the 1st run on a no ball
	When a no ball is bowled
	And the batsman hits the ball
	And the batsmen is run out attempting the 1st run
	Then 1 run is credited to the batting side as a no ball extra
	But no runs are credited to the batsman
	And 1 run is added to the bowler's total
	And the batsman previously off strike is now on strike

	Scenario: Runout on the 2nd run on a no ball when a batsman has hit the ball
	When a no ball is bowled
	And the batsman hits the ball
	And the batsmen is run out attempting the 2nd run
	Then 1 run is credited to the batting side as a no ball extra
	And 1 run is credited to the batsman
	And 2 runs are added to the bowler's total

	Scenario: Runout on the 2nd run on a no ball when a batsman has not hit the ball
	When a no ball is bowled
	And the batsman doesn't hit the ball
	And the batsmen is run out attempting the 2nd run
	Then 1 run is credited to the batting side as a no ball extra
	But no runs are credited to the batsman
	And 2 runs are added to the bowler's total