var util = require('util');
var User = require('../base/User');

function WeightUser() {
    WeightUser.super_.apply(this, arguments);

    this.weight = 70;
}

util.inherits(WeightUser, User);

module.exports = WeightUser;

