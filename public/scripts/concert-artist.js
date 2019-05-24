$(document).ready(function () {
  $("#concertID").change(function(){
    $("#concertName").val($(this).val());
  });
  
$("#concertName").change(function(){
    $("#concertID").val($(this).val());
  });

  alert("gi")

});