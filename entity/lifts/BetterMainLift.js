var util = require('util');
var BaseLift = require('../base/BaseLift');
var log = require("../../logger");

function BetterMainLift() {
    BetterMainLift.super_.apply(this, arguments);

    this.targetFloor = 1;
    this.lastFloor = 4;
    this.haveTask = true; /*In this case Lift always has task*/
    this.startPoint = 1;
    this.highPoint = 1;
    this.endPoint = 1;

    this.controlPoint1 = false;
    this.controlPoint2 = false;
    this.controlPoint3 = false;

    this.go = function() {
        var _this = this;
        _this.checkUser();
        _this.moveToPoint();
        log.info("Floor: " + _this.currentFloor);

        var timerId = setInterval(function() {
            _this.count++;
            if (!_this.stoped){
                if (_this.count % 4 == 0){
                    _this.changeFloor();
                    log.info("Floor: " + _this.currentFloor);

                    _this.checkUser();
                    _this.moveToPoint();

                    if(_this.finish()){
                        log.info("Success! All tasks are done.");
                        clearInterval(timerId);
                        return;
                    }
                }
                log.info("Time: " + timerId['_idleStart']);
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
    };

    /*Can we enter into lift before it run to highPoint?*/
    this.checkAvailability = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        if (this.currentFloor == this.highPoint){
            return true;
        } else {
            return User.direction == this.direction;
        }
    };

    this.moveToPoint = function () {
        if(this.currentFloor == this.targetFloor || !this.controlPoint1){
            this.path();
        }
    };

    this.path = function () {
        if (this.controlPoint1 && this.controlPoint2 && !this.controlPoint3){
            this.targetFloor = this.endPoint;
            this.controlPoint3 = true;
            this.checkDirection();
            log.info("Lift moves to " + this.targetFloor + " floor.");
            return;
        }
        if (this.controlPoint1 && !this.controlPoint2){
            this.targetFloor = this.highPoint;
            this.controlPoint2 = true;
            this.checkDirection();
            log.info("Lift moves to " + this.targetFloor + " floor.");
            return;
        }
        if (!this.controlPoint1){
            this.targetFloor = this.startPoint;
            this.controlPoint1 = true;
            this.checkDirection();
            log.info("Lift moves to " + this.targetFloor + " floor.");
        }
        if (this.controlPoint3){
            log.info("This is the end of path!");
        }
    };

    this.enterToLift = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        User.isInsideLift = true;
        log.info(User.name + " entered into lift. His direction: " + User.direction);
    };

    this.leftFromLift = function(User) {
        if (User === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        User.isInsideLift = false;
        User.isDone = true;
        log.info(User.name + " left from lift.");
    };

    this.checkDirection = function () {
        if((this.currentFloor > this.targetFloor) || (this.currentFloor == this.lastFloor)){
            this.direction = "Down";
        } else if((this.currentFloor < this.targetFloor) || (this.currentFloor == 1)){
            this.direction = "Up";
        }
    };

    this.improveLift = function (Users) {
        if (Users === null){
            log.error("Function parameter was null");
            throw "Function parameter was null";
        }
        var UpUsers = [];
        var DownUsers = [];
        /*create 2 arrays: UpUsers with User.direction == "Up" and DownUsers with User.direction == "Down"*/
        for (var i = 0; i < Users.length; i++) {
            if (Users[i].direction == "Up"){
                UpUsers.push(Users[i]);
            } else {
                DownUsers.push(Users[i]);
            }
        }
        /*Sort by startFloor*/
        UpUsers.sort(function (a, b) {
            return a.startFloor - b.startFloor;
        });
        this.startPoint = UpUsers[0].startFloor;
        UpUsers.sort(function (a, b) {
            return a.targetFloor - b.targetFloor;
        });
        this.tempHighPoint = UpUsers[UpUsers.length - 1].targetFloor;
        DownUsers.sort(function (a, b) {
            return a.startFloor - b.startFloor;
        });
        this.tempHighPoint2 = DownUsers[DownUsers.length - 1].startFloor;
        DownUsers.sort(function (a, b) {
            return a.targetFloor - b.targetFloor;
        });
        this.endPoint = DownUsers[0].targetFloor;

        //find the highest floor which we need to go
        if(this.tempHighPoint > this.tempHighPoint2){
            this.highPoint = this.tempHighPoint;
        } else {
            this.highPoint = this.tempHighPoint2;
        }
        log.info("Start point: " + this.startPoint);
        log.info("The highest point: " + this.highPoint);
        log.info("End point: " + this.endPoint);

        if (this.startPoint == 1) {
            this.controlPoint1 = true;
        }
    }
}

BetterMainLift.prototype.init = function () {
    var User = require('../base/User');
    var betterLift = new BetterMainLift();

    var user1 = new User("User-1", 3, 4);
    var user2 = new User("User-2", 3, 2);
    var user3 = new User("User-3", 4, 1);

    betterLift.addTask(user1);
    betterLift.addTask(user2);
    betterLift.addTask(user3);
    betterLift.improveLift(betterLift.tasks);
    betterLift.go();

};

BetterMainLift.prototype.init10Floors = function () {
    var User = require('../base/User');
    var betterLift = new BetterMainLift();

    var user1 = new User("User-1", 2, 5);
    var user2 = new User("User-2", 10, 6);
    var user3 = new User("User-3", 4, 2);
    var user4 = new User("User-4", 4, 3);
    var user5 = new User("User-5", 8, 2);
    var user6 = new User("User-6", 3, 8);
    var user7 = new User("User-7", 8, 3);
    var user8 = new User("User-8", 3, 2);
    var user9 = new User("User-9", 3, 7);
    var user10 = new User("User-10", 1, 7);
    var user11 = new User("User-11", 7, 2);
    var user12 = new User("User-12", 8, 3);
    var user13 = new User("User-13", 9, 3);
    var user14 = new User("User-14", 1, 9);
    var user15 = new User("User-15", 1, 2);
    var user16 = new User("User-16", 5, 3);
    var user17 = new User("User-17", 6, 5);
    var user18 = new User("User-18", 7, 3);
    var user19 = new User("User-19", 2, 4);
    var user20 = new User("User-20", 7, 6);

    betterLift.addTask(user1);
    betterLift.addTask(user2);
    betterLift.addTask(user3);
    betterLift.addTask(user4);
    betterLift.addTask(user5);
    betterLift.addTask(user6);
    betterLift.addTask(user7);
    betterLift.addTask(user8);
    betterLift.addTask(user9);
    betterLift.addTask(user10);
    betterLift.addTask(user11);
    betterLift.addTask(user12);
    betterLift.addTask(user13);
    betterLift.addTask(user14);
    betterLift.addTask(user15);
    betterLift.addTask(user16);
    betterLift.addTask(user17);
    betterLift.addTask(user18);
    betterLift.addTask(user19);
    betterLift.addTask(user20);
    betterLift.improveLift(betterLift.tasks);/* without improveLift(); time: ~150 second*/
    betterLift.go();
};

util.inherits(BetterMainLift, BaseLift);

module.exports = BetterMainLift;
