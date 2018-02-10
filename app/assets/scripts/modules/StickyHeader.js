import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.lazyImages = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  // Refresh waypoints when image is loaded
  refreshWaypoints() {
    // When lazy image is loaded, perform anonymous function
    this.lazyImages.on('load', function () {
      // perform refresh on main Waypoint object using Waypoint method
      Waypoint.refreshAll();
    });
  }

  // Use 'smoothScroll' method to scroll to headerlinks
  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  // Make header navbar light or dark on scroll
  createHeaderWaypoint() {
    var that = this;
    new Waypoint({
      // Element expects javascript not jquery object, add array index [0] pointing to native DOM element
      element: this.headerTriggerElement[0],
      handler: function (direction) {
        if (direction == "down") {
          that.siteHeader.addClass("site-header--dark");
        } else {
          that.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }

  // Change color of nav links based on page section
  createPageSectionWaypoints() {
    var that = this;
    this.pageSections.each(function () {
      var currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function (direction) {
          if (direction == "down") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "18%"
      });
      new Waypoint({
        element: currentPageSection,
        handler: function (direction) {
          if (direction == "up") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "-40%"
      });
    });
  }

}

export default StickyHeader;