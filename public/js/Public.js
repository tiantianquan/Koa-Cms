$(function(){	
	$(".nav ul .li").append("<span></span>");
	$(".nav ul .li").click(function(ii){
		var ii = $(this).index();
		$(this).find("span").show().parent().addClass("on").siblings().removeClass("on").find("span").hide();
		ShowMenu(ii)
	});
	$(".navClick").click(function(){
		$("body").toggleClass("body_Skin");
		$(".nav ul .li").removeClass("on");
		$(".menu,.menu ul").hide();
		$(".addBody_Skin").removeClass("addBody_Skin");
		
	});
	function ShowMenu(ind){
		var Null = $(".menu ul").eq(ind).text();
		$(".menu").fadeIn("fast");
		if(Null != " "){
			$("body").addClass("addBody_Skin");
		}
		$(".menu ul").eq(ind).show().siblings().hide();
	};
	
	// 添加wechat二维码
	(function Wechat(){
		<!--$("body").append("<div class=\"screen\"><div>");-->
		<!--$("body").append("<div class=\"screen_wechat\"><div>");-->
		var _wechat = $(".wechat");
		var _screen = $(".screen");
		var _screenWechat = $(".screen_wechat");
		_wechat.on('click',function(){
			_screen.fadeIn(350,function(){
				_screenWechat.css({"opacity":1,"transform":"scale(1,1)","transition":"all .5s cubic-bezier(0.86, 0, 0.07, 1) 0s","-webkit-transform":"scale(1,1)","-webkit-transition":"all .5s cubic-bezier(0.86, 0, 0.07, 1) 0s"});
			});
		});
		_screenWechat.on('click',function(){
			$(this).css({"opacity":0,"transform":"scale(1,0)","transition":"all .5s cubic-bezier(0.86, 0, 0.07, 1) 0s","-webkit-transform":"scale(1,0)","-webkit-transition":"all .5s cubic-bezier(0.86, 0, 0.07, 1) 0s"});
			_screen.fadeOut(350);
		});
	})()
	
});

$(window).load(function(){
	$.index.popHeight();
	//Page();
})
/*$(window).resize(Page);*/


$.index = {
	//首页产品图
	popHeight : function(){
		$(window).on("resize",function(){
			var sHeight = $(".popR-1 img").height();
			$(".popL-1 a").height(sHeight);
		})
		var sHeight = $(".popR-1 img").height();
		$(".popL-1 a").height(sHeight);
		//alert("a")
	}
};


/*function Page(){
	var windowHeight = $(window).height();
	$(".Pmain").parent().height(windowHeight);
};*/



function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}










