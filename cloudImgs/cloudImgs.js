
$(function(){ 
	var cloudImg = `
		<div class="cloudImgs">
			<p class="icon-list">
				<span class="easyui-linkbutton span-icon span-add" iconCls="icon-add"></span>
				<span class="easyui-linkbutton span-icon span-less" iconCls="icon-remove"></span>
			</p>
			<span class="easyui-linkbutton span-icon span-cancel" iconCls="icon-clear"></span>
			<div id="dg" title="卫星云图" class="easyui-datagrid" style="width:920px;height605px;margin:200px auto;"
				toolbar="#cloudImg">
			</div>
		</div>
		<div id="cloudImg">
			<div class="img-box">
				<img id="cloud-img" src="http://www.scsweather.com/FY4ProductData/2019/04/16/FY4A_ETCC_ACHN_201904160650_min.jpg"/>
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
	$('body').append(cloudImg);
	$.parser.parse(); //对整个页面重新渲染
	var play = false, imgArray = [], dataArr = [], index = 0, timer = '' ,requestUrl = 'http://www.scsweather.com/Home/GetFy4Product?productCode=';
	$(".play-not").hover(function(){
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
	$('.span-cancel').click(function(){
		$('.cloudImgs').css('display','none');
	})
	$('.span-add').click(function(){
		zoomin();
	})
	$('.span-less').click(function(){
		zoomout();
	})
	function zoomin(){

		var myImg = document.getElementById("cloud-img");
		
		var currWidth = myImg.clientWidth;
		
		if(currWidth == 500){

    	alert("已经达到最大尺寸.");

 		} else{

                myImg.style.width = (currWidth + 50) + "px";

 		}
	}
    

        function zoomout(){

            var myImg = document.getElementById("cloud-img");

            var currWidth = myImg.clientWidth;

            if(currWidth == 50){

                alert("已经达到最小尺寸.");

			} else{

                myImg.style.width = (currWidth - 50) + "px";

 			}
        }
	
	//初始化数据
	var _url = requestUrl + '58378';
	getData(_url);
	
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
			if(index>=imgArray.length-1){
		　　　　index=0;
		　　}
		　　else{
		　　　　index++;
		　　}
		if(dataArr[index]){
			$('.play-title').text(dataArr[index].ProductTime);
		}else{
			console.log(index);
		}
		　　$(".img-box img").attr("src",imgArray[index]);
		},600);
	}
	function changeImgs(){
		$('.play-title').text(dataArr[index].ProductTime);
		$(".img-box img").attr("src",imgArray[index]);
	}
}); 