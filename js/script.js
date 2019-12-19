$(function(){
  // first
  var firstDate = new Date();
  var firstHour = firstDate.getHours();
  var firstMin = firstDate.getMinutes();
  var firstSec = firstDate.getSeconds();
  var firstTimeNumber = firstHour*3600 + firstMin*60 + firstSec;
  if(firstHour<10){firstHour = '0' + firstHour;}
  if(firstMin<10){firstMin = '0' + firstMin;}
  if(firstSec<10){firstSec = '0' + firstSec;}

  var firstTimeLabel = firstHour + ':' + firstMin + ':' + firstSec;
  var firstTimeLabel = firstHour + ':' + firstMin + ':' + firstSec;

  $('#time-label').html(firstTimeLabel);
  $('#real-time').html(firstTimeLabel);


  // then
  setInterval(function(){

    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    var nowMin = nowDate.getMinutes();
    var nowSec = nowDate.getSeconds();

    if(nowHour<10){nowHour = '0' + nowHour;}
    if(nowMin<10){nowMin = '0' + nowMin;}
    if(nowSec<10){nowSec = '0' + nowSec;}

    var nowTimeLabel = nowHour + ':' + nowMin + ':' + nowSec;

    $('#time-label').html(nowTimeLabel);
    $('#real-time').html(nowTimeLabel);

    if(nowHour===11 && nowMin===45 && nowSec===14){
      window.open('https://video.fc2.com/ja/a/content/20160108UY6GqyWS');
    }


  },1000);


  var windowHeight = $('#band-list').height();


  // バンド追加ボタン
  function addInput () {
    var newInput = $('<input type="text" class="bandName">');
    newInput.appendTo(".band-name-field > td > div");
  }

  // バンド削除ボタン
  function removeInput () {
    if($('.band').find('input').length>2){
      var deleteInput = $(".band-name-field > td > div > input:last-child");
      deleteInput.remove();
    }
  }

  $("#addBand").click(function(){
    addInput();
  });

  $("#removeBand").click(function(){
    removeInput();
  });


  // タイムテーブル作成
  $('#create-timetable').click(function(){
    createTimetable();
  });

  function createTimetable (){

    $("#input-field").fadeOut();
    setTimeout(function(){
      $("#time-table").fadeIn();
    },300);

    var startHour = $('#startHour').val();
    var startMin = $('#startMin').val();
    var bandInterval = $('#bandInterval').val();
    var bandHeight = $('#bandHeight').val();
    var startTimeNumber = startHour*3600 + startMin*60;
    var bandQuantity = $('.band').find('input').length;

    var bandName = $('.bandName').map(function(index, el){
      return $(this).val();
    });

    $('#band-value').html('バンド数:'+ bandQuantity);

    var bandUl = $('#band-list').find('ul');
    var timeUl = $('#time-list').find('ul');

    for (i = 0; i < bandQuantity; i++) {
      bandUl.append('<li></li>');
      if(bandName[i]!==''){
        bandUl.find('li').eq(i).html(bandName[i]);
      }else{
        bandUl.find('li').eq(i).html('バンド名を入れてください');
      }
    }

    for (i = 0; i <= bandQuantity; i++) {
      timeUl.append('<li></li>');
      var startTimeNumberOfList = startTimeNumber+bandInterval*60*i
      var hourOfList = Math.floor(startTimeNumberOfList/3600);
      var minOfList = (startTimeNumberOfList-(hourOfList*3600))/60;
      if(hourOfList>23){hourOfList %= 24;}
      if(hourOfList<10){hourOfList = '0' + hourOfList;}
      if(minOfList<10){minOfList = '0' + minOfList;}
      timeUl.find('li').eq(i).html(hourOfList+':'+minOfList);
    }

    $('#band-list > ul > li').css({
      height: bandHeight ,
      lineHeight: bandHeight +'px',
      fontSize: '22px'
      // fontSize: bandHeight/16+10 + 'px'
    });

    $('#time-list > ul > li').css({
      height: bandHeight
    });

    var timeHeight = -bandHeight/2;

    // バンドクリック時に目立たせる
    $('#band-list').find('ul').find('li').click(function(){
      if($(this).hasClass('active')){
        $(this).removeClass('active');
      }else{
        $('#band-list').find('ul').find('li').removeClass('active');
        $(this).addClass('active');
      }
    });

    function calculator(){

      var nowDate = new Date();
      var nowHour = nowDate.getHours();
      var nowMin = nowDate.getMinutes();
      var nowSec = nowDate.getSeconds();
      var nowTimeNumber = nowHour*3600 + nowMin*60 + nowSec;
      var shiftTimeNumber = nowTimeNumber - startTimeNumber;
      var Y = (shiftTimeNumber/bandInterval)*bandHeight/60;

      $('#time-indicate').fadeIn();
      if(Y<0){
        $('#time-indicate').css({
          top: 38
        });
      }else if(Y>bandQuantity*bandHeight){
        $('#time-indicate').hide();
      }
      else{
        $('#time-indicate').css({
          top: Y+38
        });
      }

    }

    var calc = setInterval(calculator,1000);

    $('#return').click(function(){
      clearInterval(calc);
    });
  }

  $('#return').click(function(){

    $("#time-table").fadeOut();
    setTimeout(function(){
      $('#band-list').find('ul').find('li').remove();
      $('#time-list').find('ul').find('li').remove();
      $("#input-field").fadeIn();
    },300);

  });

  $('#line-toggle').click(function(){
    $('#time-indicate').toggleClass('invisible');
  });

});
