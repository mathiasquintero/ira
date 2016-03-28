function TestPrototype() {
  Array.prototype.each = function (f) {
    this.forEach(f);
  };
  Array.prototype.toJSON = function() {
    return "" + this;
  };
  String.prototype.strip = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  };
}

module.exports = TestPrototype;
