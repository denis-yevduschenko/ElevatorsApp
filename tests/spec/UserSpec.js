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
        expect(user.startFloor).toBe(1);
    });

    it("currentFloor shouldn't be equals", function() {
        expect(user.startFloor).not.toBe(3);
    });

    it("targetFloor should be equals", function() {
        expect(user.targetFloor).toBe(4);
    });

    it("targetFloor shouldn't be equals", function() {
        expect(user.targetFloor).not.toBe(3);
    });

    it("Name should be equals", function() {
        expect(user.getName()).toBe('user-test');
    });

    it("should be equals", function() {
        expect(user.getName()).not.toBe('user');
    });

    it("Direction should be 'Up'", function() {
        expect(user.direction).toBe('Up');
    });

    it("Direction should be 'Down'", function() {
        user = new User('user-go-down', 3, 2);
        expect(user.direction).toBe('Down');
    });
});
