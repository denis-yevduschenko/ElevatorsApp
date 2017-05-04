function Lift() {
    this.currentFloor = 1;
    this.targetFloor = 1;
    this.lastFloor = 4;
    this.tasks = [];
    this.haveTask = false;
    this.direction = "Up";
    this.countForStop = 0;
    this.stoped = false;

    this.stop = function () {
        this.stoped = !this.stoped;
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

    this.checkDirection = function () {
        if((this.currentFloor > this.targetFloor) || (this.currentFloor == this.lastFloor)){
            this.direction = "Down";
        } else if((this.currentFloor < this.targetFloor) || (this.currentFloor == 1)){
            this.direction = "Up";
        }
    };

    this.enterToLift = function(User) {
        User.isInsideLift = true;
        console.log(User.name + " entered into lift.");
        if (!this.haveTask){
            this.targetFloor = User.targetFloor;
            this.checkDirection();
            console.log("Lift moves to " + this.targetFloor + " floor.");
            this.haveTask = true;
        }
    };

    this.leftFromLift = function(User) {
        User.isInsideLift = false;
        User.isDone = true;
        console.log(User.name + " left from lift.");
        if(this.targetFloor == User.targetFloor) {
             this.haveTask = false;
        }
    };

    this.takeNewCourse = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            if (!this.tasks[i].isDone){
                this.targetFloor = this.tasks[i].floor;
                this.checkDirection();
                console.log("Lift moves to " + this.targetFloor + " floor.");
                this.haveTask = true;
                break;
            }
        }
    };

    this.changeFloor = function () {
        if (this.direction == "Up"){
            this.currentFloor = this.currentFloor + 1;
        } else {
            this.currentFloor = this.currentFloor - 1;
        }
    };

    this.go = function() {
        var _this = this;
        _this.checkUser();

        var timerId = setInterval(function() {
            _this.countForStop = _this.countForStop + 1;
            if (_this.countForStop == 3 || _this.countForStop == 7){
                _this.stop();
            }

            if (!_this.stoped){
                _this.checkUser();
                if(_this.finish()){
                    console.log("Success! All tasks is done.");
                    clearInterval(timerId);
                    return;
                }
                _this.changeFloor();
                console.log("Floor: " + _this.currentFloor);
                console.log(timerId['_idleStart']);
            } else {
                console.log("Waiting...");
            }
        }, 4000);
    };

    this.checkUser = function() {
        var exit = false;
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.currentFloor == this.tasks[i].floor && !this.tasks[i].isDone && !this.tasks[i].isInsideLift && this.checkAvailability(this.tasks[i])){
                this.enterToLift(this.tasks[i]);
            }
            if (this.currentFloor == this.tasks[i].targetFloor && this.tasks[i].isInsideLift){
                this.leftFromLift(this.tasks[i]);
                exit = true;
            }
        }
        if (exit){
            this.takeNewCourse();
        }
    };

    this.finish = function () {
        var isAllTaskDone = true;
        for (var i = 0; i < this.tasks.length; i++) {
            if (!this.tasks[i].isDone){
                isAllTaskDone = false;
                break;
            }
        }
        console.log("finish: " + isAllTaskDone);
        return isAllTaskDone;
    };

    this.addTask = function(User) {
        this.tasks.push(User);
    };

    this.showTask = function() {
        console.log(this.tasks);
    };
}

module.exports = Lift;
