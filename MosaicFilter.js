
/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
  "use strict";

  // constructor:
  function MosaicFilter(target,dot) {
    this.width = target.getBounds().width;
    if(typeof dot == 'undefined'){
      this.dot = 10;
    }else{
      this.dot = dot;
    }
  }
  var p = createjs.extend(MosaicFilter, createjs.Filter);

  // public methods:
  p.toString = function() {
    return "[MosaicFilter]";
  };

  /** docced in super class **/
  p.clone = function() {
    return new MosaicFilter();
  };

  // private methods:
  p._applyFilter = function(imageData) { 
    var data = imageData.data;
    var l = data.length;
    var row,col,ind;

    for (var i=0; i<l; i+=4) {
      row = Math.floor(i / (this.width*4));
      col = i%(this.width*4)/this.dot;
      ind = i - (this.width*4)*(row % this.dot) - col%4*this.dot;

      data[i] =   data[ind];
      data[i+1] = data[ind+1];
      data[i+2] = data[ind+2];
      data[i+3] = data[ind+3];
    }
    return true;
  };

  createjs.MosaicFilter = createjs.promote(MosaicFilter, "Filter");
}());
