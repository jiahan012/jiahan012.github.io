function game4s(game_score) {
	var s4 = game_score
	$('#game4').css('display', 'none');
	$('#game1-content').css("background-image", "url('images/game4_bg.jpg')");
  
	$('#game-notify').css('display', 'none');

	$('header').css('display', 'none');
	$('#game3StartPage').css('display', 'none');
	$('#game4StartPage').css('display', 'block');

	$("#xtoo_btn").attr('disabled', true);
	$("#x_ex_o_btn").attr('disabled', true);
  
	//遊戲關卡一開始
	$('#game4StartBtn').on("click",function() {
	  $('#game4StartPage').css('display', 'none');
	  $('header').css('display', 'block');
	  $('#game4').css('display', 'block');
	  $('.bingo_line').css('display', 'inline-block');
	  $('.base_qa_line').css('display', 'none');
	  game4(s4)
	})
	
}

function game4(game_score) {
  clearInterval(interval);
  var highestIntervalId = setInterval(";");
  for (var i = 0 ; i < highestIntervalId ; i++) {
	  clearInterval(i); 
  }

  //第三關遊戲提示
  $('#game-notify').css('display', 'block');
  $("#game-notify-text").text("點選1個方格並回答該格的問題，若達成賓果線即可得分，得到4條賓果線則完成遊戲。");

  logFile.push("第三關遊戲開始(b)\n")
  logFileSimple.push("b")
  db.ref(fullDbUrl+"Detail").push("第三關遊戲開始(b)");

  var score4 = game_score
  $('#game_score').text(score4);

  var game4_time = 720;
  var timeCount = $('.second_top-time span'); //倒數計時dom
  timeCount.text(game4_time);
  //第三關遊戲循環倒數
  var interval;
  var intervalCall = function() {
    if (game4_time >= 0) { 
      timeCount.text(game4_time);
      game4_time--
      clearInterval(interval);
      interval = setInterval(intervalCall, 1000);
    }else{
	  clearInterval(interval);
	  $('#nextModalMessage').html("遊戲結束。\n</br>即將進入下一關遊戲")
	  $('#nextModal').modal({backdrop: 'static', keyboard: false}) 
		//   alert("第三關遊戲結束");
	  logFile.push("遊戲分數:" + score4 + "\n")
	  logFile.push("此關遊戲得分:" + (score4-game_score) + "\n")
	  logFile.push("第三關遊戲結束-時間到，題目未作答完(o)\n")
	  logFile.push("\n")
	  logFileSimple.push("o")
	  db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score4);
	  db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + (score4-game_score));
	  db.ref(fullDbUrl+"Detail").push("第三關遊戲結束-時間到，題目未作答完(o)");
	//   db.ref(fullDbUrl+"Simple3").push(logFileSimple);
	  $("#game4_popup").css("display","none");
	  $('#nextModal').on('hidden.bs.modal', function (e) {
		$('#game4').css('display', 'none');
		game5s(score4)
	  });
    }
  };
  interval = setInterval(intervalCall, 1000); 

		var origBoard;
		var targetId = "";
		var game4_answer_voice = "";
		var bingo_line = 0

		//新
		var bingo_bonus = 3
		var xtoo_mode = false;
		var x_ex_o_mode = false;
		var x_ex_o_step = 1;
		var x_ex_o_step1 = 30;
		var x_ex_o_step2 = 31;
		var remain = 3
		$("#game4_remain").text(remain)
		var xtoo_btn = document.getElementById("xtoo_btn");
		var x_ex_o_btn = document.getElementById("x_ex_o_btn");
		const winPlayer = '☆';

		const huPlayer = 'O';
		const aiPlayer = 'X';
		const winCombos = [
			[0, 1, 2, 3, 4],
			[5, 6, 7, 8, 9],
			[10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19],
			[20, 21, 22, 23, 24],
			[0, 5, 10, 15, 20],
			[1, 6, 11, 16, 21],
			[2, 7, 12, 17, 22],
			[3, 8, 13, 18, 23],
			[4, 9, 14, 19, 24],
			[0, 6, 12, 18, 24],
			[4, 8, 12, 16, 20]
		];


		var game4Array = [
			{
				img: '01.jpg',
				title: 'When John was an elementary student, John did not like Mary because she always had ________ colors in her hair.',
				answer: 'diverse',
				voice: 'When John was an elementary student, John did not like Mary because she always had diverse colors in her hair.'
			},

			{
				img: '02.jpg',
				title: 'Mary has not eaten any food for two days but she is very pleased and extremely happy to take part in __________ activities.',
				answer: 'extracurricular',
				voice: 'Mary has not eaten any food for two days but she is very pleased and extremely happy to take part in extracurricular activities.'
			},

			{
				img: '03.jpg',
				title: 'Mary could not ________ herself to doing great works for her PhD study.',
				answer: 'devote',
				voice: 'Mary could not devote herself to doing great works for her PhD study.'
			},

			{
				img: '04.jpg',
				title: "Mary's parents are very unsatisfied with her performance and decide to stop ________ support for her completely.",
				answer: 'financial',
				voice: "Mary's parents are very unsatisfied with her performance and decide to stop financial support for her completely."
			},

			{
				img: '05.jpg',
				title: 'All students are very ________ of her intelligence.',
				answer: 'jealous',
				voice: 'All students are very jealous of her intelligence.'
			},
			{
				img: '06.jpg',
				title: 'Mary is not ________ at all due to the fact that she enjoys reading.',
				answer: 'lonely',
				voice: 'Mary is not lonely at all due to the fact that she enjoys reading.'
			},

			{
				img: '07.jpg',
				title: "Mary's hobbies include attending the church and playing a variety of digital games with her ________",
				answer: 'cousins',
				voice: "Mary's hobbies include attending the church and playing a variety of digital games with her cousins"
			},

			{
				img: '08.jpg',
				title: 'Digital games are useful vehicles to develop ________ thinking.',
				answer: 'critical',
				voice: 'Digital games are useful vehicles to develop critical thinking.'
			},
			{
				img: '09.jpg',
				title: 'Mary has enough money to ________ a lot of clothes that she did not need.',
				answer: 'purchase',
				voice: 'Mary has enough money to purchase a lot of clothes that she did not need.'
			},

			{
				img: '10.jpg',
				title: 'Mary could ________ her financial resources.',
				answer: 'exhaust',
				voice: 'Mary could exhaust her financial resources.'
			},
			{
				img: '11.jpg',
				title: 'John sometimes plays ________ with his classmates.',
				answer: 'basketball',
				voice: 'John sometimes plays basketball with his classmates.'
			},

			{
				img: '12.jpg',
				title: 'The hospital could charge your ________.',
				answer: 'insurance',
				voice: 'The hospital could charge your insurance.'
			},
			{
				img: '13.jpg',
				title: 'Mary can achieve her ________ because her parents provide a lot of financial support and offer constructive advice.',
				answer: 'targets',
				voice: 'Mary can achieve her targets because her parents provide a lot of financial support and offer constructive advice.'
			},

			{
				img: '14.jpg',
				title: 'There is no way to ________ Mary to drink milk is needed.',
				answer: 'persuade',
				voice: 'There is no way to persuade Mary to drink milk is needed.'
			},
			{
				img: '15.jpg',
				title: 'The future of work lies in learning, working, and playing ________ so we cannot ignore any aspect.',
				answer: 'concurrently',
				voice: 'The future of work lies in learning, working, and playing concurrently so we cannot ignore any aspect.'
			},
			{
				img: '16.jpg',
				title: 'It is ________ to say that most people are not as lazy as Mary.',
				answer: 'needless',
				voice: 'It is needless to say that most people are not as lazy as Mary.'
			},
			{
				img: '01.jpg',
				title: 'When John was an ________ student, John did not like Mary because she always had diverse colors in her hair.',
				answer: 'elementary',
				voice: 'When John was an elementary student, John did not like Mary because she always had diverse colors in her hair.'
			},
			{
				img: '02.jpg',
				title: 'Mary really enjoys the time spent in the extracurricular activities in which she __________.',
				answer: 'participates',
				voice: 'Mary really enjoys the time spent in the extracurricular activities in which she participates.'
			},
			{
				img: '03.jpg',
				title: 'Mary is not ________ to complete her PhD study.',
				answer: 'motivated',
				voice: 'Mary is not motivated to complete her PhD study.'
			},
			{
				img: '04.jpg',
				title: "Mary's parents want to change her wrong ________ toward her PhD.",
				answer: 'attitude',
				voice: "Mary's parents want to change her wrong attitude toward her PhD."
			},
			{
				img: '06.jpg',
				title: "Mary's favorite ________ is reading.",
				answer: 'hobby',
				voice: "Mary's favorite hobby is reading."
			},
			{
				img: '08.jpg',
				title: 'Digital games help Mary have ________ imagination.',
				answer: 'creative',
				voice: 'Digital games help Mary have creative imagination.'
			},
			{
				img: '09.jpg',
				title: 'Mary successfully passed the ________.',
				answer: 'examination',
				voice: 'Mary successfully passed the examination.'
			},
			{
				img: '11.jpg',
				title: 'The library is their ________ place.',
				answer: 'disfavored',
				voice: 'The library is their disfavored place.'
			},
			{
				img: '13.jpg',
				title: 'A lot of people know that Mary has ________ parents.',
				answer: 'remarkable',
				voice: 'A lot of people know that Mary has remarkable parents.'
			},
		]
		if(pre_post_mode==2){
			game4Array = game4Array.reverse();
		}

		const cells = document.querySelectorAll('.cell');
		// console.log("cellscells",cells)
    
		function startGame() {
			document.querySelector(".endgame").style.display = "none"
			origBoard = Array.from(Array(25).keys()); //create array 0:0, 1:1, 2:2 ...
			// console.log(origBoard)
			for (var i = 0; i < cells.length; i++) {
				// cells[i].innerText = "apple";
				cells[i].innerHTML='<img class="cell_img" id="'+ i + '" src="images/' + game4Array[i].img + '"/>';
				cells[i].style.removeProperty('background-color');
				// cells[i].addEventListener('click', turnClick, false);
			}
			const cells_img = document.querySelectorAll('.cell');
			for (var i = 0; i < cells_img.length; i++) {
				cells_img[i].addEventListener('click', turnClick, false);
			}
			$('#bingo_line').html(bingo_line);
			$('#op_line').html(bingo_bonus);

		}

		function turnClick(square) {
			targetId = square.target.id
			// console.log("square.target.id",targetId);
			//新
			if(xtoo_mode){
				turn(square.target.id, huPlayer);
				xtoo_mode = false;
				for (var i = 0; i < origBoard.length; i++) {
					if(typeof origBoard[i] == 'number'){
						cells[i].classList.remove("ooxx_pointer_none");
					}else if(origBoard[i] == winPlayer){
						cells[i].classList.remove("ooxx_pointer_none");
						cells[i].classList.remove("ready_pointer");
					}else if(origBoard[i] == huPlayer){
						cells[i].classList.remove("ooxx_pointer_none");
						cells[i].classList.remove("ready_pointer");
					}else if(origBoard[i] == aiPlayer){
						cells[i].classList.remove("ooxx_pointer_none");
						cells[i].classList.remove("ready_pointer");
					}
				}
				if(origBoard.includes(aiPlayer)){
					if(bingo_bonus>=1){
						xtoo_btn.disabled = false;
					}else{
						xtoo_btn.disabled = true;
					}
				}else{
					xtoo_btn.disabled = true;
				}
				if(bingo_bonus<1){
					xtoo_btn.disabled = true;
					x_ex_o_btn.disabled = true;
				}
				return
			}
			//新
			if(x_ex_o_mode){
				if( x_ex_o_step === 1 ){
					x_ex_o_step1 = square.target.id
					cells[square.target.id].classList.add("x_ex_o_pointer_none");
					for (var i = 0; i < origBoard.length; i++) {
						if(origBoard[i] == huPlayer){
						cells[i].classList.add("ready_pointer");
						cells[i].classList.remove("ooxx_pointer_none");
						}else if(origBoard[i] == aiPlayer){
						cells[i].classList.remove("ready_pointer");
						cells[i].classList.add("ooxx_pointer_none");
						}
					} 
					x_ex_o_step = 2
					$("#game-notify-text").text("再選擇要交換的O項目。"); 
					return
				}
				if( x_ex_o_step === 2 ){
					x_ex_o_step2 = square.target.id
					cells[square.target.id].classList.add("x_ex_o_pointer_none");
					origBoard[x_ex_o_step1] = huPlayer;
					document.getElementById(x_ex_o_step1).innerText = huPlayer;
					turn(x_ex_o_step2, aiPlayer);
					for (var i = 0; i < origBoard.length; i++) {
						if(typeof origBoard[i] == 'number'){
							cells[i].classList.remove("ooxx_pointer_none");
						}else if(origBoard[i] == winPlayer){
							cells[i].classList.remove("ooxx_pointer_none");
							cells[i].classList.remove("ready_pointer");
						}else if(origBoard[i] == huPlayer){
							cells[i].classList.remove("ooxx_pointer_none");
							cells[i].classList.remove("ready_pointer");
						}else if(origBoard[i] == aiPlayer){
							cells[i].classList.remove("ooxx_pointer_none");
							cells[i].classList.remove("ready_pointer");
						}
						
						if(cells[i].classList.contains("x_ex_o_pointer_none")){
							cells[i].classList.remove("x_ex_o_pointer_none");
						}
					}
					x_ex_o_step = 1
					x_ex_o_mode = false
					if(origBoard.includes(aiPlayer)&&origBoard.includes(huPlayer)){
						if(bingo_bonus>=1){
							x_ex_o_btn.disabled = false;
						}else{
							x_ex_o_btn.disabled = true;
						}
					}else{
						x_ex_o_btn.disabled = true;
					}
					if(bingo_bonus<1){
						xtoo_btn.disabled = true;
						x_ex_o_btn.disabled = true;
					}
					return
				}
			}
			if (typeof origBoard[square.target.id] == 'number') {
				
				$('.game4_input').val('');
				$("#game4_popup").css("display","block");
				$('.game4_title').html('<p>'+ game4Array[targetId].title+'</p>')
				$("#game4_popup_img").html('<img  src="images/' + game4Array[targetId].img + '"/>')
			}
			// if (typeof origBoard[square.target.id] == 'number') {
			// 	turn(square.target.id, huPlayer);
			// 	if (!checkTie()) turn(bestSpot(), aiPlayer); 
			// }
		}

		function submitClick(targetId) {
			$("#game4_popup").css("display","none");
			// console.log($("input[type=text][name=username]").val(''))
			// console.log(document.getElementById("username").value)
			if (typeof origBoard[targetId] == 'number') {
				turn(targetId, huPlayer);
				// if (!checkTie()) turn(bestSpot(), aiPlayer);
			}
			$('#alertModalMessage').html("很棒!答對了!")
			$('#alertModal').modal({backdrop: 'static', keyboard: false})
			logFile.push(game4_time + "秒-------------->提交答案-答題正確(s)\n")
			logFileSimple.push("s")
			db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->提交答案-答題正確(s)");
			remain = 3
			$("#game4_remain").text(remain)
		}

		function turn(squareId, player) {
			origBoard[squareId] = player;
			document.getElementById(squareId).innerText = player;
			let gameWon = checkWin(origBoard, player);
			// if (gameWon) gameOver(gameWon);
			if(origBoard.includes(aiPlayer)&&origBoard.includes(huPlayer)){
				if(bingo_bonus>=1){
					$("#xtoo_btn").attr('disabled', false);
					$("#x_ex_o_btn").attr('disabled', false);
					$("#game-notify-text").text("適當時機，可以使用3次機會的輔助功能，幫助你有效得到賓果線。");
				}else{
					$("#xtoo_btn").attr('disabled', true);
					$("#x_ex_o_btn").attr('disabled', true);
					$("#game-notify-text").text("請點選1項方格，並回答該方格的問題，若達成賓果線，即可得分。");
				}
			}
			if(!origBoard.includes(aiPlayer)){
				$("#x_ex_o_btn").attr('disabled', true);
			}
			if(origBoard.includes(aiPlayer)&&bingo_bonus>=1){
				$("#xtoo_btn").attr('disabled', false);
			}
		}

		function checkWin(board, player) {
			// console.log(board)
			let plays = board.reduce((a, e, i) =>(e === huPlayer) ? a.concat(i) : a, []); //e:element []:축적할 배열
			// console.log("plays",plays)

			
			// let gameWon = null;
			let gameWon = [];
			// console.log("winCombos.entries()", winCombos.entries())
			for (let [index, win] of winCombos.entries()) {
				// if (win.every(elem => plays.indexOf(elem) > -1)) {
				// 	gameWon = {index: index, player: player};
				// 	console.log("www",winCombos)
				// 	console.log("gameWon",gameWon)
				// 	break;
				// }

				if (win.every(elem => plays.indexOf(elem) > -1)) {
					var aaa = {
						index: index, player: huPlayer
					}
					gameWon.push(aaa)
					// console.log("gameWongameWongameWon",gameWon)
					for (var i = 0; i < winCombos[index].length; i++) {
						var bbb = winCombos[index][i]
						document.getElementById(bbb).style.backgroundColor = "#55d6c1"
					}

					// gameWon = {index: index, player: huPlayer};
					score4+= 75
					bingo_line ++
					$('#game_score').html(score4);
					$('#bingo_line').html(bingo_line);
					logFile.push(game4_time + "秒-------------->得到賓果線(r)\n")
					logFileSimple.push("r")
					db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->得到賓果線(r)");
					winCombos.splice(index, 1);
					// console.log("www",winCombos);
					// console.log("score4",score4);
					// return gameWon;
				}
			}
			if(bingo_line>=4){
				clearInterval(interval);
				$('#nextModalMessage').html("恭喜得到4條賓果線\n遊戲結束\n</br>即將進入下一關遊戲")
				$('#nextModal').modal({backdrop: 'static', keyboard: false}) 
				// alert("第二關遊戲結束");
				logFile.push("遊戲分數:" + score4 + "\n")
				logFile.push("此關遊戲得分:" + (score4-game_score) + "\n")
      			logFile.push("此關花費時間:" + (900-game4_time) + "\n")
				logFile.push("第三關遊戲結束-全部題目作答完(e)\n")
				logFile.push("\n")
				logFileSimple.push("e")
				db.ref(fullDbUrl+"Detail").push("遊戲分數:" + score4);
				db.ref(fullDbUrl+"Detail").push("此關遊戲得分:" + (score4-game_score));
				db.ref(fullDbUrl+"Detail").push("此關花費時間:" + (900-game4_time));
				db.ref(fullDbUrl+"Detail").push("第三關遊戲結束-全部題目作答完(e)");
				// db.ref(fullDbUrl+"Simple3").push(logFileSimple);
				$('#nextModal').on('hidden.bs.modal', function (e) {
				  $('#game4').css('display', 'none');
				  game5s(score4)
				});
			}
			// console.log("gameWon",gameWon)
			// return gameWon;
			// return 111
		}

		// 新
		function xtoo() {
			if(origBoard.includes(aiPlayer)){
				if(bingo_bonus>=1){
					xtoo_btn.disabled = false;
					xtoo_mode = true
					bingo_bonus -= 1
					if(bingo_bonus >= 1){
						$('#op_line').html(bingo_bonus)
					}else{
						bingo_bonus = 0
						$('#op_line').html(0)
					}
					for (var i = 0; i < origBoard.length; i++) {
						if(typeof origBoard[i] == 'number'){
							cells[i].classList.add("ooxx_pointer_none");
						}else if(origBoard[i] == huPlayer){
							cells[i].classList.add("ooxx_pointer_none");
						}else if(origBoard[i] == aiPlayer){
							cells[i].classList.add("ready_pointer");
						}
					}
					$("#game-notify-text").text("請選擇1個X項目，該項目即可變成O。");     
				}
			}
		}
		$('#xtoo_btn').on( "click", function() {
			logFile.push(game4_time + "秒-------------->X變成O按鈕(i)\n")
			logFileSimple.push("i")
			db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->X變成O按鈕(i)");
			xtoo()
		});
		
		// 新
		function x_ex_o() {
			if(origBoard.includes(aiPlayer)&&origBoard.includes(huPlayer)){
				if(bingo_bonus>=1){
					x_ex_o_btn.disabled = false;
					x_ex_o_mode = true
					bingo_bonus -= 1
					if(bingo_bonus >= 1){
						$('#op_line').html(bingo_bonus)
					}else{
						bingo_bonus = 0
						$('#op_line').html(0)
					}
					for (var i = 0; i < origBoard.length; i++) {
						if(typeof origBoard[i] == 'number'){
							cells[i].classList.add("ooxx_pointer_none");
						}else if(origBoard[i] == winPlayer){
							cells[i].classList.add("ooxx_pointer_none");
						}else if(origBoard[i] == huPlayer){
							cells[i].classList.add("ooxx_pointer_none");
						}else if(origBoard[i] == aiPlayer){
							cells[i].classList.add("ready_pointer");
						}
					}  
					$("#game-notify-text").text("請先選擇要交換的X項目。");        
				}
			}
		}
		$('#x_ex_o_btn').on( "click", function() {
			logFile.push(game4_time + "秒-------------->X與O交換按鈕(x)\n")
			logFileSimple.push("x")
			db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->X與O交換按鈕(x)");
			x_ex_o()
		});
		

		function gameOver(gameWon) {
			// console.log("gameWongameWongameWongameWon",gameWon)
			for (let index of winCombos[gameWon.index]) {
				document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
			}
			for(var i = 0; i < cells.length; i++) {
				cells[i].removeEventListener('click', turnClick, false);
			}
			declareWinner(gameWon.player == huPlayer ? "闖關成功!" : "闖關失敗!");
		}

		function declareWinner(who) {
			document.querySelector(".endgame").style.display = "block";
			document.querySelector(".endgame .text").innerText = who;
		}

		function emptySquares() {
			return origBoard.filter(s => typeof s == 'number');
		}

		function bestSpot() {
			return emptySquares()[0];
		}

		function checkTie() {
			// if (emptySquares().length == 0) {
			// 	for (var i = 0; i < cells.length; i++) {
			// 		cells[i].style.backgroundColor = "green";
			// 		cells[i].removeEventListener('click', turnClick, false);
			// 	}
			// 	declareWinner("Tie Game!");
			// 	return true;
			// }
			return false;
		}


		$('#game4_cancel').on( "click", function() {
			logFile.push(game4_time + "秒-------------->放棄按鈕(g)\n")
			logFileSimple.push("g")
			db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->放棄按鈕(g)");
			$("#game4_popup").css("display","none");
		});

		$('#game4_submit').on( "click", function() {
			remain--
			$("#game4_remain").text(remain)
			if(remain>0){
				if($("input[type=text][name=username]").val()===game4Array[targetId].answer){
					$("input[type=text][name=username]").val('')
					submitClick(targetId)
				}else{
					$("input[type=text][name=username]").val('')
					$('#alertModalMessage').html("答錯了!")
					$('#alertModal').modal({backdrop: 'static', keyboard: false})
					logFile.push(game4_time + "秒-------------->提交答案-答題錯誤(w)\n")
					logFileSimple.push("w")
					db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->提交答案-答題錯誤(w)");
				}
			}else if(remain==0){
				if($("input[type=text][name=username]").val()===game4Array[targetId].answer){
					$("input[type=text][name=username]").val('')
					submitClick(targetId)
				}else{
					$("input[type=text][name=username]").val('')
					$('#alertModalMessage').html("答錯了!")
					$('#alertModal').modal({backdrop: 'static', keyboard: false})
					logFile.push(game4_time + "秒-------------->提交答案-答題錯誤(w)\n")
					logFileSimple.push("w")
					db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->提交答案-答題錯誤(w)");
					remain = 3
					$("#game4_remain").text(remain)
					$("#game4_popup").css("display","none");
					turn(targetId, aiPlayer);
				}
			}else{
				$("input[type=text][name=username]").val('')
				$('#alertModalMessage').html("答錯了!")
				$('#alertModal').modal({backdrop: 'static', keyboard: false})
				logFile.push(game4_time + "秒-------------->提交答案-答題錯誤(w)\n")
				logFileSimple.push("w")
				db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->提交答案-答題錯誤(w)");
				remain = 3
				$("#game4_remain").text(remain)
				$("#game4_popup").css("display","none");
				turn(targetId, aiPlayer);
			}
		});

		$('.game4_input').focus(function() {

		});

		var synth = window.speechSynthesis;

		var inputForm = document.querySelector('form');
		var inputTxt = document.getElementById("answer");

		var voices = [];
		function populateVoiceList() {
			voices = synth.getVoices().sort(function (a, b) {
				const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
				if ( aname < bname ) return -1;
				else if ( aname == bname ) return 0;
				else return +1;
			});
		}

		populateVoiceList();
		if (speechSynthesis.onvoiceschanged !== undefined) {
			speechSynthesis.onvoiceschanged = populateVoiceList;
		}
		function speak(){
			if (synth.speaking) {
				console.error('speechSynthesis.speaking');
				return;
			}
			if (inputTxt.value !== '') {
				var utterThis = new SpeechSynthesisUtterance(game4_answer_voice);
				utterThis.onend = function (event) {
					// console.log('SpeechSynthesisUtterance.onend');
				}
				utterThis.onerror = function (event) {
					console.error('SpeechSynthesisUtterance.onerror');
				}

				utterThis.voice = voices[20];
				utterThis.pitch = 1;
				utterThis.rate = 0.7;
				synth.speak(utterThis);
			}
		}		

		$('#play').on( "click", function(e) {
			game4_answer_voice = game4Array[targetId].voice
			logFile.push(game4_time + "秒-------------->發音按鈕(v)\n")
			logFileSimple.push("v")
			db.ref(fullDbUrl+"Detail").push(game4_time + "秒-------------->發音按鈕(v)");
			e.preventDefault();

			speak();

			$("input[type=text][name=username]").blur();
		});
    
    startGame();

};