function User(name, currentFloor, targetFloor) {
    this.name = name;
    this.floor = currentFloor;
    this.targetFloor = targetFloor;
    this.isInsideLift = false;
    /*If the user is already on the target floor, set isDone = true*/
    this.isDone = this.floor == this.targetFloor;

    if (this.floor < this.targetFloor){
        this.direction = "Up";
    } else {
        this.direction = "Down";
    }

    this.getName = function(){
        return this.name;
    };
}

module.exports = User;