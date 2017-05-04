var log = require("../../logger");

function BaseLift() {
    this.currentFloor = 1;
    this.tasks = [];
    this.haveTask = false;
    this.count = 0;
    this.stoped = false;
    this.direction = "Up";
}

BaseLift.prototype.init = function() {
    log.error("Prepare your app for work!");
};

BaseLift.prototype.changeFloor = function () {
    if (this.direction == "Up"){
        this.currentFloor = this.currentFloor + 1;
    } else {
        this.currentFloor = this.currentFloor - 1;
    }
};

BaseLift.prototype.addTask = function(User) {
    log.debug("Added user to task list");
    this.tasks.push(User);
};

BaseLift.prototype.showTask = function() {
    console.log(this.tasks);
};

BaseLift.prototype.stop = function () {
    log.info("Someone pushed 'Stop' button");
    this.stoped = !this.stoped;
};

/*If all task is done then finish app*/
BaseLift.prototype.finish = function () {
    var isAllTaskDone = true;
    for (var i = 0; i < this.tasks.length; i++) {
        if (!this.tasks[i].isDone){
            isAllTaskDone = false;
            break;
        }
    }
    return isAllTaskDone;
};

module.exports = BaseLift;
