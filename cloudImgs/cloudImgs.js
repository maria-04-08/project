
$(function(){ 
	var play = false, imgArray = [], dataArr = [], index = 0, timer = '' ,requestUrl = 'http://www.scsweather.com/Home/GetFy4Product?productCode=';
	$(".play-no").hover(function(){
		if(play){ //暂停
			$('.play-not').css('background-position','0 -50px');
		}else{ //播放开始 
			$('.play-not').css('background-position','0 -302px');
		}
	},function(){
		if(play){ //暂停
			$('.play-not').css('background-position','0 0px');
		}else{ //播放开始
			$('.play-not').css('background-position','0 -252px');
		}
	});
	$(".play-rewind").hover(function(){
		$('.play-rewind').css('background-position','0 -220px');
	},function(){
		$('.play-rewind').css('background-position','0 -188px');
	});
	$(".play-fastForward").hover(function(){
		$('.play-fastForward').css('background-position','0 -132px');
	},function(){
		$('.play-fastForward').css('background-position','0 -100px');
	});
	
	$(".play-not").click(function(){
		console.log('播放---'+ index);
		if(play){ //暂停
			$('.play-not').css('background-position','0 -302px');
			clearInterval(timer);
		}else{ //播放开始
			$('.play-not').css('background-position','0 -50px');
			if(index > 0 ){
				clearInterval(timer);
				
			}
			playImgs();
		}
		play = !play;
	})
	
	$(".play-rewind").click(function(){
		if(index == 0 || index < 0) return;
		index = (index - 2) < 0? index : index -2;
		if(play){ //开始播放
			
		}else{
			changeImgs();
		}
	})
	$(".play-fastForward").click(function(){
		if(index >= dataArr.length ) return;
		index = (index + 1) > dataArr.length ? 0 : index + 1;
		if(play){ //开始播放
			
		}else{
			changeImgs();
		}
	})
	
	
	
	//初始化数据
	var _url = requestUrl + '58378';
	getData(_url);
	
	$('.product-select').change(function(){ 
		var productCode =$(this).children('option:selected').val();//这就是selected的值 
		_url = requestUrl + productCode;
		getData(_url);
		clearInterval(timer);
		index = 0;
	});
	function getData(url){
		$.get(url,function(data){
			dataArr = data;
			// console.log('返回-----'+JSON.stringify(data));
			imgArray = [];
			for(var i=0;i<data.length;i++){
				data[i].ProductUrl = 'http://www.scsweather.com/' + data[i].ProductUrl;
				imgArray.push(data[i].ProductUrl);
			}
			$('.play-title').text(dataArr[0].ProductTime);
			$(".img-box img").attr("src",imgArray[0]);
		});
	}
	function playImgs(){
		timer = setInterval(function(){
			// console.log('data=---------'+dataArr[index].ProductTime);
		　　if(index>=imgArray.length){
		　　　　index=0;
		　　}
		　　else{
		　　　　index++;
		　　}
			$('.play-title').text(dataArr[index].ProductTime);
			　　$(".img-box img").attr("src",imgArray[index]);
			},600);
	}
	function changeImgs(){
		$('.play-title').text(dataArr[index].ProductTime);
		$(".img-box img").attr("src",imgArray[index]);
	}
}); 