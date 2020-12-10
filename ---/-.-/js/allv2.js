function game3s(game_score) {
  var s3 = game_score
  $('#game3').css('display', 'none');
  $('#game1-content').removeClass("game2-content");
  $('#game1-content').css("background-image", "url('images/game3_bg.png')");
  $('#game1-content > div').css("background-color", "transparent");

  $('#game-notify').css('display', 'none');

  $('header').css('display', 'none');
  $('#game2StartPage').css('display', 'none');
  $('#game3StartPage').css('display', 'block');

  //遊戲關卡一開始
  $('#game3StartBtn').on("click",function() {
    $('#game3StartPage').css('display', 'none');
    $('header').css('display', 'block');
    $('#game3').css('display', 'block');
    game3(s3)
  })
}

function game3(game_score) {
  clearInterval(interval);
  var highestIntervalId = setInterval(";");
  for (var i = 0 ; i < highestIntervalId ; i++) {
      clearInterval(i); 
  }

  logFile.push("第二關遊戲開始(H)\n")
  logFileSimple.push("H")
  db.ref(fullDbUrl+"Detail").push("第二關遊戲開始(H)");

  var game2_time = 780;
  var score2 = game_score
  $('#qa_total').show();
  var game2_topic = 1
  $('#topic').html(game2_topic)
  var game2_qatatle = 11
  $("#qatotal").html(game2_qatatle)
  var timeCount = $('.second_top-time span'); //倒數計時dom
  timeCount.text(game2_time);

  //第二關遊戲提示
  $('#game-notify').css('display', 'block');
  $("#game-notify-text").text("根據題目區的單字，從左下方按鍵區依序點擊字母並送出。");

  //第二關遊戲循環倒數
  var interval;
  var intervalCall = function() {
    if (game2_time >= 0) { 
      timeCount.text(game2_time);
      game2_time--
      clearInterval(interval);
      interval = setInterval(intervalCall, 1000);
    }else{
      clearInterval(interval);
      $('#nextModalMessage').html("遊戲結束。\n</br>即將進入下一關遊戲")
      $('#nextModal').modal({backdrop: 'static', keyboard: false}) 
      // alert("第二關遊戲結束");
      logFile.push("遊戲分數:" + score2 + "\n")
      logFile.push("此關遊戲得分:" + (score2-game_score) + "\n")
      logFile.push("第二關遊戲結束-時間到，題目未作答完(Q)\n")
      logFile.push("\n")
      logFileSimple.push("Q")
      db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score2);
      db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + (score2-game_score));
      db.ref(fullDbUrl+"Detail").push("第二關遊戲結束-時間到，題目未作答完(Q)");
      $('#nextModal').on('hidden.bs.modal', function (e) {
        $('#game3').css('display', 'none');
        game4s(score2)
      });
    }
  };
  interval = setInterval(intervalCall, 1000); 

  $('#game_score').text(score2)
  var vocabulary = [
    {
      tw:"多樣的(adj)",
      en:"diverse"
    },
    {
      tw:"課外的(adj)",
      en:"extracurricular"
    },
    {
      tw:"參與(v)",
      en:"participate"
    },
    {
      tw:"堂兄弟(n)",
      en:"cousin"
    },
    {
      tw:"奉獻(v)",
      en:"devote"
    },
    {
      tw:"被激勵的(adj)",
      en:"motivated"
    },
    {
      tw:"財務的(adj)",
      en:"financial"
    },
    {
      tw:"態度(n)",
      en:"attitude"
    },
    {
      tw:"批判的(adj)",
      en:"critical"
    },
    {
      tw:"耗盡(v)",
      en:"exhaust"
    },
    {
      tw:"保險(n)",
      en:"insurance"
    },
    {
      tw:"討厭(v)",
      en:"disfavor"
    },
    {
      tw:"非凡的(adj)",
      en:"remarkable"
    },
    {
      tw:"同時地(adv)",
      en:"concurrently"
    },
    {
      tw:"不必要的(adj)",
      en:"needless"
    }
  ];

  var newobj = [];
  var obj = [];
  var game2_number = 0
  var game2_now_word = []
  var game2_word_index = []
  var game2_now_word_length = Number
  var game2_word_left = ""
  var game2_word_left_length = Number
  var game2_isSupport = false

  $('#qa_total_count').html(vocabulary.length)
  
  //用Math.random()函式生成0~1之間的隨機數與0.5比較，返回-1或1
  function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
  }
  
  //隨機亂數涵式
  function makeid(game2_word_left_length) {
    var result           = '';
    var characters       = 'qwertyuiopasdfghjklzxcvbnm';
    for ( var i = 0; i < game2_word_left_length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * game2_word_left_length));
    };
    return result;
  }

  //第一題涵式
  function game2_init() {
    newobj = [];
    // 切割新單字丟回陣列
    $("#data_tw").html(game2_number+1+". "+vocabulary[game2_number].tw)
    var game2_now_word = vocabulary[game2_number].en.split("");
    for ( var i = 0; i < game2_now_word.length; i++ ) {
       var new_words = {
         type: game2_now_word[i],
         word: game2_now_word[i]
       };
       newobj.push(new_words);
    }

    $('#game2_support').append(game2_now_word[0])
    for ( var i = 1; i < game2_now_word.length-1; i++ ) {
      $('#game2_support').append(" _ ")
    }
    $('#game2_support').append(game2_now_word[game2_now_word.length-1])
    
    // 剩餘的空格補亂數單字
    game2_now_word_length = game2_now_word.length;
    game2_word_left_length = 16 - game2_now_word_length;
    game2_word_left = makeid(game2_word_left_length);
    var abc = game2_word_left.split("");
    for ( var i = 0; i < abc.length; i++ ) {
      var xxx = {
        type: abc[i],
        word: abc[i]
      };
      newobj.push(xxx);
    }
    
    newobj.sort(randomsort);
    newobj.reverse();
    
    // 渲染回宮格上面
    $(".in").each(function( index ) {
      $(this).removeData('value');
      $(this).html('<h3>' + newobj[index]["word"] + '</h3>');
      $(this).data('value', newobj[index]["word"]);
      $(this).data('index', index);
    });
            
    // DOM渲染亂數單字
    // $('#aaa').html(game2_word_left);

    logFile.push("第1題\n")
		db.ref(fullDbUrl+"Detail").push("第1題");
  }   

  //下一題涵式
  function next_word() {
    newobj = [];
    $('#data_v').html('');
    $('.in').removeClass('pointer_none');

    $("#game-notify-text").text("根據題目區的單字，從左下方按鍵區依序點擊字母。");
    
    // 切割新單字丟回陣列
    $("#data_tw").html(game2_number+1+". "+vocabulary[game2_number].tw)
    var game2_now_word = vocabulary[game2_number].en.split("");
    for ( var i = 0; i < game2_now_word.length; i++ ) {
       var new_words = {
         type: game2_now_word[i],
         word: game2_now_word[i]
       };
       newobj.push(new_words);
    }

    $('#game2_support').html('')
    $('#game2_support').append(game2_now_word[0])
    for ( var i = 1; i < game2_now_word.length-1; i++ ) {
      $('#game2_support').append(" _ ")
    }
    $('#game2_support').append(game2_now_word[game2_now_word.length-1])    
    
    // 剩餘的空格補亂數單字
    game2_now_word_length = game2_now_word.length;
    game2_word_left_length = 16 - game2_now_word_length;
    game2_word_left = makeid(game2_word_left_length);
    var abc = game2_word_left.split("");
    for ( var i = 0; i < abc.length; i++ ) {
       var xxx = {
         type: abc[i],
         word: abc[i]
       };
       newobj.push(xxx);
    }
    
    newobj.sort(randomsort);
    newobj.reverse();
    
    // 渲染回宮格上面
    $(".in").each(function( index ) {
      $(this).removeData('value');
      $(this).html('<h3>' + newobj[index]["word"] + '</h3>');
      $(this).attr('data-value', newobj[index]["word"]);
    });
       
   // DOM渲染亂數單字
    // $('#aaa').html(game2_word_left);
  }

  function game2_check(){
    if(game2_number===(vocabulary.length)){
      $('#nextModalMessage').html("遊戲結束。\n</br>即將進入下一關遊戲")
      $('#nextModal').modal({backdrop: 'static', keyboard: false}) 
      // alert("第二關遊戲結束")
      clearInterval(interval);
      logFile.push("遊戲分數:" + score2 + "\n")
      logFile.push("此關遊戲得分:" + (score2-game_score) + "\n")
      logFile.push("此關花費時間:" + (780-game2_time) + "\n")
      logFile.push("第二關遊戲結束-全部題目作答完(Z)\n")
      logFile.push("\n")
      logFileSimple.push("Z")
      db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score2);
      db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + (score2-game_score));
      db.ref(fullDbUrl+"Detail").push("此關花費時間:" + (780-game2_time));
      db.ref(fullDbUrl+"Detail").push("第二關遊戲結束-全部題目作答完(Z)");
      $('#nextModal').on('hidden.bs.modal', function (e) {
        $('#game3').css('display', 'none');
        game4s(score2)
      });
    }else{
      $('#topic').html(game2_topic)
      next_word();
      logFile.push("第"+(game2_number+1)+"題\n")
      db.ref(fullDbUrl+"Detail").push("第"+(game2_number+1)+"題");
    }
  }

  // 下一題點擊之後
  $('#game2_next_btn').on( "click", function() {
    $('#game3NextModal').modal({backdrop: 'static', keyboard: false})
  })
  $('#game3NextRight').on( "click", function() {
    if(game2_number<=(vocabulary.length)){
      logFile.push(game2_time + "秒-------------->下一題按鈕(I)\n")
      logFileSimple.push("I")
      db.ref(fullDbUrl+"Detail").push(game2_time + "秒-------------->下一題按鈕(I)");
      game2_number+=1;
      game2_topic+=1;
      game2_check();
    }else{
      game2_check();
    }
  })
  $('#game3NextCancel').on( "click", function() {
    $('#game3NextModal').modal('hide')
  })

  // 提示單字
  $('#game2_support_btn').on( "click", function() {
    logFile.push(game2_time + "秒-------------->提示單字按鈕(J)\n")
    logFileSimple.push("J")
    db.ref(fullDbUrl+"Detail").push(game2_time + "秒-------------->提示單字按鈕(J)");
    game2_isSupport = true
    game2_support_word()
  })
  function game2_support_word(){
    var game2_now_word = vocabulary[game2_number].en.split("");
    if(game2_now_word.length%2===0){
      var half_word = game2_now_word.length/2
      $('#game2_support').html('')
      for ( var i = 0; i < half_word; i++ ) {
        $('#game2_support').append(game2_now_word[i])
      }
      for ( var k = half_word; k < game2_now_word.length-1; k++ ) {
        $('#game2_support').append(" _ ")
      }
      $('#game2_support').append(game2_now_word[game2_now_word.length-1])
    }else{
      var odd_word = Math.round(game2_now_word.length/2)
      $('#game2_support').html('')
      for ( var i = 0; i < odd_word; i++ ) {
        $('#game2_support').append(game2_now_word[i])
      }
      for ( var k = odd_word; k < game2_now_word.length-1; k++ ) {
        $('#game2_support').append(" _ ")
      }
      $('#game2_support').append(game2_now_word[game2_now_word.length-1])
    }

  }

  //隨機排列陣列
  // newobj.sort(randomsort);
  // $('.out').html('')
  // $.each(newobj, function( index, item ) {
  // 	var template_game2 = ""
  // 	template_game2 += '<div class="in">';
  // 		template_game2 += '<h3>' + item.word + '</h3>';
  // 	template_game2 += '</div>';

  // 	$('.out').append(template_game2);
  // });

  // 字母點擊之後
  $('.in').on( "click", function() {
    $(this).addClass('pointer_none');
    var bcc = $(this).data('value');
    $('#data_v').append(bcc);
    var ecc = $(this).data('index');
    game2_word_index.push(ecc)
    $("#game-notify-text").text("每題只有1次答題機會，送出前請多確認。");
    // console.log(bcc);
  });

  // 重新輸入單字按鈕
  $('#game2_reset_btn').on( "click", function() {
    $('#data_v').html('');
    $('.in').removeClass('pointer_none');
  });

  // 刪除一個字母
  $('#game2_backspace_btn').on("click", function() {
    if($('#data_v').text().length >= 1){
      var splice_word = $('#data_v').text().slice(0, -1);
      $('#data_v').text(splice_word);
    }

    if(game2_word_index.length >= 1){
      var kkk = game2_word_index[game2_word_index.length - 1]
      $('.in').eq(kkk).removeClass('pointer_none');
      game2_word_index.splice(-1,1);
    }

  })

  // 提交點擊之後
  $('#game2_submit_btn').on( "click", function() {
    $('#game3SubmitCheckModalMessage').html("您送出的拼字為: <b>"+ $('#data_v').html() + "</b>\n</br>確定送出?")
    $('#game3SubmitCheckModal').modal({backdrop: 'static', keyboard: false})
  });

  $('#game3SubmitCheckRight').on( "click", function() {
    if($('#data_v').html()===vocabulary[game2_number].en){
      if(game2_number<=(vocabulary.length)){
        $('#alertModalMessage').html("很棒!答對了!")
        $('#alertModal').modal({backdrop: 'static', keyboard: false})
      }
      game2_number+=1;
      if(!game2_isSupport){
        score2 += 20
      }else{
        score2 += 10
      }
      
      game2_topic+=1
      $('#topic').html(game2_topic)
      logFile.push(game2_time + "秒-------------->送出-答題正確(K)\n")
      logFileSimple.push("K")
      db.ref(fullDbUrl+"Detail").push(game2_time + "秒-------------->送出-答題正確(K)");
      game2_check()
      $('#game_score').text(score2)
      next_word()
    }else{
      if(game2_number<=(vocabulary.length)){
        $('#alertModalMessage').html("答錯了!\n</br>正確答案為: "+vocabulary[game2_number].en)
        $('#alertModal').modal({backdrop: 'static', keyboard: false})
      }
      game2_number+=1;
      game2_topic+=1;
      $('#topic').html(game2_topic);
      logFile.push(game2_time + "秒-------------->送出-答題錯誤(L)\n")
      logFileSimple.push("L");
      db.ref(fullDbUrl+"Detail").push(game2_time + "秒-------------->送出-答題錯誤(L)");
      game2_check();
      next_word();
    };
    game2_isSupport = false
    $('#game3SubmitCheckModal').modal('hide')
  })
  $('#game3SubmitCheckCancel').on( "click", function() {
    $('#game3SubmitCheckModal').modal('hide')
  })

  game2_init();  

};