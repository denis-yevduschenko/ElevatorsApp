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
        expect(user).toBe(lift.tasks[0]);
    });

    it("'s variable stoped should be true after 1 use func stop()", function() {
        lift.stop();
        expect(true).toBe(lift.stoped);
    });

    it("'s variable stoped should be false after 2 use func stop()", function() {
        lift.stop();
        lift.stop();
        expect(false).toBe(lift.stoped);
    });

    it(".currentFloor should be equal", function() {
        lift.changeFloor();
        lift.changeFloor();
        expect(3).toBe(lift.currentFloor);
    });

    it("'s variable stoped should be false after 2 use func stop()", function() {
        lift.changeFloor();
        lift.changeFloor();
        lift.direction = "Down";
        lift.changeFloor();
        expect(2).toBe(lift.currentFloor);
    });
});



