describe("Lift", function() {
    var User = require('../../entity/base/user');
    var Lift = require('../../entity/base/BaseLift');
    var user;
    var lift;

    beforeEach(function() {
        user = new User('user-test', 1, 4);
        lift = new Lift();
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


});



