require([
  'jquery',
  'two',
  'app/geo'
  ],
function($, Two, Geo){
  var $container = $('#visual');

  //visual
  var visual = new Two({
    width: 600,
    height: 450,
    type: Two.Types.svg
  }).appendTo($container[0]);


  var w = Geo.TestGraph({
            color: {r:100, g:81, b:104},
            center: {x:0, y:0},
            two: visual,
            sides: 30,
            radius: 100
          });
  w.scale = 1;
  w.translation.x = 0;
  w.direction = false;
  w.rate = 0.005;

  // var t= Geo.tessShell({
  //           color: {r:100, g:81, b:104},
  //           center: {x:10, y:10},
  //           two: visual,
  //           sides: 12,
  //           radius: 100
  //         });
  // t.scale = 1;
  // t.translation.x = 0;
  // t.rate = 0.005;
  // t.direction = false;

  var group = visual.makeGroup(w);
  group.translation.set(visual.width / 2, visual.height / 2);
  group.scale = 3 * (300 / 486);


  visual.bind('update', function(frames) {
  });

  _.defer(_.bind(visual.play, visual));

});
