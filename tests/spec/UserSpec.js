describe("User", function() {
    var User = require('../../entity/base/User');
    var user;

    beforeEach(function() {
        user = new User('user-test', 1, 4);
    });

    afterEach(function () {
        user = null;
    });

    it("should be not null", function() {
        expect(user).not.toBeNull();
    });

    it("currentFloor should be equals", function() {
        expect(1).toBe(user.startFloor);
    });

    it("currentFloor shouldn't be equals", function() {
        expect(3).not.toBe(user.startFloor);
    });

    it("targetFloor should be equals", function() {
        expect(4).toBe(user.targetFloor);
    });

    it("targetFloor shouldn't be equals", function() {
        expect(3).not.toBe(user.targetFloor);
    });

    it("Name should be equals", function() {
        expect('user-test').toBe(user.getName());
    });

    it("should be equals", function() {
        expect('user').not.toBe(user.getName());
    });

    it("Direction should be 'Up'", function() {
        expect('Up').toBe(user.direction);
    });

    it("Direction should be 'Down'", function() {
        user = new User('user-go-down', 3, 2);
        expect('Down').toBe(user.direction);
    });
});
