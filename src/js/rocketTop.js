$(function () {
	
var x=$(window);
var e=$("#shape");
$('body').prepend(`
	<div id="shape">
	<div class="shapeColor">
	<div class="shapeFly">
	</div>
	</div>
	</div>
`)
$("html,body").ready(function(){
	var scrollbar=x.scrollTop();
	var isClick=0;

	(scrollbar<=0)?($("#shape").hide()):($("#shape").show());

	$(window).scroll(function(){
		scrollbar=x.scrollTop();
		(scrollbar<=0)?($("#shape").hide()):($("#shape").show());			
	})

	// $('body').on('hover', '#shap', function () {
	// 		$(".shapeColor").show();
	// 		$(".shapeColor").hide();

	// })
	$("#shape").hover(
		function(){
			$(".shapeColor").show();
		},

		function(){
			$(".shapeColor").hide();
		}
	)

	$(".shapeColor").click(
		function(){
			$(".shapeFly").show();
			$("html,body").animate({scrollTop: 0},"slow");
			$("#shape").delay("200").animate({marginTop:"-1000px"},"slow",function(){
				$("#shape").css("margin-top","-125px");
				$(".shapeFly").hide();
			});
			
	})

})
})