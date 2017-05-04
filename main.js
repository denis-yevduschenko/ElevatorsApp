var MainLift = require('./entity/lifts/MainLift');
var BetterMainLift = require('./entity/lifts/BetterMainLift');
var ThreeButtonLift = require('./entity/lifts/ThreeButtonLift');
var WeightLift = require('./entity/lifts/WeightLift');
var VipLift = require('./entity/lifts/VipLift');
var OneCallButtonLift = require('./entity/lifts/OneCallButtonLift');

var mainLift = new MainLift();
var betterLift = new BetterMainLift();
var threeButton = new ThreeButtonLift();
var wLift = new WeightLift();
var vipLift = new VipLift();
var oneButton = new OneCallButtonLift();

var param = process.argv[2] || "m";

if (param == "m"){mainLift.init();}
if (param == "m10"){mainLift.init10Floors();}
if (param == "b"){betterLift.init();}
if (param == "b10"){betterLift.init10Floors();}
if (param == "3b"){threeButton.init();}
if (param == "w"){wLift.init();}
if (param == "v"){vipLift.init();}
if (param == "1b"){oneButton.init();}
