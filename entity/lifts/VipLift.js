var util = require('util');
var BaseLift = require('../base/BaseLift');
var log = require("../../logger");

function VipLift() {
    VipLift.super_.apply(this, arguments);

    this.targetFloor = 1;
    this.lastFloor = 4;
    this.vipInside = false;

    this.go = function() {
        var _this = this;
        _this.checkUser();
        log.info("Floor: " + _this.currentFloor);

        var timerId = setInterval(function() {
            _this.count = _this.count + 1;
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
                this.checkVipInside(this.tasks[i]);
            }
            if (this.currentFloor == this.tasks[i].targetFloor && this.tasks[i].isInsideLift && this.vipLeft(this.tasks[i])){
                this.leftFromLift(this.tasks[i]);
            }
        }
        if (!this.haveTask){
            this.takeNewCourse();
        }
    };

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

    this.checkVipInside = function (User) {
        if(this.vipInside){
            log.info("Vip is inside. Wait.")
        } else {
            this.enterToLift(User);
        }
    };


    this.vipLeft = function (User) {
        if(this.vipInside){
            return User.vip;
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
        log.info(User.name + " entered into lift.");
        if (!this.haveTask){
            if(User.vip){
                this.vipInside = true;
            }
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
            if(User.vip){
                this.vipInside = false;
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
}


VipLift.prototype.init = function () {
    var VipUser = require('../users/VipUser');
    var vipLift = new VipLift();

    var vip1 = new VipUser('vip-1', 1, 4, true);
    var vip2 = new VipUser('user-2', 2, 3, false);
    var vip3 = new VipUser('user-3', 4, 1, false);

    vipLift.addTask(vip1);
    vipLift.addTask(vip2);
    vipLift.addTask(vip3);
    vipLift.showTask();
    vipLift.go();
};

util.inherits(VipLift, BaseLift);

module.exports = VipLift;
