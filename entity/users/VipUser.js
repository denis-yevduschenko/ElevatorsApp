var util = require('util');
var User = require('../base/User');

function VipUser(name, startFloor, targetFloor, isVip) {
    VipUser.super_.apply(this, arguments);

    this.vip = isVip || false;
}

util.inherits(VipUser, User);

module.exports = VipUser;
