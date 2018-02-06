import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    //add '.reveal-item' to each element w/'.feature-item'
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints() {
    // Assign variable to RevealOnScroll property to be used in this scope
    var that = this;
    // using jquery 'each' to apply function to each item
    this.itemsToReveal.each(function () {
      // create variable and assign to 'this' which is referring to 'itemsToReveal'
      var currentItem = this;
      // create a new instance of Waypoint
      new Waypoint({
        //element we want to watch for
        element: currentItem,
        //handler is what we want to happen to that element 
        handler: function () {
          $(currentItem).addClass("reveal-item--is-visible");
        },
        offset: that.offsetPercentage
      });
    });
  }
}

export default RevealOnScroll;

