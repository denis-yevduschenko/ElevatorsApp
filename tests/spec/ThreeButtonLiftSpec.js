describe("ThreeButtonLift", function() {
    var User = require('../../entity/base/User');
    var ThreeButtonLift = require('../../entity/lifts/ThreeButtonLift');
    var user;
    var lift;

    beforeEach(function() {
        lift = new ThreeButtonLift();
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
        expect(lift.tasks[0]).toBe(user);
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
        expect(lift.targetFloor).toBe(4);
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

    it("should be equal", function() {
        user.targetFloor = 2;
        lift.currentFloor = 3;
        lift.upOrDown(user);

        expect(lift.targetFloor).toBe(1);
    });

    it("should move to last floor", function() {
        lift.upOrDown(user);
        lift.checkDirection();

        expect(lift.direction).toBe("last");
    });

    it("' user should left lift", function() {
        user.isInsideLift = true;
        lift.currentFloor = 4;
        lift.leftFromLift(user);

        expect(user.isInsideLift).toBeFalsy();
    });
});


