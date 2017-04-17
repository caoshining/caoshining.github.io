$('#carousel-example-schools').carousel({
	interval:3000
});
//移动端左右滑动轮播
$(function(){
	var school = document.getElementById('carousel-example-schools');
	var sc = new Hammer(school);
	sc.on('swipeleft',function(){
		$('#carousel-example-schools').carousel('next');
	});
	sc.on('swiperight',function(){
		$('#carousel-example-schools').carousel('prev');
	})
});
var map = new BMap.Map('map');
map.centerAndZoom(new BMap.Point(121.55,31.282),16);
var local = new BMap.LocalSearch(map,{
	// renderOptions:{map:map},
	pageCapacity: 1,//显示数量
});
var top_left_navigation = new BMap.NavigationControl();
map.addControl(top_left_navigation);
local.search('上海电力学院国家大学科技园');
local.setSearchCompleteCallback(callBack);//返回结果的回调函数
function callBack(){
	if (local.getStatus() == BMAP_STATUS_SUCCESS){
		var results = local.getResults();
		// console.log(results);
		// console.log(results.wr[0].point.lng);
		var marker = new BMap.Marker(new BMap.Point(results.wr[0].point.lng,results.wr[0].point.lat));
		map.addOverlay(marker);
	}
}
//点击滚动跳转
var navHeight = parseInt($('.navbar').css('height'));
var aboutUsTop = $('.about').offset().top - navHeight,
xiaoanOnlineTop = $('#xiaoanOnline').offset().top - navHeight,
xiaoanOnschoolTop = $('.xiaoanOnschool').offset().top - navHeight,
enterpriseCultureTop = $('.enterpriseCulture').offset().top - navHeight,
teamTop = $('.team').offset().top - navHeight,
contactUsTop = $('.contactUs').offset().top - navHeight;
var pros = [aboutUsTop,xiaoanOnlineTop,xiaoanOnschoolTop,enterpriseCultureTop,teamTop,contactUsTop];
var _li = $('.nav li');

for(var i=0;i<_li.size();i++){
	_li.eq(i).click(function(){
		var navbarHeight = $('.navbar-collapse').css('height');
		$('html,body').animate({'scrollTop':pros[$(this).index()]},500);
		if(document.body.clientWidth <768 && navbarHeight=="247px"){//移动端导航栏显示/隐藏
			$('.navbar-collapse').removeClass('in');
		}
	})
}

//图片滚动 调用方法 imgscroll({speed: 30,amount: 1,dir: "up"});
$.fn.imgscroll = function(o){
	var defaults = {
		speed: 40,
		amount: 0,
		width: 1,
		dir: "left"
	};
	o = $.extend(defaults, o);
	
	return this.each(function(){
		var _li = $("li", this);
		_li.parent().parent().css({overflow: "hidden", position: "relative"}); //div
		_li.parent().css({margin: "0", padding: "0", overflow: "hidden", position: "relative", "list-style": "none"}); //ul
		_li.css({position: "relative", overflow: "hidden"}); //li
		if(o.dir == "left") _li.css({float: "left"});
		
		//初始大小
		var _li_size = 0;
		for(var i=0; i<_li.size(); i++)
			_li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);
		
		//循环所需要的元素
		if(o.dir == "left") _li.parent().css({width: (_li_size*3)+"px"});
		_li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone());
		_li = $("li", this);

		//滚动
		var _li_scroll = 0;
		function goto(){
			_li_scroll += o.width;
			if(_li_scroll > _li_size)
			{
				_li_scroll = 0;
				_li.parent().css(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll });
				_li_scroll += o.width;
			}
				_li.parent().animate(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll }, o.amount);
		}
		
		//开始
		var move = setInterval(function(){ goto(); }, o.speed);
		_li.parent().hover(function(){
			clearInterval(move);
		},function(){
			clearInterval(move);
			move = setInterval(function(){ goto(); }, o.speed);
		});
	});
};
//无缝滚动
$(".imgs").imgscroll({
	speed: 20,    //图片滚动速度
	amount: 0,    //图片滚动过渡时间
	width: 1,     //图片滚动步数
	dir: "left"   // "left" 或 "up" 向左或向上滚动
});


