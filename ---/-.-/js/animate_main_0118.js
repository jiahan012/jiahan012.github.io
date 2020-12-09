(function () {
  //loading

  $(window).on("load", function () {
    $('.loading_mask').addClass('fadeOut').show().delay(500).fadeOut(0);
    setTimeout(animation, 400);
  })
  //抽將好禮結果
  function animation() {
    var obj = [
      {
        name: '洗衣週年慶３件85折',
        link: 'https://24h.pchome.com.tw/store/?fq=/A/27657',
      },
      {
        name: '舒潔任2箱現折$150',
        link: 'https://24h.pchome.com.tw/store/?fq=/A/118409',
      },
      {
        name: '圍爐飲料整箱免搬',
        link: 'https://24h.pchome.com.tw/store/DBBQ9J',
      },
    ]

    var scoreCount = 0;//總分
    //-------- 呼叫first() --------
    first();
    function first() {
      var $first = $('.first');
      var $first_top = $('.first_top');
      var $logo = $('.first_top img.logo');
      var $cloud1 = $('.first_top img.cloud1');
      var $cloud2 = $('.first_top img.cloud2');
      var $cloud3 = $('.first_top img.cloud3');
      var $first_btn = $('.first a');
      var $start_btn = $('.start_btn');
      TweenLite.from($logo, 1.5, { y: '-100%', ease: Elastic.easeOut, delay: 0.5 });
      TweenLite.from($cloud1, 2, { x: '10%', opacity: 0, delay: 1.5 });
      TweenLite.from($cloud2, 2, { x: '-20%', opacity: 0, delay: 1.5 });
      TweenLite.from($cloud3, 2, { y: '-20%', opacity: 0, delay: 1.8 });
      TweenMax.staggerFrom($first_btn, 2, { scale: 0.5, opacity: 0, delay: 1, ease: Elastic.easeOut }, 0.2);
      $start_btn.on('click', function () {
        TweenMax.staggerTo($first_btn, 0.5, { opacity: 0, y: -100, ease: Back.easeIn }, 0.1);
        TweenLite.to($first_top, 1.8, { opacity: 0, delay: 0.2, onComplete: callSecond });
        function callSecond() {
          $first.remove();
          second();
        }
      });
    };

    //-------- 由callSecond呼叫second() --------
    // second();
    function second() {
      var allFoods = [
        {
          name: 'dumpling',
          url: 'images/dumpling.png',
        },
        {
          name: 'shrimp',
          url: 'images/shrimp.png',
        },
        {
          name: 'springRoll',
          url: 'images/springRoll.png',
        },
        {
          name: 'pig',
          url: 'images/pig.png',
        },
        {
          name: 'chicken',
          url: 'images/chicken.png',
        },
        {
          name: 'rice',
          url: 'images/rice.png',
        },
        {
          name: 'fish',
          url: 'images/fish.png',
        },
        {
          name: 'pork',
          url: 'images/pork.png',
        },
      ]
      var $second = $('.second');
      var w = $second.innerWidth();
      var h = $second.innerHeight();
      var total = 35;//總掉落數
      var time = 10; //倒數計時
      var timeCount = $('.second_top-time span'); //倒數計時dom
      var $score = $('.second_top-score span'); //記分板 dom
      $second.css('display', 'block');
      TweenLite.from($second, 1, { opacity: 0, onComplete: secondStart });

      //second載入後開始倒數計時 
      function secondStart() {

        function countDown() {
          timeCount.text(time);
          time--
          if (time < 0) {
            clearInterval(timer2);
            $('.timeUp').css('display', 'block');
            $('.food').remove();
            setTimeout(function () {
              TweenMax.to($second, 1, { opacity: 0, ease: Linear.easeNone, onComplete: remove });
            }, 2000)
            function remove() {
              $second.remove();
              third();
            }
          }
        }
        var timer2 = setInterval(countDown, 1000);
      }
      //年菜隨機分佈上方並掉落
      for (i = 0; i < total; i++) {
        var Div = document.createElement('div');
        TweenLite.set(Div, { attr: { class: 'food' }, backgroundImage: 'url(' + allFoods[Robj(1, 8)].url + ')', x: R(30, w - 90), y: R(-200, -150) });
        $second.append(Div);
        animm(Div);
      }
      function animm(elm) {
        TweenMax.to(elm, R(2, 9), { y: h + 200, ease: Linear.easeNone, delay: R(0, 11) });
        TweenMax.to(elm, R(4, 8), { x: '+=' + R(-50, 50) + '', ease: Sine.easeInOut });
        TweenMax.to(elm, 2, { rotation: R(-30, 30), repeat: 3, yoyo: true, ease: Sine.easeInOut });
      };
      //點擊年菜消失，得一分
      $('.food').on('touchstart click', addPoint);
      function addPoint() {
        var $this = $(this);//點擊的物件
        var attr = $this.attr('style');
        var thisName = attr.split('images/')[1].split('.png')[0];//取出年菜名稱
        var thisUrl = '';
        checkUrl(thisName);
        function checkUrl(thisItem) {
          for (var i = 0; i < allFoods.length; i++) {
            if (thisItem == allFoods[i].name) {
              thisUrl = allFoods[i].url;
            }
          }
        }
        var Div = document.createElement('div');//根據點擊年菜 創造相對應DIV放在桌上
        $this.css('pointer-events', 'none');
        TweenMax.to($this, 0.5, { y: '-=30', opacity: 0, ease: Expo.easeOut, onComplete: putTable });
        setTimeout(function () {
          $this.remove();
        }, 1000);

        if ($(window).width() < 768) {
          TweenLite.set(Div, {
            attr: { class: 'food_click' },
            backgroundImage: 'url(' + thisUrl + ')',
            bottom: Rpercent(13, 17),
            left: Rpercent(10, 75),
            zIndex: Robj(15, 25)
          }
          );
        } else {
          TweenLite.set(Div, {
            attr: { class: 'food_click' },
            backgroundImage: 'url(' + thisUrl + ')',
            bottom: Rpercent(15, 19),
            left: Rpercent(14, 78),
            zIndex: Robj(15, 25)
          }
          );
        }
        //分數++
        scoreCount++;
        addScore();
        //將物品放在桌上
        function putTable() {
          $second.append(Div);
        }
      }//End addPoint
      function addScore() {
        $score.text(scoreCount);
      }
    }//End second

    //-------- 由second的setTimeout呼叫third() --------

    function third() {
      var $third = $('.third');
      var $lantern = $('.third_top img.lantern');
      var $thirdDesk = $('.third_desk');
      var $thirdResult = $('.third_result');
      $third.css('display', 'block');
      TweenMax.staggerFrom($lantern, 1, { y: -500, ease: Expo.easeOut }, 0.1);
      TweenMax.from($thirdDesk, 1, { y: 500, ease: Expo.easeOut });
      TweenMax.from($thirdResult, 0.5, { scale: 0, rotation: -360, ease: Power2.easeOut, delay: 0.5 });
      var result = '';
      var resultLink = '';
      if (scoreCount >= 25) {
        result = obj[0].name;
        resultLink = obj[0].link;
      } else if (scoreCount >= 15 && scoreCount < 25) {
        result = obj[1].name;
        resultLink = obj[1].link;
      } else {
        result = obj[2].name;
        resultLink = obj[2].link;
      }
      $('.third_result h3.title').html(result);
      $('a.resultLink').attr('href', resultLink);
    }

    //隨機百分比
    function Rpercent(min, max) {
      return Math.floor(Math.random() * (max - min)) + min + '%';
    }
    //隨機整數
    function Robj(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    //隨機秒數
    function R(min, max) {
      return min + Math.random() * (max - min)
    }

  }//End animate


})(); 