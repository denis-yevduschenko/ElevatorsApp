function User(name, startFloor, targetFloor) {
    this.name = name;
    this.startFloor = startFloor;
    this.targetFloor = targetFloor;
    this.isInsideLift = false;
    /*If the user is already on the target floor, set isDone = true*/
    this.isDone = this.startFloor == this.targetFloor;

    if (this.startFloor < this.targetFloor){
        this.direction = "Up";
    } else {
        this.direction = "Down";
    }

    this.getName = function(){
        return this.name;
    };
}

module.exports = User;