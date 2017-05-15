describe("BaseLift", function() {
    var User = require('../../entity/base/User');
    var BaseLift = require('../../entity/base/BaseLift');
    var user;
    var lift;

    beforeEach(function() {
        lift = new BaseLift();
        user = new User();
    });

    afterEach(function () {
        user = null;
        lift = null;
    });

    it("should be not null", function() {
        expect(lift).not.toBeNull();
    });

    it("should be add to array of tasks", function() {
        lift.addTask(user);
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

    it(".currentFloor should be equal", function() {
        lift.changeFloor();
        lift.changeFloor();
        expect(lift.currentFloor).toBe(3);
    });

    it("'s variable stoped should be false after 2 use func stop()", function() {
        lift.changeFloor();
        lift.changeFloor();
        lift.direction = "Down";
        lift.changeFloor();
        expect(lift.currentFloor).toBe(2);
    });
});



