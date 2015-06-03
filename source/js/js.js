// JavaScript Document
var spplierFed={
	/*
	*hover 顶部菜单
	*/
	top_menuHover:function(){
		$(".userinfo_mer").hover(function(){
			$(this).css("z-index","100").find(".mer_oprate").show();
			$(this).parent().css("z-index","100");
		},function(){
			$(this).css("z-index","1").find(".mer_oprate").hide();
			$(this).parent().css("z-index","1");
		})
	},
	/*leftNavFixed:function(){
		function boxHeight(){
			var distance=196;
			if($(this).scrollTop()>100){
				distance=96;
			}else{
				distance=196-$(this).scrollTop();
			}
			console.log(distance)
			var sreenHeight = document.documentElement.clientHeight;
			var list =sreenHeight - $(".options_entry").outerHeight(true)-distance;
			$(".online_voice").height(list+"px");
		}
		boxHeight();
		window.onresize =boxHeight;
		$(window).scroll(function() {
			var fixBox = $(".chain_left_cont");
			var bartop = $(this).scrollTop();
			boxHeight();
			if(bartop>100){
				fixBox.addClass("left_cont_fixed");
			}else{
				fixBox.removeClass("left_cont_fixed");
			}
		});
	},*/
	funLoad:function(){
		this.top_menuHover();
		//this.leftNavFixed();

	}
}
$(function(){
	spplierFed.funLoad();
})