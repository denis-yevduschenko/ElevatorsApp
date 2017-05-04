describe("WeightLift", function() {
    var User = require('../../entity/users/WeightUser');
    var WeightLift = require('../../entity/lifts/WeightLift');
    var user;
    var lift;

    beforeEach(function() {
        lift = new WeightLift();
        user = new User('test', 1, 4);

        lift.addTask(user);
    });

    afterEach(function () {
        user = null;
        lift = null;
    });

    it("should be not null", function() {
        expect(lift).not.toBeNull();
    });

    it("should be add to array of tasks", function() {
        expect(user).toBe(lift.tasks[0]);
    });

    it("'s variable stoped should be true after 1 use func stop()", function() {
        lift.stop();
        expect(lift.stoped).toBeTruthy();
    });

    it("'s test-user should be inside", function() {
        lift.checkUser();
        expect(lift.tasks[0].isInsideLift).toBeTruthy();
    });

    it("'s test-user should be equal", function() {
        lift.checkUser();
        expect(4).toBe(lift.targetFloor);
    });

    it("'s test-user shouldn't be equal", function() {
        lift.checkUser();
        expect(3).not.toBe(lift.targetFloor);
    });

    it(".currentFloor should be equal", function() {
        lift.checkUser();
        lift.checkDirection();
        lift.changeFloor();
        lift.changeFloor();
        expect(3).toBe(lift.currentFloor);
    });

    it("' user should left lift", function() {
        user.isInsideLift = true;
        lift.currentFloor = 4;
        lift.leftFromLift(user);

        expect(user.isInsideLift).toBeFalsy();
    });

    it(" should be false", function() {
        lift.highPoint = 3;
        lift.currentFloor = 2;
        user.direction = "Down";

        expect(lift.checkAvailability(user)).toBeTruthy();
    });

    it(" should be true", function() {
        lift.haveTask = false;

        expect(lift.checkAvailability(user)).toBeTruthy();
    });

    it(" should be equal", function() {
        lift.enterToLift(user);

        expect(70).toBe(lift.totalWeight);
    });

    it(" should be equal", function() {
        lift.enterToLift(user);
        lift.leftFromLift(user);

        expect(0).toBe(lift.totalWeight);
    });
});

