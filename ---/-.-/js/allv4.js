function game5s(game_score) {
	var s5 = game_score
  $('.countdown-box').css('display', 'none');
  $('.bingo_line').css('display', 'none');
  $('#game1-content').css("background-image", "none");
  $('#game1-content').css("background-color", "#a9d1dd");
  $('#game-notify-container').css('display', 'none');
	$('header').css('display', 'none');
	$('#game4StartPage').css('display', 'none');
	$('#game5StartPage').css('display', 'block');
  
	//遊戲關卡一開始
	$('#game5StartBtn').on("click",function() {
	  $('#game5StartPage').css('display', 'none');
	  $('#game5').css('display', 'block');
	  game5(s5)
	})
}


function game5(game_score) {
  var highestIntervalId = setInterval(";");
  for (var i = 0 ; i < highestIntervalId ; i++) {
      clearInterval(i);
  }
  logFile.push("第四關遊戲開始(a)\n")
  logFileSimple.push("a")
  db.ref(fullDbUrl+"Detail").push("第四關遊戲開始(a)");
  
  var score5 = game_score
  $('#game5_score').text(score5)

  var game5QuestionArray = [
    {
      title: 'It took a lot of time for Mary to take part in extracurricular activities so she could not devote herself to ______ great works for her PhD study.'
    },
    {
      title: 'This is _____ to the fact that her father and mother want to change her wrong attitudes toward her PhD.',
    },
    {
      title: 'All students do not want to make friends _____ Mary.',
    },
    {
      title: 'Mary _____ to have a book or magazine with her.',
    },
    {
      title: 'Mary has several hobbies, _____ playing digital games.',
    }, 
    {
      title: 'Digital games make Mary happier and help her not only have creative imagination _____ develop critical thinking.',
    },
    {
      title: 'Digital games are useful to neither creative imagination _____ critical thinking.',
    },
    {
      title: 'Mary _____ hot chocolate to milk.',
    },
    {
      title: "Mary's success _____home to people the fact that the future of work lies in learning.",
    }, 
    {
      title: 'It _____ without saying that Mary may be the laziest person that John has ever met',
    }, 
    {
      title: 'xxxx',
    },        
  ];

  var game5AnswerArray = {
    "0":["do","doing","did","does",1],
    "1":["owing","because","on account","face",0],
    "2":["to","with","of","on",1],
    "3":["used","is used","getting used","get used",0],
    "4":["apart from","excepting","including","excluding",0],
    "5":["but also","also","but","and",0],
    "6":["nor","or","and","for",0],
    "7":["prefer","prefers","like","likes",1],
    "8":["brings","keeps","gives","goes",0],
    "9":["goes","was","is","goes",0],
    "10":["xxx","xxx","xxx","xxx",0]
  }

  var game5_time = 360;
  $('#qa_total').show();
  var game5_topic = 1
  $('#game5_topic').html(game5_topic)
  var game5_qatatle = 10
  $("#qatotal").html(game5_qatatle)
  var game5_bonus = 0
  $('#game5_bonus_count').text(game5_bonus);
  $('#game5_hp_btn').attr('disabled', true);
  $('#game5_time_btn').attr('disabled', true);
  // var timeCount = $('.second_top-time span'); //倒數計時dom
  // timeCount.text(game5_time);

  // //第四關遊戲循環倒數
  // var interval;
  // var intervalCall = function() {
  //   if (game5_time >= 0) { 
  //     timeCount.text(game5_time);
  //     game5_time--
  //     clearInterval(interval);
  //     interval = setInterval(intervalCall, 1000);
  //   }else{
  //     clearInterval(interval);
  //     alert("第4關遊戲結束");
  //     $('#game5').css('display', 'none');
  //   }
  // };
  // interval = setInterval(intervalCall, 1000); 


  var life = 100
  var title_index = 0
  var total_indedx = game5QuestionArray.length - 1
  var right_index = game5AnswerArray[String(title_index)][4]

  var $startTitle = $('.start__title');
  var $boxman = $('.start__boxman');
  var $startGameBtn = $('.start__startgame');
  TweenMax.from($startTitle, 1, { x: -600, y: -100, rotation: 180, ease: Power3.easeOut, delay: 0.5 });
  TweenMax.from($boxman, 1, { x: -500, ease: Power3.easeOut, delay: 0.5 });
  TweenMax.from($boxman, 2, { y: '+=30px', ease: Power0.easeNone, repeat: -1, yoyo: true, delay: 0.5 });
  TweenMax.from($startGameBtn, 1, { scale: 0, ease: Bounce.easeOut, delay: 0.5 });
  $startGameBtn.on('click', function (e) {
    e.preventDefault();
    $('.start').fadeOut(100);
    startGame();
  })


  function startGame() {
    var gameHeight = $('.game5_content').height();
    var moveHeight = gameHeight + 60
    var iiiii = title_index+1
    $("#game5-notify-text").text("點擊中間下方圓形按鈕，控制角色飛行高度，於氣球前方近距離及同一水平線上，即可吸入。");

    //****print題目****//
    $('.game5_question').html('<h5 style="font-weight: 700;">' + iiiii + ". " + game5QuestionArray[title_index].title + '</h5>')
    logFile.push("第1題\n")
		db.ref(fullDbUrl+"Detail").push("第1題");

    //背景動畫及月亮
    TweenMax.to(".game5_content", 15, { backgroundPositionX: "-1050px", ease: Linear.easeNone, repeat: -1 });

    // 遊戲物件
    var GameObj = function (size, position, el) {
      this.size = size;
      this.position = position;
      this.$el = $(el);
      this.updateCss();
    }
    // 遊戲物件 --//更新css
    GameObj.prototype.updateCss = function () {
      this.$el.css("left", this.position.x);
      this.$el.css("top", this.position.y);
      this.$el.css("width", this.size.width);
      this.$el.css("height", this.size.height);
    }
    // 遊戲物件 --//檢查碰撞
    GameObj.prototype.collide1 = function (otherObject) {
      var inRangeX = otherObject.position.x + otherObject.size.width > this.position.x + 14 && otherObject.position.x < this.position.x + this.size.width - 14;
      var inRangeY = otherObject.position.y + otherObject.size.height > this.position.y + 12 && otherObject.position.y < this.position.y + this.size.height - 12;
      return inRangeX && inRangeY;
    }
    // 遊戲物件 --//正確吸入
    GameObj.prototype.collide2 = function (otherObject) {
      var inRangeX = otherObject.position.x + otherObject.size.width >= this.position.x - 50 && otherObject.position.x + otherObject.size.width < this.position.x;
      var inRangeY = otherObject.position.y + otherObject.size.height > this.position.y + 12 && otherObject.position.y < this.position.y + this.size.height - 12;
      return inRangeX && inRangeY;
    }


    // [類別] 主角boxman
    var Box = function (size, position, selector) {
      GameObj.call(this, size, position, selector);
    }
    Box.prototype = Object.create(GameObj.prototype);
    Box.prototype.constructor = Box.constructor;
    // [類別] 主角boxman --//檢查上下邊界
    Box.prototype.update = function () {
      var $gameHeight = $('.game5_content').height();
      var $thisHeight = this.size.height;
      if (this.position.y < 0) {
        this.position.y = 0;
      }
      if (this.position.y + $thisHeight > $gameHeight) {
        this.position.y = $gameHeight - $thisHeight;
      }
      this.updateCss();
    }
    // [類別] 創造boxman
    var box = new Box({ width: 80, height: 124 }, { x: 10, y: 200 }, '.game__boxman');
    //****boxman給予data-value正確答案****//
    $('#boxman_value').data("value",game5AnswerArray[String(title_index)][right_index])


    // [類別] 障礙物
    var Block = function (size, selector) {
      this.position = { x: 1150, y: 0 }
      GameObj.call(this, size, this.position, selector);
      this.initPosition();
    }
    Block.prototype = Object.create(GameObj.prototype);
    Block.prototype.constructor = Block.contructor;
    // [類別] 障礙物--// 判斷初始位置
    Block.prototype.initPosition = function () {
      var $gameHeight = $('.game5_content').height();
      var isTop = R(2, 10);
      this.updateCss();
      this.move();
      if (isTop == 0 || isTop == 1) {
        this.position.y = 0;
      } else if (isTop == 5 || isTop == 6) {
        this.position.y = $gameHeight - this.size.height
      } else if (isTop == 2 || isTop == 3) {
        this.position.y = ($gameHeight / 3) - (this.size.height / 3)
      } else if (isTop == 4 || isTop == 7) {
        this.position.y = ($gameHeight / 2) - (this.size.height / 2)
      } else {
        this.position.y = 60
      }
    }
    // [類別] 障礙物--// 移動
    Block.prototype.move = function () {
      var _this = this;
      var moveTimer = setInterval(function () {

        _this.position.x -= game.blockv;

        if (_this.position.x < -(_this.size.width)) {
          _this.$el.remove();
        }
        _this.updateCss();

        if (game.gameTime > 0 && _this.collide1(box)) {
          life -= 15
          $('#barr').attr('aria-valuenow', life).css('width', life+'%');
          $('#hppp').html(life)
          _this.$el.children('img').attr("src","img/cloud_v3.png")
          _this.$el.addClass('ooo')
          // _this = null
          clearInterval(moveTimer)
          $("#boxman_value").attr("src","img/boxman4.png")
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman.png")
          }, 200);
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman4.png")
          }, 400);
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman.png")
            _this.$el.remove();
          }, 600);
          logFile.push(game5_time + "秒-------------->撞到障礙物(c)\n")
          logFileSimple.push("c")
          db.ref(fullDbUrl+"Detail").push(game5_time + "秒-------------->撞到障礙物(c)");
          if(life<=0){
            game.gameLose();
          }
        }

        if (game.gameTime > 0 && _this.collide2(box)) {
          TweenMax.to(_this.$el, 0.1, { scale: 0});
          if($('#boxman_value').data("value")===_this.$el[0].attributes["2"].value){
            clearInterval(moveTimer)
            $("#boxman_value").attr("src","img/boxman3.png")
            setTimeout(function () {
              $("#boxman_value").attr("src","img/boxman.png")
            }, 200);
            setTimeout(function () {
              $("#boxman_value").attr("src","img/boxman3.png")
            }, 400);
            setTimeout(function () {
              $("#boxman_value").attr("src","img/boxman.png")
              _this.$el.remove();
            }, 600);
            title_index +=1
            right_index = game5AnswerArray[String(title_index)][4]
            score5 += 30
            $('#game5_score').text(score5)
            game5_topic ++
            $('#game5_topic').html(game5_topic)
            logFile.push(game5_time + "秒-------------->吸入氣球答題正確(y)\n")
            logFileSimple.push("y")
            db.ref(fullDbUrl+"Detail").push(game5_time + "秒-------------->吸入氣球答題正確(y)");
            //****boxman給予data-value正確答案****//
            $('#boxman_value').data("value",game5AnswerArray[String(title_index)][right_index])
            var iiiii = title_index+1
            //****print題目****//
            $('.game5_question').html('<h5 style="font-weight: 700;">' + iiiii + ". " + game5QuestionArray[title_index].title + '</h5>')
            // $('#rrrrr').html(game5AnswerArray[String(title_index)][right_index])
            logFile.push("第"+(title_index+1)+"題\n")
            db.ref(fullDbUrl+"Detail").push("第"+(title_index+1)+"題");
            console.log("title_index",title_index)
            console.log("total_indedx",total_indedx)
            if (title_index == total_indedx){
              logFile.push("遊戲分數:" + score5 + "\n")
              logFile.push("此關遊戲得分:" + (score5-game_score) + "\n")
      			  logFile.push("此關花費時間:" + (360-game5_time) + "\n")
              logFile.push("第四關遊戲結束-全部題目作答完(d)\n")
              logFile.push("\n")
              logFileSimple.push("d")
              db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score5);
              db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + (score5-game_score));
              db.ref(fullDbUrl+"Detail").push("此關花費時間:" + (360-game5_time));
              db.ref(fullDbUrl+"Detail").push("第四關遊戲結束-全部題目作答完(d)");
              db.ref(fullDbUrl+"SimpleGame").push(logFileSimple);
              gameLosePop()
              var highestIntervalId = setInterval(";");
              for (var i = 0 ; i < highestIntervalId ; i++) {
                  clearInterval(i); 
              }
              
            }
          }else{
            life -= 15
            clearInterval(moveTimer)
            _this.$el.children('img').attr("src","img/cloud_v2.png")
            $('#barr').attr('aria-valuenow', life).css('width', life + '%');
            $('#hppp').html(life)
            logFile.push(game5_time + "秒-------------->吸入氣球答題錯誤(n)\n")
            logFileSimple.push("n")
            db.ref(fullDbUrl+"Detail").push(game5_time + "秒-------------->吸入氣球答題錯誤(n)");
            if(life<=0){
              logFile.push("遊戲分數:" + score5 + "\n")
              logFile.push("此關遊戲得分:" + (score5-game_score) + "\n")
              logFile.push("第四關遊戲結束-沒血量(h)\n")
              logFile.push("\n")
              logFileSimple.push("h")
              db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score5);
              db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + (score5-game_score));
              db.ref(fullDbUrl+"Detail").push("第四關遊戲結束-沒血量(h)");
              db.ref(fullDbUrl+"SimpleGame").push(logFileSimple);
              game.gameLose();
            }else{
              $("#boxman_value").attr("src","img/boxman2.png")
              setTimeout(function () {
                $("#boxman_value").attr("src","img/boxman.png")
              }, 200);
              setTimeout(function () {
                $("#boxman_value").attr("src","img/boxman2.png")
              }, 400);
              setTimeout(function () {
                $("#boxman_value").attr("src","img/boxman.png")
                _this.$el.remove();
              }, 600);
            }
          }          
        }
        // if (game.gameTime > 0 && _this.collideright(box)) {
        //   if($('#boxman_value').data("value")===_this.$el[0].attributes["2"].value){
        //     alert("答對了")
        //   }else{
        //     alert("答錯了")
        //   }
        //   _this.$el.remove();
        //   clearInterval(moveTimer)
        // }
      }, 10)
    }

    // [類別] 輔助物品
    var SupportBlock = function (size, selector) {
      this.position = { x: 1150, y: 0 }
      GameObj.call(this, size, this.position, selector);
      this.initPosition();
    }
    SupportBlock.prototype = Object.create(GameObj.prototype);
    SupportBlock.prototype.constructor = SupportBlock.contructor;
    // [類別] 輔助物品--// 判斷初始位置
    SupportBlock.prototype.initPosition = function () {
      var $gameHeight = $('.game5_content').height();
      var isTop = R(1, 2);
      this.updateCss();
      this.move();
      if (isTop == 1) {
        this.position.y = ($gameHeight / 3) - this.size.height
      }else{
        this.position.y = ($gameHeight / 2) + (this.size.height / 2)
      }
      
    }
    // [類別] 輔助物品--// 移動
    SupportBlock.prototype.move = function () {
      var _this = this;
      var moveTimer = setInterval(function () {

        _this.position.x -= game.blockv;

        if (_this.position.x < -(_this.size.width)) {
          _this.$el.remove();
        }
        _this.updateCss();

        if (game.gameTime > 0 && _this.collide1(box)) {
          life -= 15
          $('#barr').attr('aria-valuenow', life).css('width', life+'%');
          $('#hppp').html(life)
          _this.$el.addClass('ooo')
          // _this = null
          clearInterval(moveTimer)
          $("#boxman_value").attr("src","img/boxman4.png")
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman.png")
            _this.$el.remove();
          }, 200);
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman4.png")
          }, 400);
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman.png")
          }, 600);
          logFile.push(game5_time + "秒-------------->撞到障礙物(c)\n")
          logFileSimple.push("c")
          db.ref(fullDbUrl+"Detail").push(game5_time + "秒-------------->撞到障礙物(c)");
          if(life<=0){
            game.gameLose();
          }
        }

        if (game.gameTime > 0 && _this.collide2(box)) {
          TweenMax.to(_this.$el, 0.1, { scale: 0});
          clearInterval(moveTimer)
          $("#boxman_value").attr("src","img/boxman3.png")
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman.png")
          }, 200);
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman3.png")
          }, 400);
          setTimeout(function () {
            $("#boxman_value").attr("src","img/boxman.png")
            _this.$el.remove();
          }, 600);    
          game5_bonus += 1
          $('#game5_bonus_count').text(game5_bonus);
          $('#game5_hp_btn').attr('disabled', false);
          $('#game5_time_btn').attr('disabled', false);
        }
      }, 10)
    }



    // 遊戲本體
    var Game = function () {
      this.btnControl();
      this.createBlock();
      this.createSupportBlock();
      this.startGame();
      this.startGameMain();
      this.boxv = 6;
      this.blockv = 1;
      this.touch = false;
      this.gameTime = 360;
      this.isFalse = false;
    }
    // 遊戲本體--// 按鈕控制
    Game.prototype.btnControl = function () {
      var $gameBtn = $('.game__btn');
      var _this = this;
        $gameBtn.on({
          mousedown: function (e) {
            e.preventDefault();
            _this.boxv = 6;
            _this.touch = true;
          },
          mouseup: function (e) {
            e.preventDefault();
            _this.boxv = 6;
            _this.touch = false;
          }
        })
    }
    // 遊戲本體--// 時間倒數
    Game.prototype.startGame = function () {
      var _this = this;
      setTimeout(function () {
        countDown()
      }, 500);
      function countDown() {
        var timer = setInterval(function () {
          game5_time = _this.gameTime
          $('.game__time').text(_this.gameTime);
          _this.gameTime--;
          if (_this.isFalse == true) {
            clearInterval(timer);
            console.log('lose');
          }
          if (_this.gameTime == 330) {
            $("#game5-notify-text").text("若吸入機會硬幣，可使用圓形按鈕下方輔助功能。");
          }
          if (_this.gameTime < 0) {
            _this.gameSuccess();
            clearInterval(timer);
            logFile.push("遊戲分數:" + score5 + "\n")
            logFile.push("此關遊戲得分:" + (score5-game_score) + "\n")
            logFile.push("第四關遊戲結束-時間到，題目未作答完(z)\n")
            logFile.push("\n")
            logFileSimple.push("z")
            db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score5);
            db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + (score5-game_score));
            db.ref(fullDbUrl+"Detail").push("第四關遊戲結束-時間到，題目未作答完(z)");
            db.ref(fullDbUrl+"SimpleGame").push(logFileSimple);
            gameLosePop()
          }
        }, 1000);
      }
    }
    // 遊戲本體--// 創造障礙物
    Game.prototype.createBlock = function () {
      var id = 26;
      var tt_index = 0;
      var _this = this;
      var createTimer = setInterval(function () {
        
        var blockType = R(0, 1);
        //****print障礙物-附加data-value****//
        if (blockType == 0) {
          var $block = $('<div class="block" id="' + id + '" data-value="' + game5AnswerArray[String(title_index)][tt_index] + '"><p>' + game5AnswerArray[String(title_index)][tt_index] +'</p><img src="img/cloud_v1.png"></div>');          // tt_index+=1
          // if(tt_index===4){
          //   tt_index=0
          // }
        } else {
          var $block = $('<div class="block" id="' + id + '" data-value="' + game5AnswerArray[String(title_index)][tt_index] + '"><p>' + game5AnswerArray[String(title_index)][tt_index] +'</p><img src="img/cloud_v1.png"></div>');          // tt_index+=1
          // if(tt_index===4){
          //   tt_index=0
          // }
        }
        $('.game5_content').append($block);
        var block = new Block({ width: 100, height: 77 }, '#' + id + '');
        id++;
        tt_index++;
        if(tt_index===4){
          tt_index=0
        }
      }, 3000)
    }
    // 遊戲本體--// 創造輔助物品
    Game.prototype.createSupportBlock = function () {
      var id = 101;
      var tt_index = 0;
      var _this = this;
      var createTimer = setInterval(function () {
        
        var blockType = R(0, 1);
        //****print障礙物-附加data-value****//
        if (blockType == 0) {
          var $block = $('<div class="block" id="' + id + '" data-value="' + game5AnswerArray[String(title_index)][tt_index] + '"><img src="img/bonus.png"></div>');
        } else {
          var $block = $('<div class="block" id="' + id + '" data-value="' + game5AnswerArray[String(title_index)][tt_index] + '"><img src="img/bonus.png"></div>');
        }
        $('.game5_content').append($block);
        var block = new SupportBlock({ width: 75, height: 75 }, '#' + id + '');
        id++;
        tt_index++;
        if(tt_index===4){
          tt_index=0
        }
      }, 10000)
    }
    // 遊戲本體--// 主要時間函數
    Game.prototype.startGameMain = function () {
      var _this = this;
      var mainTimer = setInterval(function () {
        // 判斷按鈕控制
        if (_this.touch) {
          $('.game__btn img').attr('src', 'img/btn2.png');
          box.position.y -= _this.boxv;
          _this.boxv += 0.6;
        }
        if (!_this.touch) {
          $('.game__btn img').attr('src', 'img/btn1.png');
          box.position.y += _this.boxv;
          _this.boxv += 0.6;
        }
        if (_this.isFalse == true) {
          clearInterval(mainTimer);
        }
        if (_this.gameTime < 0) {
          clearInterval(mainTimer);
        }
        box.update();
      }, 30);
    }
    // 遊戲本體--// 遊戲失敗
    Game.prototype.gameLose = function () {
      this.blockv = 0;
      this.boxv = 0;
      this.isFalse = true;
      $("#boxman_value").attr("src","img/boxman5.png")
      console.log('lose');
      TweenMax.pauseAll();
      $('.game__btn').css('pointer-events', 'none');
      TweenMax.to(".game__boxman", 0.5, { y: '-=80px', x: '-=10px', rotation: -40, ease: Power1.easeOut, delay: 0.2, });
      TweenMax.to(".game__boxman", 0.6, { y: '+=800px', ease: Power1.easeIn, delay: 0.7, onComplete: gameLosePop })
    }
    // 遊戲本體--// 遊戲成功
    Game.prototype.gameSuccess = function () {
      this.blockv = 0;
      this.boxv = 0;
      console.log('success');
      TweenMax.pauseAll();
      $('.block').remove();
      $('.game__btn').css('pointer-events', 'none');
      TweenMax.to(".game__boxman", 3, { y: '+=40', ease: Elastic.easeOut.config(1, 0.3), delay: 1 });
      TweenMax.to(".game__boxman", 0.5, { x: 800, ease: Power1.easeIn, delay: 2.5, onComplete: gameWinPop });
    }
    function gameWinPop() {
      var r = R(0, 2);
      $('.pop__top > img').attr('src', 'img/pop_top.png');
      $('.pop__top--text').html(popObj[r].text);
      $('.pop__link').attr('href', popObj[r].link)
      $('.pop').removeClass('hide');
    }
    function gameLosePop() {
      $('#game5').css('display', 'none');
      $('header').css('display', 'none');
      db.ref(fullDbUrl+"Astep/step").once('value').then(result=>{
        if(result.val()==1){
          $('#finalllllModal').modal({backdrop: 'static', keyboard: false})
          db.ref(fullDbUrl+"Astep").set({step:2});
          localStorage.setItem("Astep", 2)
          // window.location.replace("step.html");
          // history.go(-1)
          logFile.push(logFileSimple.join(''))
          // save_a()
          // save_b()
        }else{
          $('#finalModalMessage').html("所有測驗已結束\n</br>請通知主測者")
          $('#finalModal').modal({backdrop: 'static', keyboard: false})  
          db.ref(fullDbUrl+"Astep").set({step:4});
          localStorage.setItem("Astep", 4)
          logFile.push(logFileSimple.join(''))
          save_a()
          db.ref(fullDbUrl+"SimpleAll").push(logFileSimple);
          // save_b()
        }
      }).catch(error => {
        alert("您的網路異常無法繼續測驗，請通知主測者。")
      });


      // $('.pop__top > img').attr('src', 'img/pop_top-lose.png');
      // $('.pop__top--content').remove();
      // $('.pop').removeClass('hide');
    }

    $('#finalModal').on('click', function () {
      save_a()
      // save_b()
    })

    $('#game5_hp_btn').on('click', function () {
      logFile.push(game5_time + "秒-------------->補血+30按鈕(p)\n")
      logFileSimple.push("p")
      db.ref(fullDbUrl+"Detail").push(game5_time + "秒-------------->補血+30按鈕(p)");
      if(game5_bonus>0){
        game5_bonus -= 1;
        $('#game5_bonus_count').text(game5_bonus);
        life += 30
        if(life>=100){
          life = 100
        }
        $('#barr').attr('aria-valuenow', life).css('width', life + '%');
        $('#hppp').html(life)
      }
      checkBonus()
    })

    $('#game5_time_btn').on('click', function () {
      logFile.push(game5_time + "秒-------------->時間+30秒按鈕(t)\n")
      logFileSimple.push("t")
      db.ref(fullDbUrl+"Detail").push(game5_time + "秒-------------->時間+30秒按鈕(t)");
      if(game5_bonus>0){
        game5_bonus -= 1;
        $('#game5_bonus_count').text(game5_bonus);
        game.gameTime += 30;
        $('.game__time').text(game.gameTime);
      }
      checkBonus()
    })

    function checkBonus(){
      if(game5_bonus<=0){
        game5_bonus = 0
        $('#game5_bonus_count').text(game5_bonus);
        $('#game5_hp_btn').attr('disabled', true);
        $('#game5_time_btn').attr('disabled', true);
      }
    }
    
    $('.btn__reload').on('click', function () {
      location.reload();
    })
    var game = new Game();
    $('#hppp').html(life)
    

    function R(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

};
//Todo
//燈箱 start
//燈箱 success random(1,3)




