(function() {
  'use strict';

  var Clock = require('../src/clock');

  var chai = require('chai');
  var expect = chai.expect;

  // your test code here
  describe('Clock', function () {
    it('should create an instance defaulting to midnight in 24 hr format', function () {
      var newClock = new Clock;

      expect(newClock.getTime()).to.equal('00:00:00');
      expect(newClock.getFormat()).to.equal('24-hour format');
    })
    it('should accept an optional object that manually sets the time', function () {
      var time = {
        hours: 23,
        minutes: 59,
        seconds: 58
      }
      var newClock = new Clock(time);

      expect(newClock.getTime()).to.equal('23:59:58');
    })
    it('should not set values that do not correspond with an actual clock value', function () {
      var bogusTime = {
        hours: 25,
        minutes: 66,
        seconds: 81
      }
      var newClock = new Clock(bogusTime);

      expect(newClock.getTime()).to.equal('00:00:00');
    })
  })

  describe('setHours/Minutes/Seconds', function () {
    it('should set the clock hours, minutes or seconds as specified', function () {
      var newClock = new Clock;
      newClock.setHours(3);
      newClock.setMinutes(16);
      newClock.setSeconds(47);

      expect(newClock.hour).to.equal(3);
      expect(newClock.min).to.equal(16);
      expect(newClock.sec).to.equal(47);
    })
    it('should switch from 12 to 24 hr format if input is in 24 hr format', function () {
      var newClock = new Clock;
      newClock.toggleFormat();
      newClock.setHours(17);
      newClock.setMinutes(16);
      newClock.setSeconds(47);

      expect(newClock.getTime()).to.equal('17:16:47');
    })
    it('should not set values that do not correspond with an actual clock value', function () {
      var newClock = new Clock;
      newClock.setHours(90);
      newClock.setMinutes(61);
      newClock.setSeconds(70);

      var newerClock = new Clock;
      newerClock.setHours(-1);
      newerClock.setMinutes(-1);
      newerClock.setSeconds(-1);

      expect(newClock.getTime()).to.equal('00:00:00');
      expect(newerClock.getTime()).to.equal('00:00:00');
    })
  })

  describe('getHours/Minutes/Seconds', function () {
    it('should return the clock hours, minutes or seconds values', function () {
      var newClock = new Clock;
      newClock.setHours(7);
      newClock.setMinutes(29);
      newClock.setSeconds(32);

      expect(newClock.getHours()).to.equal(7);
      expect(newClock.getMinutes()).to.equal(29);
      expect(newClock.getSeconds()).to.equal(32);
    })
  })

  describe('tick', function () {
    it('should increase the seconds by one', function () {
      var newClock = new Clock;
      newClock.tick();

      expect(newClock.getTime()).to.equal('00:00:01');
    })
    it('should reset hours if format limit is reached (12 or 24, minutes and seconds if 60 is reached)', function () {
      var time = {
        hours: 23,
        minutes: 59,
        seconds: 59
      }

      var newClock = new Clock(time);
      newClock.tick();

      var newerClock = new Clock(time);
      newerClock.toggleFormat();
      newerClock.tick();

      expect(newClock.getTime()).to.equal('00:00:00');
      expect(newerClock.getTime()).to.equal('00:00:00 AM');
    })
  })

  describe('getFormat', function () {
    it('should return the current clock format', function () {
      var newClock = new Clock;
      var newerClock = new Clock;
      newerClock.toggleFormat();

      expect(newClock.getFormat()).to.equal('24-hour format');
      expect(newerClock.getFormat()).to.equal('12-hour format');
    })
  })

  describe('toggleFormat', function () {
    it('should adjust the time appropriately from 12 to 24 and vice-versa', function () {
      var time = {
        hours: 23,
        minutes: 59,
        seconds: 58
      }
      var newClock = new Clock(time);
      newClock.toggleFormat();
      var newerClock = new Clock(time);

      expect(newClock.getTime()).to.equal('11:59:58 PM');
      expect(newerClock.getTime()).to.equal('23:59:58');
    })
  })

  describe('getTime', function () {
    it('should return the time in the proper format, padded, very appropriately, with zero\'s', function () {
      var newClock = new Clock;
      newClock.toggleFormat();
      var newerClock = new Clock;

      expect(newClock.getTime()).to.equal('00:00:00 AM');
      expect(newerClock.getTime()).to.equal('00:00:00');
    })
  })

}());
