
$(function(){ 
	
	$.parser.parse(); //对整个页面重新渲染
	var play = false, imgArray = [], dataArr = [], index = 0, timer = '' ,
	requestUrl = 'http://www.scsweather.com/Home/GetFy4Product?productCode=';
	
	//展示卫星云图
	$('.Hold-all-item').click(function(){
		$('.cloud-box').css('display','block');
	})
	
	//hover效果
	elHover(0,$(".play-not"),'0 -50px','0 -302px','0 0','0 -252px');
	elHover(1,$(".play-rewind"),'0 -220px','0 -188px');
	elHover(1,$(".play-fastForward"),'0 -132px','0 -100px');
	
	//点击播放图标
	$(".play-not").click(function(){
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
	
	//点击后退图标
	$(".play-rewind").click(function(){
		if(index == 0 || index < 0){
			index = dataArr.length;
		}else{
			index = (index - 2) < 0? index : index -2;
		}
		if(play){ //开始播放
			
		}else{
			changeImgs();
		}
	})
	//点击前进图标
	$(".play-fastForward").click(function(){
		if(index >= dataArr.length ){
			index = 0;
		} else{
			index = (index + 1) > dataArr.length ? 0 : index + 1;
		}
		if(play){ //开始播放
			
		}else{
			changeImgs();
		}
	})
	
	//点击关闭图标
	$('.span-cancel').click(function(){
		$('.cloud-box').css('display','none');
	})
	
	function elHover(num,el,position1,position2,position3,position4){
		el.hover(function(){
			if(num == 0){
				if(play){ //暂停
					el.css('background-position',position1);
				}else{ //播放开始 
					el.css('background-position',position2);
				}
			}else{
				el.css('background-position',position1);
			}
			
		},function(){
			if(num == 0){
				if(play){ //暂停
					el.css('background-position',position3);
				}else{ //播放开始
					el.css('background-position',position4);
				}
			}else{
				el.css('background-position',position2);
			}
			
		});
	}
	
	//初始化数据
	var _url = requestUrl + '58378';
	getData(_url);
	
	//boostrap下拉框选择
	$('.play-bar').click(function(e){
		var target = $(event.target)
		if(target.is($('a'))){
			$('.dropup button .text').text(target.text());
			var attr = target.attr('id');
			_url = requestUrl + attr;
			play = false;
			$('.play-not').css('background-position','0 -252px');
			getData(_url);
			clearInterval(timer);
			index = 0;
		}
	})
	
	//选择不同产品加载数据
	$('.product-select').change(function(){ 
		var productCode =$(this).children('option:selected').val();//这就是selected的值 
		_url = requestUrl + productCode;
		play = false;
		$('.play-not').css('background-position','0 -252px');
		getData(_url);
		clearInterval(timer);
		index = 0;
	});
	function getData(url){
		$.get(url,function(data){
			dataArr = data;
			imgArray = [];
			// console.log('返回数据--'+JSON.stringify(data));
			for(var i=0;i<data.length;i++){
				data[i].ProductUrl = 'http://www.scsweather.com/' + data[i].ProductUrl;
				imgArray.push(data[i].ProductUrl);
			}
			$('.play-title').text(dataArr[0].ProductTime);
			$(".img-box img").attr("src",imgArray[0]);
		});
	}
	//播放图片
	function playImgs(){
		timer = setInterval(function(){
			if(index>=imgArray.length-1){
		　　　　index=0;
		　　}
		　　else{
		　　　　index++;
		　　}
			if(dataArr[index]){
				$('.play-title').text(dataArr[index].ProductTime);
			}else{
			}
		　　$(".img-box img").attr("src",imgArray[index]);
		},2000);
	}
	//切换图片
	function changeImgs(){
		if(dataArr[index]){
			$('.play-title').text(dataArr[index].ProductTime);
		}
		$(".img-box img").attr("src",imgArray[index]);
	}
}); 