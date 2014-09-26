define([
  'two',
  'app/color'
],
function(Two, Color){

  var Geo = {};

    //circles
  Geo.makeCircle = function (color, two) {
    var circle1 = two.makeCircle(0, 0, width );
    var circle2 = two.makeCircle(0, 0, half_width);
    var circle3 = two.makeCircle(0, 0, quart_width);
    var circle4 = two.makeCircle(0, 0, eight_width);

    var rgb = Math.round(color.r) +',' + Math.round(color.g) + ',' + Math.round(color.b);

    circle1.fill = circle2.fill = circle3.fill = circle4.fill = 'rgba(' + rgb + ',' + 0.33 + ')';
    circle1.stroke = circle2.stroke = circle3.stroke = circle4.stroke = 'rgb(' + rgb + ')';
    circle1.linewidth = circle2.linewidth = circle3.linewidth = circle4.linewidth = 1;

    return two.makeGroup(circle1, circle2, circle3, circle4);
  };

  Geo.getVertices = function(sides, center, radius){
    var c = center || {x:20, y:20};
    var r = radius || 100;
    var vertices = [];
    // generate vertices
    for ( var pt = 0 ; pt < sides; pt++ ){
      var angle = (Math.PI/2) + (pt / sides) * 2 * Math.PI;
      var x = r * Math.cos( angle ) + center.x,
          y = radius * Math.sin( angle ) + center.y;
          vertices.push([x,y]);
    }
    return vertices;
  };

  Geo.getOddVertices = function(sides, center, radius){
    var c = center || {x:20, y:20};
    var r = radius || 100;
    var vertices = [];
    // generate vertices
    for ( var pt = 0 ; pt < sides; pt++ ){
      if (pt % 2 != 0){
        var angle = (Math.PI/2) + (pt / sides) * 2 * Math.PI;
        var x = r * Math.cos( angle ) + center.x,
            y = radius * Math.sin( angle ) + center.y;
            vertices.push([x,y]);
      }
    }
    return vertices;
  };

  Geo.tessPoly = function (color, sides, center, radius) {
    var c = center ||{x:20, y:20};
    var r = radius||100;
    var vertices = Geo.getVertices(sides,c,r);
    var group = new Two.Group();
    //generate faces
    for ( var face = 0 ; face < sides; face++ ){
      if (!vertices[face+1]){
        // [[x,y],[x1,y1]]
        var points = [center.x, center,y,
                      vertices[face][0], vertices[face][1],
                      vertices[0][0], vertices[0][1]];
      } else {
        var points = [center.x, center,y,
                      vertices[face][0], vertices[face][1],
                      vertices[face+1][0], vertices[face+1][1]];
      }
      var poly = opts.two.makePolygon.apply(opts.two, points);
      poly.fill = 'rgba(' + rgb + ',' + ((1/sides)*(face+1)) + ')';
      poly.stroke = 'rgb(' + rgb + ')';
      poly.linewidth = 1;
      group.add(poly);
    }
    return group;
  };

  Geo.tessShell = function (opts) {
    var c = opts.center|| {x:20, y:20};
    var r = opts.radius||100;
    var sides = opts.sides || 4;
    var rgb = Math.round(opts.color.r) +',' + Math.round(opts.color.g) + ',' + Math.round(opts.color.b);
    var vertices = Geo.getVertices(opts.sides,c,r);
    var group = new Two.Group();

    //generate faces
    for ( var face = 0 ; face < sides-1; face++ ){
      var poly = opts.two.makePolygon(vertices[0][0], vertices[0][1],vertices[face][0], vertices[face][1],vertices[face+1][0], vertices[face+1][1]);
      poly.fill = 'rgba(' + rgb + ',' + ((1/sides)*(face+1)) + ')';
      poly.stroke = 'rgb(' + rgb + ')';
      poly.linewidth = 1;
      group.add(poly);
    }
    return group;
  };
  Geo.Star = function (opts) {
    var c = opts.center || {x:20, y:20};
    var radiusOuter = opts.outer || 100;
    var radiusInner= opts.inner || 100;
    var sides = opts.sides || 4;
    var rgb = Math.round(opts.color.r) +',' + Math.round(opts.color.g) + ',' + Math.round(opts.color.b);
    var group = new Two.Group();
    var i = Geo.getOddVertices(sides*2,c,radiusInner);
    var o = Geo.getVertices(sides,c,radiusOuter);;

    //generate faces

        for ( var face = 0 ; face < sides; face++ ){
          if (!i[face+1]){
            var points = [i[face][0], i[face][1],
                          i[0][0], i[0][1],
                          o[0][0], o[0][1]];
            // var points2 = [o[face][0], o[face][1],
            //                 o[0][0], o[0][1],
            //                 i[0][0], i[0][1]];
          } else {
            var points = [i[face][0], i[face][1],
                          i[face+1][0], i[face+1][1],
                          o[face+1][0], o[face+1][1]];
             // var points = [o[face][0], o[face][1],
             //              o[face+1][0], o[face+1][1],
             //              i[face+1][0], i[face+1][1]];
          }
        // var poly2 = opts.two.makePolygon.apply(opts.two, points2);
        var poly = opts.two.makePolygon.apply(opts.two, points);
         poly.fill = 'rgba(' + rgb + ',' + '0.05' + ')';
        poly.stroke = 'rgb(' + rgb + ')';
         poly.linewidth = 1;
        group.add(poly);
      }
    return group;
  };

   Geo.TestGraph = function (opts) {
    var c = opts.center || {x:20, y:20};
    var radiusOuter = opts.outer || 100;
    var radiusInner= opts.inner || 100;
    var sides = opts.sides || 4;
    var rgb = Math.round(opts.color.r) +',' + Math.round(opts.color.g) + ',' + Math.round(opts.color.b);
    var group = new Two.Group();
    var i = Geo.getOddVertices(sides*2,c,radiusInner);
    var o = Geo.getVertices(sides,c,radiusOuter);;

    //generate faces

        for ( var face = 0 ; face < sides; face++ ){
          if (!i[face+1]){
            var points = [i[face][0], i[face][1],
                          i[0][0], i[0][1],
                          o[0][0], o[0][1]];
            var points2 = [o[face][0], o[face][1],
                            o[0][0], o[0][1],
                            i[face][0], i[face][1]];
          } else {
            var points = [i[face][0], i[face][1],
                          i[face+1][0], i[face+1][1],
                          o[face+1][0], o[face+1][1]];

             var points2 = [o[face][0], o[face][1],
                          o[face+1][0], o[face+1][1],
                          i[face][0], i[face][1]];
          }
        var poly2 = opts.two.makePolygon.apply(opts.two, points2);
        var poly = opts.two.makePolygon.apply(opts.two, points);
         poly.fill = 'rgba(' + rgb + ',' + '0.05' + ')';
        poly.stroke = 'rgb(' + rgb + ')';
         poly.linewidth = 1;
        group.add(poly2, poly);
      }
    return group;
  };

  Geo.Almost = function (opts) {
    var c = opts.center || {x:20, y:20};
    var radiusOuter = opts.outer || 100;
    var radiusInner= opts.inner || 100;
    var sides = opts.sides || 4;
    var rgb = Math.round(opts.color.r) +',' + Math.round(opts.color.g) + ',' + Math.round(opts.color.b);
    var group = new Two.Group();
    var i = Geo.getOddVertices(sides*2,c,radiusInner);
    var o = Geo.getVertices(sides,c,radiusOuter);;

    //generate faces

        for ( var face = 0 ; face < sides; face++ ){
          if (!i[face+1]){
            var points = [i[face][0], i[face][1],
                          i[0][0], i[0][1],
                          o[0][0], o[0][1]];
            var points2 = [o[face][0], o[face][1],
                            o[0][0], o[0][1],
                            i[face][0], i[face][1]];
          } else {
            var points = [i[face][0], i[face][1],
                          i[face+1][0], i[face+1][1],
                          o[face+1][0], o[face+1][1]];

             var points2 = [o[face][0], o[face][1],
                          o[face+1][0], o[face+1][1],
                          i[face][0], i[face][1]];
          }
        var poly2 = opts.two.makePolygon.apply(opts.two, points2);
        var poly = opts.two.makePolygon.apply(opts.two, points);
         poly.fill = 'rgba(' + rgb + ',' + '0.05' + ')';
        poly.stroke = 'rgb(' + rgb + ')';
         poly.linewidth = 1;
        group.add(poly2, poly);
      }
    return group;
  };

  Geo.SpiroGraph = function (opts) {
    var c = opts.center || {x:20, y:20};
    var radiusOuter = opts.outer || 100;
    var radiusInner= opts.inner || 100;
    var sides = opts.sides || 4;
    var rgb = Math.round(opts.color.r) +',' + Math.round(opts.color.g) + ',' + Math.round(opts.color.b);

    var o = Geo.getVertices(sides,c,radiusInner);
    var i = Geo.getVertices(sides/2,c,radiusOuter);;

    //generate faces
    var group = new Two.Group();
      for ( var outer = 0 ; outer < (sides); outer+= 2 ){
        for ( var face = 0 ; face < ((sides/2)); face++ ){
          if (!i[face+1]){
            var points= [
                  i[face][0], i[face][1],
                  i[0][0], i[0][1],
                  o[outer][0], o[outer][1]
                ];
          }else{
            var points= [
                  i[face][0], i[face][1],
                  i[face+1][0], i[face+1][1],
                  o[outer][0], o[outer][1]
                ];
          }
        var poly = opts.two.makePolygon.apply(opts.two, points);
        poly.fill = 'rgba(' + rgb + ',' + '0.05' + ')';
        poly.stroke = 'rgb(' + rgb + ')';
        poly.linewidth = 1;
        group.add(poly);
      }
    }
    return group;
  };

  Geo.makeTorus = function (opts) {
    var c = opts.center || {x:20, y:20};
    var radiusOuter = opts.outer || 100;
    var radiusInner= opts.inner || 100;
    var sides = opts.sides || 4;
    var rgb = Math.round(opts.color.r) +',' + Math.round(opts.color.g) + ',' + Math.round(opts.color.b);

    var i = Geo.getVertices(sides,c,radiusInner);
    var o = Geo.getVertices(sides,c,radiusOuter);;

    //generate faces
    var group = new Two.Group();
    for ( var face = 0 ; face < sides; face++ ){
      if (!i[face+1]){
        var points = [i[face][0], i[face][1],
                      i[0][0], i[0][1],
                      o[0][0], o[0][1],
                      o[face][0], o[face][1]];
      } else {
        var points = [i[face][0], i[face][1],
                      i[face+1][0], i[face+1][1],
                      o[face+1][0], o[face+1][1],
                      o[face][0], o[face][1]];
      }
      var poly = opts.two.makePolygon.apply(opts.two, points);
      poly.fill = 'rgba(' + rgb + ',' + ((1/sides)*(face+1)) + ')';
      poly.stroke = 'rgb(' + rgb + ')';
      poly.linewidth = 1;
      group.add(poly);
    }
    return group;
  };
  return Geo;
});
