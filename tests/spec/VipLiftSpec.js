describe("VipLift", function() {
    var User = require('../../entity/base/User');
    var VipLift = require('../../entity/lifts/VipLift');
    var user;
    var lift;

    beforeEach(function() {
        lift = new VipLift();
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
        user.direction = "Down";
        lift.haveTask = true;
        lift.targetFloor = 4;

        expect(lift.checkAvailability(user)).toBeFalsy();
    });

    it(" should be true", function() {
        lift.haveTask = false;

        expect(lift.checkAvailability(user)).toBeTruthy();
    });

    it(" should be equal", function() {
        lift.takeNewCourse();

        expect(1).toBe(lift.targetFloor);
    });

    it(" should be true", function() {
        var Vip = require("../../entity/users/VipUser");
        var vip1 = new Vip("vip", 1, 2, true);
        var lift2 = new VipLift();
        lift2.enterToLift(vip1);

        expect(lift2.vipInside).toBeTruthy();
    });
});

