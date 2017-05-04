var util = require('util');
var BaseLift = require('../base/BaseLift');
var log = require("../../logger");

function WeightLift() {
    WeightLift.super_.apply(this, arguments);

    this.totalWeight = 0;
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
                    log.info("Total weight: " + _this.totalWeight);
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
        if (this.haveTask){
            if ( this.currentFloor == this.targetFloor){
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
        if(this.totalWeight <= 630){
            this.totalWeight = this.totalWeight + User.weight;
            User.isInsideLift = true;
            log.info(User.getName() + " entered into lift.");
            if (!this.haveTask){
                this.targetFloor = User.targetFloor;
                this.checkDirection();
                log.info("Lift moves to " + this.targetFloor + " floor.");
                this.haveTask = true;
            }
        } else {
            log.info(User.getName() + " can't move into lift.");
        }

    };

    this.leftFromLift = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        User.isInsideLift = false;
        User.isDone = true;
        this.totalWeight = this.totalWeight - User.weight;
        log.info(User.getName() + " left from lift.");
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

WeightLift.prototype.init = function () {
    var WeightUser = require('../users/WeightUser');
    var wLift = new WeightLift();

    var user1 = new WeightUser("User-1", 2, 4);
    var user2 = new WeightUser("User-2", 2, 3);
    var user3 = new WeightUser("User-3", 2, 1);
    var user4 = new WeightUser("User-4", 2, 4);
    var user5 = new WeightUser("User-5", 2, 3);
    var user6 = new WeightUser("User-6", 2, 3);
    var user7 = new WeightUser("User-7", 2, 4);
    var user8 = new WeightUser("User-8", 2, 3);
    var user9 = new WeightUser("User-9", 2, 4);
    var user10 = new WeightUser("User-10", 2, 4);
    var user11 = new WeightUser("User-11", 2, 3);
    var user12 = new WeightUser("User-12", 2, 3);
    wLift.addTask(user1);
    wLift.addTask(user2);
    wLift.addTask(user3);
    wLift.addTask(user4);
    wLift.addTask(user5);
    wLift.addTask(user6);
    wLift.addTask(user7);
    wLift.addTask(user8);
    wLift.addTask(user9);
    wLift.addTask(user10);
    wLift.addTask(user11);
    wLift.addTask(user12);
    wLift.showTask();
    wLift.go();
};

util.inherits(WeightLift, BaseLift);

module.exports = WeightLift;
