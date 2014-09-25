require(["app/geo"],function(Geo){
  //settings
  var inhale = 60;
  var exhale = 60;


$('#inhale').bind("change",function(){
  var seconds = $(this).val();
  inhale = seconds;
  $('.inhale-number').text(seconds);
});

  $('#exhale').bind("change",function(){
    var seconds = $(this).val();
    exhale = seconds;
    $('.exhale-number').text(seconds);
  });

});
