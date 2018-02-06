import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';

// Create new instances of objects
var mobileMenu = new MobileMenu();

// Reusing RevealOnScroll object for diff elements
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");