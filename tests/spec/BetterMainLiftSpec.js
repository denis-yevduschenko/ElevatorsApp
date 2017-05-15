describe("BetterMainLift", function() {
    var User = require('../../entity/base/User');
    var BetterMainLift = require('../../entity/lifts/BetterMainLift');
    var user;
    var lift;

    beforeEach(function() {
        lift = new BetterMainLift();
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

    it("'s variable stoped should be false after 2 use func stop()", function() {
        lift.stop();
        lift.stop();
        expect(lift.stoped).toBeFalsy();
    });

    it("'s test-user should be inside", function() {
        lift.checkUser();
        expect(lift.tasks[0].isInsideLift).toBeTruthy();
    });

    it("'s test-user should be equal", function() {
        lift.checkUser();
        expect(lift.targetFloor).toBe(1);
    });

    it("'s test-user shouldn't be equal", function() {
        lift.checkUser();
        expect(lift.targetFloor).not.toBe(3);
    });

    it(".currentFloor should be equal", function() {
        lift.checkUser();
        lift.checkDirection();
        lift.changeFloor();
        lift.changeFloor();
        expect(lift.currentFloor).toBe(3);
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

        expect(lift.checkAvailability(user)).toBeFalsy();
    });

    it(" should be true", function() {
        lift.haveTask = false;

        expect(lift.checkAvailability(user)).toBeTruthy();
    });

    it(" should be equal", function() {
        var user2 = new User("test-2", 2, 3);
        var user3 = new User("test-3", 3, 2);
        var user4 = new User("test-4", 3, 1);
        lift.addTask(user2);
        lift.addTask(user3);
        lift.addTask(user4);
        lift.improveLift(lift.tasks);

        expect(lift.highPoint).toBe(4);
    });
});
