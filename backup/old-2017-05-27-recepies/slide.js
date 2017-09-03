var mousePressed = false;
var mouseT;
var mouseX, mouseY;
var mouseVX, mouseVY;
var scrollarea, scrolldata;
var scrollareawidth, scrolldatawidth;

function toLeft()
{
  $(scrolldata).animate({"left": "-=135px"}, "slow");
  $(scrolldata).animate({"left": "+=5px"}, "fast");
}

function toRight()
{
  $(scrolldata).animate({"left": "+=135px"}, "slow");
  $(scrolldata).animate({"left": "-=5px"}, "fast");
}

function updateClick(object)
{
  object.unbind('click');
  if (object.position().left < 10 ) {
    object.bind('click', function() {toRight();})
    } else if (object.position().left > scrollareawidth - object.width() ) {
      object.bind('click', function() {toLeft();});
      }
}

function scrollAreaMouseDown(e){
  var d = new Date();
  mouseT = d.getTime();
  
  if ((e.type == "mousedown") && !(e.button)){
  mousePressed = true;
  mouseX = e.screenX;
  mouseY = e.screenY;
  e.preventDefault();// to stop copy and paste
  } else if (e.type == "touchstart"){
  mousePressed = true;
  mouseX = e.changedTouches[0].screenX;
  mouseY = e.changedTouches[0].screenY;
  }
  
  if (mousePressed){
  newMouseX = mouseX; newMouseY = mouseY;
  mouseVX = 0; mouseVY = 0;

  document.body.addEventListener('mousemove', scrollAreaMouseMove);
  document.body.addEventListener('touchmove', scrollAreaMouseMove);
  document.body.addEventListener('mouseup', scrollAreaMouseUp);
  document.body.addEventListener('touchend', scrollAreaMouseUp);

  document.addEventListener('mouseout', scrollAreaMouseOut);
  }
  
  return false;
}

function scrollAreaMouseMove(e){
  if (mousePressed){
      var d = new Date();
      var mouseDT = d.getTime() - mouseT;
      var newMouseX, newMouseY;
    if (e.type == "mousemove"){
      newMouseX = e.screenX;
      newMouseY = e.screenY;
    } else if (e.type == "touchmove"){
      newMouseX = e.touches[0].screenX;
      newMouseY = e.touches[0].screenY;
      e.preventDefault();// to stop page scrolling
    }
    
    move(newMouseX - mouseX, 0);
    mouseT += mouseDT;
    mouseVX = (newMouseX - mouseX) / mouseDT;
    mouseVY = (newMouseY - mouseY) / mouseDT;
    mouseX = newMouseX;
    mouseY = newMouseY;
  }
}

function scrollAreaMouseOut(e){
  if(e.relatedTarget.nodeName == "HTML"){scrollAreaMouseUp(e);}
}

function scrollAreaMouseUp(e){
  var scrolldataleft = $(scrolldata).position().left;
  var scrolldataright = scrollareawidth - (scrolldatawidth + scrolldataleft);
  if (mousePressed) {
    mousePressed = false;
    if (scrolldataleft > 0) {
      toStart();
    } else if(scrolldataright > 0){
      toEnd();
    } else if (mouseVX > 0) {
        var offset = 400 * mouseVX;
        var test = scrolldataleft + offset;
        if (test > 0){
          var newoffset = Math.min(offset, 150 - scrolldataleft);
          var time = newoffset / mouseVX;
          $(scrolldata).animate({left: "+=" + newoffset + "px"},
                        {duration: time.toString(), easing: "linear"}
                      ).animate({left: 0},
                        {duration: "slow", easing: "easeOutSine"});
        } else {
          $(scrolldata).animate({left: "+=" + offset + "px"}, {duration: "400", easing: "easeOutSine"});          
        }
    } else if (mouseVX < 0) {
        var offset = - 400 * mouseVX;
        var test = scrolldataright + offset;
        if (test > 0){
          var newoffset = Math.min(offset, 150 - scrolldataright);
          offset = scrollareawidth - scrolldatawidth;
          var time = - newoffset / mouseVX;
          $(scrolldata).animate({left: "-=" + newoffset + "px"},
                        {duration: time.toString(), easing: "linear"}
                      ).animate({left: offset},
                        {duration: "slow", easing: "easeOutSine"});
        } else {
          $(scrolldata).animate({left: "-=" + offset + "px"}, {duration: "400", easing: "easeOutSine"});          
        }
    } 
  }
  
  mouseVX = 0;
  mouseVY = 0;
  
  document.body.removeEventListener('mousemove', scrollAreaMouseMove);
  document.body.removeEventListener('touchmove', scrollAreaMouseMove);
  document.body.removeEventListener('mouseup', scrollAreaMouseUp);
  document.body.removeEventListener('touchend', scrollAreaMouseUp);

  document.removeEventListener('mouseout', scrollAreaMouseOut);

}

function move(x, y){
  var offset = $(scrolldata).offset();
  var scrolldataleft = $(scrolldata).position().left;
  var scrolldataright = scrollareawidth - (scrolldatawidth + scrolldataleft);
  var dx = x;
  if (scrolldataleft > 0){dx = x * Math.min(1, Math.sqrt(10 / scrolldataleft));}
    else if (scrolldataright > 0){dx = x * Math.min(1, Math.sqrt(10 / scrolldataright));}
  $(scrolldata).offset({ top: offset.top + y, left: offset.left + dx });
}

function slowdown(vx, vy){
  var offset = vx * 50 + 5;
  var adj = vx / Math.abs(vx) * 5;
  $(scrolldata).animate({"left": "+=" + offset + "px"}, "slow");
  $(scrolldata).animate({"left": "-=" + adj +"px"}, "fast");
}

function toStart(){
  $(scrolldata).animate({left:0}, {duration: "slow", easing: "easeOutElastic"});
}

function toEnd(){
  var newoffset = scrollareawidth - scrolldatawidth;
  $(scrolldata).animate({left: newoffset}, {duration: "slow", easing: "easeOutElastic"});
}