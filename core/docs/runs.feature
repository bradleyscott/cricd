Feature: Runs from the batt should be scored
	Each delivery resulting in a dot ball or runs is a valid ball for the over
	Each counts as a delivery faced by a batsman
	Any runs taken are awarded to the batsman on strike
	Any runs are added to the bowler's total

	Scenario: Dot ball
	When a legal delivery is bowled
	And the batsmen do not run
	Then the ball is counted as a legal ball in that over
	And the ball counts as one the batsman has faced

	Scenario: Single
	When a legal delivery is bowled
	And the batsmen take 1 run
	Then the ball is counted as a legal ball in that over
	And the ball counts as one the batsman has faced
	And the batsman and the batting side are credited with 1 run
	And 1 run is added to the bowler's total
	And the batsman previously off strike is now on strike

	Scenario: Boundary 4
	When a legal delivery is bowled
	And the batsmen hits the ball to the boundary
	Then the ball is counted as a legal ball in that over
	And the ball counts as one the batsman has faced
	And the batsman and the batting side is credited with 4 runs
	And 4 runs are added to the bowler's total