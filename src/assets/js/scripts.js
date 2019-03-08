$(function() {

  function shake(element) {
    new TimelineMax()
    .to(element, .1, {x: -10})
    .to(element, .1, {x: 10})
    .to(element, .1, {x:0})
    .repeat(2);
  }

  function ending() {
    new TimelineMax()
    .to(".victory", 1 , {top: '0'}, 3)
    .setPin(".victory");
  }

  var $lever = $(".lever");
  var collectedGems = 0;
  var controller = new ScrollMagic.Controller();
  var tlRightSwipe = new TimelineMax()
  .fromTo("#middle-container", 1, {x: "100%"}, {x: "0%", ease: Linear.easeNone})
  .to(".television", 3, {"backgroundPositionY": "-750px"})
  .to(".stone-tv", 2, {left: '-30%'})
  .to(".vendingMachine", 3, {left: '-30%'}, '-=1')
  .fromTo("#end-container", 2, {x: "100%"}, {x:"0%", ease: Linear.easeNone, delay: "0"})
  .fromTo(".square-dude", 12, {left: '5%'}, {left:'80%', ease: Linear.easeNone}, '-=8')
  .eventCallback("onComplete", function(){
    if(collectedGems < 3) {
      shake(".door")

    } else {
      $(".vortex").addClass('big');
      $(".square-dude").addClass('end');
      ending()
    }
  })
  .to(".grass-background", 12, {backgroundPositionX : "-30%"}, 0)
  .to(".grass-foreground", 12, {backgroundPositionX : "-80%"}, 0)
  .to(".trees-background", 12, {backgroundPositionX : "-2%"}, 0)
  .to(".trees-foreground", 12, {backgroundPositionX : "-10%"}, 0)

  var scene = new ScrollMagic.Scene({
    triggerElement: "#container",
    triggerHook: "onLeave",
    duration: '800%'
  })
  .setPin('#container')
  .setTween(tlRightSwipe)
  .addIndicators()
  .addTo(controller);


  //lever puzzle TweenMax





  $lever.on("click", function(){
    $lever.toggleClass('activeLever');
    if($lever.hasClass('activeLever')) {
      TweenMax.to(".television", 1, {
        backgroundPositionX: '-750px'
      });
    } else {
      TweenMax.to(".television", 1, {
        backgroundPositionX: '0px'
      });
    }

  });

  var $wheel = $(".wheel");
  var $gemDiv = $(".gemDiv");
  var wheelCount = 0;

  $wheel.on("click", function(){

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

  function collectGem(gem) {
    if(!gem.hasClass("collected")) {
      var tlWheel = new TimelineMax()
      .to(gem, 1, {autoAlpha: 0})
      .set(gem, {x: 0, y:0, position: 'static'})
      .eventCallback("onComplete", function(){
        gem.addClass("collected").appendTo(".gemContainer")
        TweenMax.to(gem, 1, {autoAlpha: 1});
      });
      collectedGems++;
    }
  }

  $gemDiv.on("click", function(){
    collectGem($(this));
    console.log("collected gem");
  });

  $(".purple-gem-hotspot").on("click", function(){
    collectGem($(".purpleDiv"));
    $(".purpleSparkle").fadeIn();
  });

  var $numbers = $(".numbers");
  var machineCount = 0;
  var userInputs = "";
  $numbers.on("click", function() {
    var currentNumber = ($(this).text());
    userInputs += currentNumber;
    $(".numbersDisplay").text(userInputs);
    $(".numbersDisplay").addClass('numbersShow');
    machineCount++
    if (machineCount === 4){
      if (userInputs == "3149"){
        $(".numbersDisplay").removeClass('numbersShow');
        $('.blueDiv').show();
      } else{
        shake(".vendingMachine");
        userInputs = "";
        $(".numbersDisplay").removeClass('numbersShow');
      }
      machineCount = 0;
    }
  });

});
