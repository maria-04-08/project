
$(function(){ 
	var cloudImg = `
		<div class="cloudImgs">
			<span class="easyui-linkbutton span-icon span-cancel" iconCls="icon-clear"></span>
			<div id="dg" title="卫星云图" class="easyui-datagrid" style="width:920px;height:auto;"
				toolbar="#cloudImg">
			</div>
		</div>
		<div id="cloudImg">
			<div class="img-box">
				<img id="cloud-img" src=""/>
			</div>
			<div class="play-bar">
				<div class="play-bar-left">
					<select class="pagination-page-list product-select">
						<option value="58378">真彩</option>
						<option value="58379">红外</option>
						<option value="58380">可见光</option>
						<option value="58381">水汽</option>
					</select>
				</div>
				<div class="play-bar-right">
					<p class="play-not"></p>
					<p class="play-rewind"></p>
					<p class="play-fastForward"></p>
					<span class="play-title"></span>
				</div>
			</div>
		</div>`;
	$('.cloudImg-box').append(cloudImg);
	$.parser.parse(); //对整个页面重新渲染
	
	var play = false, imgArray = [], dataArr = [], index = 0, timer = '' ,
	requestUrl = 'http://www.scsweather.com/Home/GetFy4Product?productCode=';
	
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
		if(index == 0 || index < 0) return;
		index = (index - 2) < 0? index : index -2;
		if(play){ //开始播放
			
		}else{
			changeImgs();
		}
	})
	//点击前进图标
	$(".play-fastForward").click(function(){
		if(index >= dataArr.length ) return;
		index = (index + 1) > dataArr.length ? 0 : index + 1;
		if(play){ //开始播放
			
		}else{
			changeImgs();
		}
	})
	
	//点击关闭图标
	$('.span-cancel').click(function(){
		$('.cloudImg-box').css('display','none');
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
		},600);
	}
	//切换图片
	function changeImgs(){
		$('.play-title').text(dataArr[index].ProductTime);
		$(".img-box img").attr("src",imgArray[index]);
	}
}); 