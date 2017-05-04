var util = require('util');
var BaseLift = require('../base/BaseLift');
var log = require("../../logger");

function OneCallButtonLift() {
    OneCallButtonLift.super_.apply(this, arguments);
    this.targetFloor = 1;
    this.queue = [];


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
        if (!this.haveTask && this.queue.length == 0){
            this.targetFloor = User.targetFloor;
            this.checkDirection();
            log.info("Lift moves to " + this.targetFloor + " floor.");
            this.haveTask = true;
        } else {
            this.queue.push(User);
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
        /*Delete current User from queue*/
        if (this.queue.length > 0 && User.getName() == this.queue[0].getName()){
            this.queue.shift();
        }
    };

    this.takeNewCourse = function () {
        for (var j = 0; j < this.queue.length; j++) {
            if (this.queue[j] !== undefined && this.queue[j].isInsideLift && !this.queue[j].isDone){
                this.targetFloor = this.queue[j].targetFloor;
                this.checkDirection();
                log.info("Lift moves to " + this.targetFloor + " floor.");
                this.haveTask = true;
                return;
            }
        }
        for (var i = 0; i < this.tasks.length; i++) {
            if (!this.tasks[i].isDone){
                this.targetFloor = this.tasks[i].currentFloor;
                this.checkDirection();
                log.info("Lift moves to " + this.targetFloor + " floor.");
                this.haveTask = true;
                return;
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

OneCallButtonLift.prototype.init = function () {
    var User = require('../base/User');
    var oneButton = new OneCallButtonLift();

    var user1 = new User("User-1", 1, 4);
    var user2 = new User("User-2", 3, 2);
    var user3 = new User("User-3", 4, 1);

    oneButton.addTask(user1);
    oneButton.addTask(user2);
    oneButton.addTask(user3);

    oneButton.go();
};

util.inherits(OneCallButtonLift, BaseLift);

module.exports = OneCallButtonLift;
