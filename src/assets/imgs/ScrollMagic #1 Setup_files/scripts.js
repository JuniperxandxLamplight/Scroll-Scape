$(function() {

  var $test = $(".lever");
  var $lever = $(".lever-test");

  var controller = new ScrollMagic.Controller();
  var tlRightSwipe = new TimelineMax()
    .fromTo("#middle-container", 1, {x: "100%"}, {x: "0%", ease: Linear.easeNone})
    .to(".television", 3, {"backgroundPositionY": "-750px"})
    .to(".stone-tv", 2, {left: '-30%'})
    .fromTo("#end-container", 2, {x: "100%"}, {x:"0%", ease: Linear.easeNone, delay: "2"})
    .fromTo(".square-dude", 12, {left: '5%'}, {left:'80%', ease: Linear.easeNone}, '-=8')
    .to(".grass-background", 12, {backgroundPositionX : "-30%"}, 0)
    .to(".grass-foreground", 12, {backgroundPositionX : "-80%"}, 0)
    .to(".trees-background", 12, {backgroundPositionX : "-2%"}, 0)
    .to(".trees-foreground", 12, {backgroundPositionX : "-10%"}, 0)

  var scene = new ScrollMagic.Scene({
    triggerElement: "#container",
    triggerHook: "onLeave",
    duration: '600%'
  })
  .setPin('#container')
  .setTween(tlRightSwipe)
  .addIndicators()
  .addTo(controller);

  //lever puzzle TweenMax



  $test.on("click", function(){
    $(".lever").toggleClass('activeLever');
    var tween = TweenMax.to(".television", 1, {
      backgroundPositionX: '-750px'
    });
  });

  var $wheel = $(".wheel");
  var wheelCount = 0;
  $('.wheel').on("click", function(){

    $wheel.toggleClass('spinning');

    if(wheelCount < 3) {
      var tlWheel = new TimelineMax()
      .to(".orangeDiv", 1, {y: '-=100px'})
      if(wheelCount === 2) {
        tlWheel.fromTo(".sparkle", 1, {autoAlpha: 0}, {autoAlpha: 1})
      }
    }
    wheelCount++;

  });

  $('.orangeDiv').on("click", function(){
    var tlWheel = new TimelineMax()
    .to(".orangeDiv", 1, {autoAlpha: 0});
    $(".orangeDiv").appendTo(".gemContainer");

    tlWheel.set(".orangeDiv" , {autoAlpha: 1});
  });
});
