//Java Script Document


// SlideShow

// HTML Elements
const $slidesContainer = $('#slideshow');
const $slides = $slidesContainer.children('div');
//const $btnPrev = $('#btn_prev');
//const $btnNext = $('#btn_next');

const imgWidth = $slides.first().width();
const slideDuration = 2000;
let isSlideAnimating = false;
let timer;

// Position all the slides next to each other...
$slides.each(function(i){
  
  const leftPos = i * imgWidth;
  
  $(this).css('left', leftPos);
  
});

// Move the last slide in front of the first slide
// in case the user pushes the "prev" button...
$slides.last()
       .prependTo($slidesContainer)
       .css('left', -(imgWidth));

//startSlides();

//$btnPrev.click(prevSlide);
//$btnNext.click(nextSlide);

//$slidesContainer.on('mouseenter', startSlides);
$slidesContainer.on('mouseleave', pauseSlides);

function pauseSlides(){
  clearInterval(timer);
}

// function startSlides(){
//   timer = setInterval(nextSlide, slideDuration);
// }

function startSlidesPrev(){
  timer = setInterval(prevSlide, slideDuration);
}

function startSlidesNext(){
  timer = setInterval(nextSlide, slideDuration);
}

function prevSlide(e){    
  
  if(isSlideAnimating){
    return;
  }
  
  if(e){
    pauseSlides();
  }
  
  isSlideAnimating = true;
  
  $slidesContainer.children()
                  .last()
                  .css('left', -(imgWidth * 2))
                  .prependTo($slidesContainer);
  
   // Following code modified from a stackoverflow question...
   // jQuery $.animate() multiple elements but only fire callback once  
 
   // http://stackoverflow.com/questions/8793246/jquery-animate-multiple-elements-but-only-fire-callback-once      
  
   $slides.animate({'left': '+=' + imgWidth }, 300)
          .promise()
          .done( () => slideAnimationComplete(e, 'prev') );  
                   
} // end prevSlide;

function nextSlide(e){    
  
  if(isSlideAnimating){
    return;
  }
  
  if(e){
    pauseSlides(e);
  } 
  
  isSlideAnimating = true;
  
  $slidesContainer.children()
                  .first()
                  .css('left', imgWidth * ($slides.length - 1) )
                  .appendTo($slidesContainer);
 
  // Following code modified from a stackoverflow question...
  // jQuery $.animate() multiple elements but only fire callback once 

  // http://stackoverflow.com/questions/8793246/jquery-animate-multiple-elements-but-only-fire-callback-once  
  
  $slides.animate({'left': '-=' + imgWidth }, 300)
         .promise()
         .done( () => slideAnimationComplete(e, 'next') );  

} // end nextSlide

function slideAnimationComplete(evt, prevNext){
  isSlideAnimating = false;
  if(evt){
    //startSlides();
    if(prevNext === 'prev'){
      startSlidesPrev();
    }else{
      startSlidesNext();
    }
  } // end if e
} // end slideAnimationComplete




// End SlideShow
// -------------------------------------------------------------

// -------------------------------------------------------------
// Get mouse position with div...

var divPos = {};
var offset = $slidesContainer.offset();
var scWidth = $slidesContainer.width();
// var scHeight = $slidesContainer.height();

var inLeftSide = false;
var inRightSide = false;
var leftSideCounter = 0;
var rightSideCounter = 0;

console.log(scWidth);


$slidesContainer.mousemove(function(e){
    divPos = {
        left: e.pageX - offset.left,
        top: e.pageY - offset.top
    };

    //console.log(divPos.left);
    //console.log(divPos.top);

    if(divPos.left > 0 && divPos.left <(scWidth / 2)){


      //console.log('left side...');
      //prevSlide();
      if(rightSideCounter > 0){
        leftSideCounter = 0;
        rightSideCounter = 0;
      }



      if(leftSideCounter === 0){
        clearInterval(timer);
        leftSideCounter++;
        startSlidesPrev();

      }



    }else {

      //console.log('right side...');
      //nextSlide();
      if(rightSideCounter === 0){
        clearInterval(timer);
        rightSideCounter++;
        startSlidesNext();

      }

    }


});


$slidesContainer.mouseenter(function(e){


  if(divPos.left > 0 && divPos.left < (scWidth / 2)){

    //console.log('left side...');
    inLeftSide = true;
    //leftSideCounter++;

  }else {

    //console.log('right side...');
    inRightSide = true;
    //rightSideCounter++;

  }


});


$slidesContainer.mouseleave(function(e){

  inLeftSide = false;
  inRightSide = false;
  leftSideCounter = 0;
  rightSideCounter = 0;

  //clearInterval(timer);


});



// End Get mouse position within div
// --------------------------------------------------------------


//tutorial #2

var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');


$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});


//tutorial #3
const $items= $('.items img');
// const $iron = $('.iron');
// const $ironStick = $iron.css('left');

$items.on("click", function(){

    console.log('hello');

    if($(this).hasClass('iron')){
        console.log('iron');
        $(this).animate({
            left: '13%',
            top: '350px' 
        }, 1000);
    }else{
        console.log('not iron');
        $(this).fadeOut();
    }
});




