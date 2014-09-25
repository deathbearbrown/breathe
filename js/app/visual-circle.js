$(function() {
  //settings
  var inhale = 60;
  var exhale = 60;

  var $container = $('#visual');

  //visual
  var visual = new Two({
    width: 600,
    height: 600,
    type: Two.Types.svg
  }).appendTo($container[0]);

  var width = 44,
      half_width = width / 2,
      quart_width = half_width / 2,
      eight_width = quart_width / 2;

  var o = makeCircle({r:32, g:199, b:191},two);
  o.direction = false;
  o.translation.x = half_width;
  o.scale = 0;
  o.rate = 0.005;

  var group = visual.makeGroup(o);
  group.translation.set(visual.width / 2, visual.height / 2);
  group.scale = 3 * (300 / 486);



  visual.bind('update', function(frames) {

      var oScale = o.scale;
      var oDirection = o.direction;

      if (o.scale > 1 || o.scale < 0){
        o.direction = !oDirection;
      }
      var s = o.direction? oScale - o.rate : oScale + o.rate;
      o.scale = s;
  });

    _.defer(_.bind(visual.play, visual));




    //circles
    function makeCircle(color, two) {
      var circle1 = two.makeCircle(0, 0, width );
      var circle2 = two.makeCircle(0, 0, half_width);
      var circle3 = two.makeCircle(0, 0, quart_width);
      var circle4 = two.makeCircle(0, 0, eight_width);

      var rgb = Math.round(color.r) +',' + Math.round(color.g) + ',' + Math.round(color.b);

      circle1.fill = circle2.fill = circle3.fill = circle4.fill = 'rgba(' + rgb + ',' + 0.33 + ')';
      circle1.stroke = circle2.stroke = circle3.stroke = circle4.stroke = 'rgb(' + rgb + ')';
      circle1.linewidth = circle2.linewidth = circle3.linewidth = circle4.linewidth = 1;

      return two.makeGroup(circle1, circle2, circle3, circle4);
    }

});
