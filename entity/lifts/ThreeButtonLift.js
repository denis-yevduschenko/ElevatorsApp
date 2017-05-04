var util = require('util');
var BaseLift = require('../base/BaseLift');
var log = require("../../logger");

function ThreeButtonLift() {
    ThreeButtonLift.super_.apply(this, arguments);
    this.targetFloor = 1;
    this.firstFloor = 1;
    this.lastFloor = 4;

    this.go = function() {
        var _this = this;
        _this.checkUser();
        log.info("Floor: " + _this.currentFloor);

        var timerId = setInterval(function() {
            _this.count++;
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
            if (this.currentFloor == this.tasks[i].startFloor && !this.tasks[i].isDone && !this.tasks[i].isInsideLift){
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

    this.enterToLift = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        User.isInsideLift = true;
        log.info(User.getName() + " entered into lift.");
        if (!this.haveTask){
            this.upOrDown(User);
            this.checkDirection();
            log.info("Lift moves to " + this.direction + " floor.");
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
        if(this.targetFloor == User.targetFloor && this.targetFloor == this.currentFloor) {
            this.haveTask = false;
        }
    };

    this.takeNewCourse = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            if (!this.tasks[i].isDone){
                this.targetFloor = this.tasks[i].currentFloor;
                this.upOrDown(this.tasks[i]);
                this.checkDirection();
                log.info("Lift moves to " + this.targetFloor + " floor.");
                this.haveTask = true;
                break;
            }
        }
    };

    this.upOrDown = function (User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        if (User.targetFloor > this.currentFloor){
            this.targetFloor = this.lastFloor;
        } else {
            this.targetFloor = this.firstFloor;
        }
    };

    this.checkDirection = function () {
        if(this.currentFloor > this.targetFloor){
            this.direction = "first";
        } else if(this.currentFloor < this.targetFloor){
            this.direction = "last";
        }
    };
}

ThreeButtonLift.prototype.changeFloor = function() {
    if (this.direction == "last"){
        this.currentFloor = this.currentFloor + 1;
    } else {
        this.currentFloor = this.currentFloor - 1;
    }
};

ThreeButtonLift.prototype.init = function () {
    var User = require('../base/User');
    var threeButton = new ThreeButtonLift();

    var user1 = new User("User-1", 1, 4);
    var user2 = new User("User-2", 3, 2);
    var user3 = new User("User-3", 4, 1);

    threeButton.addTask(user1);
    threeButton.addTask(user2);
    threeButton.addTask(user3);

    threeButton.go();
};

util.inherits(ThreeButtonLift, BaseLift);

module.exports = ThreeButtonLift;