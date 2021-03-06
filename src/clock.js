// your clock code here
module.exports = Clock;

function Clock(object) {
  object = object || {};
  this.hour = validHour(object.hours) || 0;
  this.min = validSixty(object.minutes) || 0;
  this.sec = validSixty(object.seconds) || 0;
  this.format = '24';
  this.amPM = 'AM';
}
Clock.prototype.setHours = function(num) {
  if (num >= 12 && num < 24) {
    this.hour = validHour(num);
    this.format = '24';
    this.amPM = 'PM';
  } else if (num >= 0 && num <= 12) {
    this.hour = validHour(num);
  }
};
Clock.prototype.getHours = function() {
  return this.hour;
};

Clock.prototype.setMinutes = function(num) {
  this.min = validSixty(num);
};
Clock.prototype.getMinutes = function() {
  return this.min;
};

Clock.prototype.setSeconds = function(num) {
  this.sec = validSixty(num);
};
Clock.prototype.getSeconds = function() {
  return this.sec;
};

Clock.prototype.tick = function() {
  this.sec++;
  if (this.sec === 60) {
    this.sec = 0;
    this.min++;
  }
  if (this.min === 60) {
    this.min = 0;
    this.hour++;
  }
  if (this.format === '24') {
    if (this.hour === 24) {
      this.hour = 0;
      this.amPM = 'AM';
    }
  } else if (this.format === '12') {
    if (this.hour === 12) {
      this.hour = 0;
      this.amPM = 'AM';
    }
  }
  return clock1;
};

Clock.prototype.getFormat = function() {
  return this.format + '-hour format';
};
Clock.prototype.toggleFormat = function() {
  if (this.format === '24') {
    this.format = '12';
    if (this.hour > 12) {
      this.hour -= 12;
      this.amPM = 'PM';
    } else {
      this.amPm = 'AM';
    }
  } else {
    this.format = '24';
    if (this.amPM === 'PM') {
      this.hour += 12;
    }
  }
};

Clock.prototype.getTime = function() {
  if (this.format === '24') {
    return pad(this.hour) + ':' + pad(this.min) + ':' + pad(this.sec);
  } else {
    return pad(this.hour) + ':' + pad(this.min) + ':' + pad(this.sec) + ' ' + this.amPM;
  }
};

var initTime = {
  hours: 23,
  minutes: 59,
  seconds: 58
};
var invalidTime = {
  hours: 23,
  minutes: 62,
  seconds: 63
};

var clock1 = new Clock(initTime);
// clock1.tick().tick();
clock1.toggleFormat();
clock1.tick();
clock1.toggleFormat();
console.log(clock1.getTime());

var clock2 = new Clock();
// clock2.setHours(7);
console.log(clock2);
console.log(clock2.setHours());

function validHour(num) {
  if (num !== undefined) {
    if (num < 24 && num > 0) {
      return num;
    }
  } return 0;
}
function validSixty(num) {
  if (num !== undefined) {
    if (num < 60 && num > 0) {
      return num;
    }
  } return 0;
}

function pad(num) {
  if (num < 10) {
    return ('0' + num);
  } else {
    return ('' + num);
  }
}
