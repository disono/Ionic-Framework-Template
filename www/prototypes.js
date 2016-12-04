// add hours
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
};

// minus hours
Date.prototype.minusHours = function(h) {
  this.setTime(this.getTime() - (h * 60 * 60 * 1000));
  return this;
};
