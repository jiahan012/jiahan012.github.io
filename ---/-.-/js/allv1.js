var logFileSimple = []

if(localStorage.getItem("logFile")){
  var logFile = JSON.parse(localStorage.getItem("logFile"));
}else{
  var logFile = []
}

function game2s(game_score) {
  var s2 = game_score
  $('#game1-content').addClass("game2-content");
  $('#game1-content').css("background-image", "url('images/game2_bg.jpg')");

  $('header').css('display', 'none');
  $('#game2-default-btn').css('display', 'none');
  $('#game2-half-btn').css('display', 'none');
  $('#game2-match-btn').css('display', 'none');
  $('#game2StartPage').css('display', 'block');
  $('#game-notify').css('display', 'none');
  $('#game2').css('display', 'none');

  //遊戲關卡一開始
  $('#game2StartBtn').on("click",function() {
    $('#game2StartPage').css('display', 'none');
    $('header').css('display', 'block');
    $('#game2-default-btn').css('display', 'block');
    $('#game2-half-btn').css('display', 'inline-block');
    $('#game2-match-btn').css('display', 'inline-block');
    $('#game2').css('display', 'block');
    game2(s2)
  })
}


function game2(game_score) {
  clearInterval(interval);
  var highestIntervalId = setInterval(";");
  for (var i = 0 ; i < highestIntervalId ; i++) {
      clearInterval(i); 
  }


  logFile.push("第一關遊戲開始(A)\n")
  logFileSimple.push("A")
  db.ref(fullDbUrl+"Detail").push("第一關遊戲開始(A)\n");
  $('#qa_total').hide();
  var score1 = game_score
  var game1_time = 180;
  var timeCount = $('.second_top-time span'); //倒數計時dom
  timeCount.text(game1_time);

  //第一關遊戲提示
  $('#game-notify').css('display', 'block');
  $("#game-notify-text").text("請選擇2張牌，若選出同義的單字與圖像即正確，若選出不同義則翻回。");

  //第一關遊戲循環倒數
  var interval;
  var intervalCall = function() {
    if (game1_time >= 0) { 
      timeCount.text(game1_time);
      game1_time--
      clearInterval(interval);
      interval = setInterval(intervalCall, 1000);
    }else{
      clearInterval(interval);
      $('#nextModalMessage').html("遊戲結束。\n</br>即將進入下一關遊戲")
      $('#nextModal').modal({backdrop: 'static', keyboard: false}) 
      // alert("第一關遊戲結束");
      logFile.push("遊戲分數:" + score1 + "\n")
      logFile.push("此關遊戲得分:" + score1 + "\n")
      logFile.push("第一關遊戲結束-配對未完成(W)\n")
      logFile.push("\n")
      logFileSimple.push("W")
      db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score1);
      db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + score1);
      db.ref(fullDbUrl+"Detail").push("第一關遊戲結束-配對未完成(W)");
      $('#nextModal').on('hidden.bs.modal', function (e) {
        $('#game2').css('display', 'none');
        game3s(score1)
      });      
    }
  };

  interval = setInterval(intervalCall, 1000);


  function animation() {
    var game1_right_total = 0

    var obj = [
      {
        index: 0,
        type: 1,
        text: 'purchase',
      },
      {
        index: 1,
        type: 1,
        img: '1.png',
      },
      {
        index: 2,
        type: 2,
        text: 'jealous',
      },
      {
        index: 3,
        type: 2,
        img: '2.png',
      },
      {
        index: 4,
        type: 3,
        text: 'lonely',
      },
      {
        index: 5,
        type: 3,
        img: '3.png',
      },
      {
        index: 6,
        type: 4,
        text: 'creative',
      },
      {
        index: 7,
        type: 4,
        img: '4.png',
      }, 
      {
        index: 8,
        type: 5,
        text: 'target',
      },
      {
        index: 9,
        type: 5,
        img: '5.png',
      },
      {
        index: 10,
        type: 6,
        text: 'examination',
      },
      {
        index: 11,
        type: 6,
        img: '6.png',
      }, 
      {
        index: 12,
        type: 7,
        text: 'elementary student',
      },
      {
        index: 13,
        type: 7,
        img: '7.png',
      },
      {
        index: 14,
        type: 8,
        text: 'persuade',
      },
      {
        index: 15,
        type: 8,
        img: '8.png',
      },
      {
        index: 16,
        type: 9,
        text: 'basketball',
      },
      {
        index: 17,
        type: 9,
        img: '9.png',
      }                                   
    ]
    //隨機排列陣列
    obj.sort(randomsort);

    $('#game2-half-btn').attr('disabled', true);

    //印出&於父層加入屬性data-value
    var htmlPD = '';
    $.each(obj,function ( index, item ) {
      // var backHtml = 
      // $(this).html('<h1 class="facevalue">' + obj[index]["img"] + '</h1>');
      // $(this).parent().attr('data-value', obj[index].type);
      if(index==0||index==6||index==12){
        htmlPD += '<div class="half-line half-line-' + index + ' row">'
      }
      htmlPD += '<div class="col-22">';
      htmlPD += '<div class="flip_card-container">'
        htmlPD += '<div class="flip_card-item" data-index="' + obj[index].index + '" data-value="' + obj[index].type + '">'
          htmlPD += '<div class="front face">'
            htmlPD += '<img src="images/card.png">'
          htmlPD += '</div>'
          htmlPD += '<div class="back face">'
            if(obj[index].hasOwnProperty('text')){
              htmlPD += '<h3 class="facevalue">' + obj[index]["text"] + '</h3>'
            }else{
              htmlPD += '<img width="100%" src="images/' + obj[index]["img"] + '"/>'
            }
          htmlPD += '</div>'          
      htmlPD += '</div><img src="images/card_height.png"></div></div>';
      if(index==5||index==11||index==17){
        htmlPD += '</div>'
      }
    });
    $('#cardcard').html(htmlPD);


  /* 版身顯示商品內容 */ 
  // var htmlPD = '';
  // for (var i = 0; i < obj; i++) {
  //   htmlPD += '<div class="col-3">';
  //     htmlPD += '<div class="flip_card-container">'
  //       htmlPD += '<div class="flip_card-item">'
  //         htmlPD += '<div class="flip_card-item" data-value="' + obj[i].type + '">'
  //           htmlPD += '<img src="images/card.png">'
  //         htmlPD += '</div>'
  //         htmlPD += '<div class="back face">'
  //           htmlPD += '<h1 class="facevalue">' + obj[i]["img"] + '</h1>'
  //         htmlPD += '</div>'          
  //   htmlPD += '</div><img src="images/card_height.png"></div></div>';
  // }
  // $('#cardcard').html(htmlPD);

    //點擊卡片數量
    var count = 0;
    //目前的data-value
    var thisValue = Number;
    var thisIndex = Number;
    var isSupport = false
    var nowValue = '';
    var $cardItem = $('.flip_card-item');
    var randomNumberArray = [];

    function flipCard() {
      // console.log(count)
      $(this).addClass('rotation');
      thisValue = $(this).data('value');
      thisIndex = $(this).data('index');
      logFile.push(game1_time + "秒-------------->翻出" + thisValue + "\n")
      $('#game2-half-btn').attr('disabled', false);
      $('#game2-match-btn').attr('disabled', true);
      $("#game-notify-text").text("請選擇2張牌，若選出同義的單字與圖像即正確，若選出不同義則翻回。");
      if (count % 2 !== 0 && thisValue !== nowValue) {
        $('#game2-match-btn').attr('disabled', true);
        //條件符合則全部關閉
        logFile.push("配對失敗(C)\n")
        logFileSimple.push("C")
        db.ref(fullDbUrl+"Detail").push("配對失敗(C)");
        allFlipBack();
        $('#game2-half-btn').attr('disabled', true);
        $('.half-line').removeClass('support-shadow');
        isSupport = false
      } else {
        count++;
        nowValue = thisValue;
        if (count > 0 && count % 2 == 0) {
          game1_right_total++
          if(!isSupport){
            score1+=30
          }else{
            score1+=15
          }
          $('#game_score').text(score1)
          borderLight();
          logFile.push("配對成功(M)\n")
          logFileSimple.push("M")
          db.ref(fullDbUrl+"Detail").push("配對成功(M)");
          $('#game2-half-btn').attr('disabled', true);
          $('#game2-match-btn').attr('disabled', false);
          $('.half-line').removeClass('support-shadow');
          isSupport = false
          if(game1_right_total===9){
            finishCountGame()
          }
        }
      }
    }
    //關閉並重置
    function allFlipBack() {
      $cardItem.addClass('pointer_none');
      setTimeout(function () {
        $('.flip_card-item[data-value="' + nowValue + '"]').removeClass('rotation box-shadow');
        $('.flip_card-item[data-value="' + thisValue + '"]').removeClass('rotation box-shadow');
      }, 800)
      setTimeout(function () {
        $cardItem.removeClass('pointer_none');
        count = 0;
        nowValue = '';
        $('#game2-match-btn').attr('disabled', false);
      }, 1000);
    }


    function success() {
      var $successMask = $('.success_mask');
      var $successModal = $('.success_modal');
      $successMask.css('display', 'block');
      $successModal.css('display', 'block');
      TweenLite.from($successMask, 0.5, { opacity: 0, ease: Power0.easeNone });
      TweenLite.from($successModal, 0.5, { opacity: 0, y: '-=50px', ease: Power2.easeOu });
      setTimeout(function () {
        $('.fireworks').css('display', 'block');
      }, 400)
    };
    function borderLight() {
      var nowValue2 = nowValue;
      randomNumberArray.push(nowValue)
      setTimeout(function () {
        $('.flip_card-item[data-value="' + nowValue2 + '"]').addClass('success-shadow');
      }, 300);
    }

    $cardItem.on("click",flipCard);

    //消除一組配對
    $('#game2-match-btn').on("click",function() {
      logFile.push(game1_time + "秒-------------->消除一組配對(T)\n")
      logFileSimple.push("T")
      db.ref(fullDbUrl+"Detail").push(game1_time + "秒-------------->消除一組配對(T)");
      gameMatch()
    });
    //消除一組配對
    function gameMatch() {
      $('#game2-match-btn').attr('disabled', true);
      var game2RandomNumber = game2Random(1,9);
      if (randomNumberArray.length >= 1){
        var i;
        for (i = 0; i < randomNumberArray.length; i++) {
          if(randomNumberArray[i]===game2RandomNumber){
            gameMatch()
            return
          }
        }
        $('.flip_card-item[data-value="' + game2RandomNumber + '"]').addClass('rotation').addClass('success-shadow');
        game1_right_total++
        randomNumberArray.push(game2RandomNumber)
        $('#game2-match-btn').attr('disabled', false);
      }else{
        $('.flip_card-item[data-value="' + game2RandomNumber + '"]').addClass('rotation').addClass('success-shadow');
        game1_right_total++
        randomNumberArray.push(game2RandomNumber)
        $('#game2-match-btn').attr('disabled', false);
      }
      if(game1_right_total===9){
        $('#game2-match-btn').attr('disabled', true);
        finishCountGame()
      }
    }

    //左右範圍提示
    $('#game2-half-btn').on("click",function() {
      gameHalf()
      $('#game2-half-btn').attr('disabled', true);
      isSupport = true
      logFile.push(game1_time + "秒-------------->提示範圍(O)\n")
      logFileSimple.push("O")
      db.ref(fullDbUrl+"Detail").push(game1_time + "秒-------------->提示範圍(O)");
    });

    //左右範圍提示
    function gameHalf() {
      var itemHalfIndex = obj.findIndex((item)=>{
        return item.index != thisIndex && item.type == thisValue
      })
      if(itemHalfIndex>=0&&itemHalfIndex<6){
        $('.half-line-0').addClass('support-shadow');
      }else if(itemHalfIndex>=6&&itemHalfIndex<12){
        $('.half-line-6').addClass('support-shadow');
      }else if(itemHalfIndex>=12&&itemHalfIndex<18){
        $('.half-line-12').addClass('support-shadow');
      }
    }
    
    //已達滿次結束遊戲
    function finishCountGame() {
      $('#game-notify').css('display', 'none');
      setTimeout(function () {
        // alert("第一關遊戲結束")
        $('#nextModalMessage').html("遊戲結束。\n</br>即將進入下一關遊戲")
        $('#nextModal').modal({backdrop: 'static', keyboard: false})        
        clearInterval(interval);
        logFile.push("遊戲分數:" + score1 + "\n")
        logFile.push("此關遊戲得分:" + score1 + "\n")
        logFile.push("此關花費時間:" + (180-game1_time) + "\n")
        logFile.push("第一關遊戲結束-配對皆完成(F)\n")
        logFile.push("\n")
        logFileSimple.push("F")
        db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score1);
        db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + score1);
        db.ref(fullDbUrl+"Detail").push("此關花費時間:" + (180-game1_time));
        db.ref(fullDbUrl+"Detail").push("第一關遊戲結束-配對皆完成(F)");
        $('#nextModal').on('hidden.bs.modal', function (e) {
          $('#game2').css('display', 'none');
          game3s(score1)
        });
      }, 1500);
    }

    //用Math.random()函式生成0~1之間的隨機數與0.5比較，返回-1或1
    function randomsort(a, b) {
      return Math.random() > .5 ? -1 : 1;
    }

    function game2Random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }  
  }
  animation()
};


