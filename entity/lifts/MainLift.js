var util = require('util');
var BaseLift = require('../base/BaseLift');
var log = require("../../logger");

function MainLift() {
    MainLift.super_.apply(this, arguments);

    this.targetFloor = 1;
    this.lastFloor = 4;

    this.go = function() {
        var _this = this;
        _this.checkUser();
        log.info("Floor: " + _this.currentFloor);

        var timerId = setInterval(function() {
            _this.count++;
            if (_this.count == 3 || _this.count == 7){
                _this.stop();
            }

            if (!_this.stoped){
                if (_this.count % 4 == 0){
                    _this.changeFloor();
                    log.info("Floor: " + _this.currentFloor);

                    _this.checkUser();

                    if(_this.finish()){
                        log.info("Success! All tasks is done.");
                        clearInterval(timerId);
                        return;
                    }
                }
                log.info(timerId['_idleStart']);
            } else {
                log.info("Waiting...");
            }
        }, 1000);
    };

    this.checkUser = function() {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.currentFloor == this.tasks[i].startFloor && !this.tasks[i].isDone && !this.tasks[i].isInsideLift && this.checkAvailability(this.tasks[i])){
                this.enterToLift(this.tasks[i]);
            }
            if (this.currentFloor == this.tasks[i].targetFloor && this.tasks[i].isInsideLift){
                this.leftFromLift(this.tasks[i]);
            }
        }
        if (!this.haveTask){
            this.takeNewCourse();
        }
    };

    /*Can we take new task or enter into lift?*/
    this.checkAvailability = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        if (this.haveTask){
            if (this.currentFloor == this.targetFloor){
                this.haveTask = false;
                return true;
            }
            return User.direction == this.direction;
        } else {
            return true;
        }
    };

    this.enterToLift = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        User.isInsideLift = true;
        log.info(User.name + " entered into lift. His direction: " + User.direction);
        if (!this.haveTask){
            this.targetFloor = User.targetFloor;
            this.checkDirection();
            log.info("Lift moves to " + this.targetFloor + " floor.");
            this.haveTask = true;
        }
    };

    this.leftFromLift = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        User.isInsideLift = false;
        User.isDone = true;
        log.info(User.name + " left from lift.");
        if(this.targetFloor == User.targetFloor) {
            this.haveTask = false;
        }
    };

    this.takeNewCourse = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            if (!this.tasks[i].isDone){
                this.targetFloor = this.tasks[i].startFloor;
                this.checkDirection();
                log.info("Lift moves to " + this.targetFloor + " floor.");
                this.haveTask = true;
                break;
            }
        }
    };

    this.checkDirection = function () {
        if((this.currentFloor > this.targetFloor) || (this.currentFloor == this.lastFloor)){
            this.direction = "Down";
        } else if((this.currentFloor < this.targetFloor) || (this.currentFloor == 1)){
            this.direction = "Up";
        }
    };
}

MainLift.prototype.init = function () {
    var User = require('../base/User');
    var mainLift = new MainLift();

    var user1 = new User("User-1", 1, 4);
    var user2 = new User("User-2", 3, 2);
    var user3 = new User("User-3", 4, 1);

    mainLift.addTask(user1);
    mainLift.addTask(user2);
    mainLift.addTask(user3);
    mainLift.go();

};

MainLift.prototype.init10Floors = function () {
    var User = require('../base/User');
    var mainLift = new MainLift();

    var user1 = new User("User-1", 2, 5);
    var user2 = new User("User-2", 1, 6);
    var user3 = new User("User-3", 4, 1);
    var user4 = new User("User-4", 4, 3);
    var user5 = new User("User-5", 8, 1);
    var user6 = new User("User-6", 3, 8);
    var user7 = new User("User-7", 8, 3);
    var user8 = new User("User-8", 3, 1);
    var user9 = new User("User-9", 3, 7);
    var user10 = new User("User-10", 1, 7);
    var user11 = new User("User-11", 7, 1);
    var user12 = new User("User-12", 8, 3);
    var user13 = new User("User-13", 9, 3);
    var user14 = new User("User-14", 1, 9);
    var user15 = new User("User-15", 1, 2);
    var user16 = new User("User-16", 5, 3);
    var user17 = new User("User-17", 6, 5);
    var user18 = new User("User-18", 7, 3);
    var user19 = new User("User-19", 2, 4);
    var user20 = new User("User-20", 7, 6);

    mainLift.addTask(user1);
    mainLift.addTask(user2);
    mainLift.addTask(user3);
    mainLift.addTask(user4);
    mainLift.addTask(user5);
    mainLift.addTask(user6);
    mainLift.addTask(user7);
    mainLift.addTask(user8);
    mainLift.addTask(user9);
    mainLift.addTask(user10);
    mainLift.addTask(user11);
    mainLift.addTask(user12);
    mainLift.addTask(user13);
    mainLift.addTask(user14);
    mainLift.addTask(user15);
    mainLift.addTask(user16);
    mainLift.addTask(user17);
    mainLift.addTask(user18);
    mainLift.addTask(user19);
    mainLift.addTask(user20);
    mainLift.go();
};

util.inherits(MainLift, BaseLift);

module.exports = MainLift;