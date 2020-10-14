/*
@功能：商品页js
@作者：diamondwang
@时间：2013年11月13日
*/
$(function () {
	let token = sessionStorage.getItem('token')
	//商品缩略图左右移动效果
	//点击后退
	// $("#backward").click(function(){
	// 	var left = parseInt($(".smallpic_wrap ul").css("left")); //获取ul水平方向偏移量
	// 	var offset = left + 62;
	// 	if (offset <= 0){
	// 		$(".smallpic_wrap ul").stop(true,false).animate({left:offset},"slow",'',function(){
	// 			//动画完成之后，判断是否到了左边缘
	// 			if ( parseInt($(".smallpic_wrap ul").css("left")) >= 0 ){
	// 				$("#backward").removeClass("on").addClass("off");
	// 			}
	// 		});
	// 		//开启右边的按钮
	// 		$("#forward").removeClass("off").addClass("on");			
	// 	}
		
	// 	$(this).blur(); //去除ie 虚边框
	// });

	//点击前进
	// $("#forward").click(function(){
	// 	var left = parseInt($(".smallpic_wrap ul").css("left")); //获取ul水平方向偏移量
	// 	var len = $(".smallpic_wrap li").size() * 62; //获取图片的整体宽度(图片数 * 图片宽度)558
	// 	var offset = left - 62;
	// 	if (offset >= -(len - 62*5)){
	// 		$(".smallpic_wrap ul").stop(true,false).animate({left:offset},"slow",'',function(){
	// 			//判断是否到了右边缘
	// 			if ( parseInt($(".smallpic_wrap ul").css("left")) <= -(len - 62*5) ){
	// 				$("#forward").removeClass("on").addClass("off");
	// 			}
	// 		});
	// 		//开启左边的按钮
	// 		$("#backward").addClass("on").removeClass("off");
			
	// 	}
		
	// 	$(this).blur(); //去除ie 虚边框
	// });

	//选择货品，如颜色、版本等
	$(".product a").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		$(this).find("input").attr({checked:"checked"});
		//去除虚边框
		$(this).blur();
	});


	//购买数量
	//减少
	$("#reduce_num").click(function(){
		if (parseInt($(".amount").val()) <= 1){
			// alert("商品数量最少为1");
			swal({
				// title: 'Auto close alert!',
				type:'warning',
				text: '商品数量最少为1',
				timer: 1000,
				showConfirmButton:false
			  })
		} else{
			$(".amount").val(parseInt($(".amount").val()) - 1);
		}
	});

	//增加
	$("#add_num").click(function(){
		$(".amount").val(parseInt($(".amount").val()) + 1);
	});

	//直接输入
	$(".amount").blur(function(){
		if (parseInt($(".amount").val()) < 1){
			alert("商品数量最少为1");
			$(this).val(1);
		}
	});
	// 加入购物车效果
	$('form.choose').submit(function () {
		event.preventDefault()
		let buyNum = $(this).find('.amount').val()
		let goodsId = $(this).attr('name')
		if (token) {
			$.post('/api/v1/cart/create.jsp', { buyNum, goodsId, token }, (res) => {
				if (res.meta.state == 201) {
					swal({
						title: '添加成功',
						text: '是否去购物车',
						type: 'success',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: '确认',
						cancelButtonText: '取消'
					}).then(function(isConfirm) {
						if (isConfirm) {
						sessionStorage.setItem('net',location.href)
					   location.href=`./flow1.html?token=${sessionStorage.getItem('token')}`
					  }
					})
				}
				else {
					console.log(222)
					swal({
						title: res.meta.msg,
						type: 'error',
						confirmButtonText: '确认',
						confirmButtonColor: '#d33',
					})
				}
			},'json')
		}
		else {
			swal({
		   		title: '您尚未登陆',
		   		text: '是否去登陆',
				type: 'error',
				showCancelButton: true,
		   		confirmButtonColor: '#3085d6',
		   		cancelButtonColor: '#d33',
		   		confirmButtonText: '确认',
		   		cancelButtonText: '取消'
			}).then(function(isConfirm) {
				if (isConfirm) {
				// 保存下当前地址便于登陆跳转
			   localStorage.setItem('net',location.href)
					setTimeout(function () {
						location.href='./login.html'
			},300)
			  }
			})
		}
	})
	//商品详情效果
	$(".detail_hd li").click(function(){
		$(".detail_div").hide().eq($(this).index()).show();
		$(this).addClass("on").siblings().removeClass("on");
	});

	// 打开页面获取数据，跟新页面数据
	let goodsId = getParams('id')
	$.get('/api/v1/goods/detail.jsp', { goodsId }, (res) => {
		console.log(res)
		// 给form标签加个商品id
		$('form.choose').attr('name', res.data.goods_id)
		$('.breadcrumb h2 span').html(`>&nbsp;${res.data.goods_name}`)
		$('.summary h3 strong').text(res.data.keywords)
		$('.goodsinfo ul:eq(0)').html(`<li><span>商品编号： </span>${res.data.goods_sn}</li>
		<li class="market_price"><span>定价：</span><em>￥${res.data.market_price}</em></li>
		<li class="shop_price"><span>本店价：</span> <strong>￥${res.data.shop_price}</strong> <a href="">(降价通知)</a></li>
		<li><span>上架时间：</span>${res.data.add_time}</li>
		<li class="star"><span>商品评分：</span> <strong></strong><a href="">${res.data.sort_order})</a></li>`)
		$('.add_btn').attr('goodsId', goodsId)
		let liHtml = ''
		$.each(res.data.imgs, (index, item) => {
			liHtml += `
			<li><img src='http://tmp00001.zhaodashen.cn/${item.img_url}'> </li>
			`
		})
		$('.preview').html(`
		<div id=preview style="margin: 0;">
			<div class=jqzoom id=spec-n1>
				<img height=350 src="http://tmp00001.zhaodashen.cn/${res.data.goods_img}"jqimg="http://tmp00001.zhaodashen.cn/${res.data.goods_img}" width=350>
			</div>
			<div id=spec-n5>
				<div class=control id=spec-left>
					<img src="../images/left.gif" />
				</div>
				<div id=spec-list>
					<ul class=list-h>
						${liHtml}
					</ul>
				</div>
				<div class=control id=spec-right>
					<img src="../images/right.gif" />
				</div>
			</div>
		</div>
		`)
		big()
		$.get('/api/v1/category/attr.jsp', { cat: res.data.cat_id }, (res) => {
			console.log(res)
			$.each(res.data, (index, item) => {
				if (item.attr_name == '颜色') {
					let colorArr = item.attr_value.split(',')
					let colorHtml=''
					// console.log(colorArr)
					$.each(colorArr, (index2, item2) => {
						if (index2 == 0) {
							colorHtml += `<a class="selected" href="javascript:;">${item2} <input type="radio" name="color" value="${item2}" checked="checked" /></a>`
						}
						else {
							colorHtml +=`<a href="javascript:;">${item2}<input type="radio" name="color" value="${item2}" /></a>`
						}
					})
					$('.choose ul li').eq(0).find('dd').prepend(colorHtml)
				}
				else if (item.attr_name == '屏幕大小') {
					let sizeArr = item.attr_value.split(',')
					let sizeHtml=''
					$.each(sizeArr, (index3, item3) => {
						if (index3 == 0) {
							sizeHtml += `<a class="selected" href="javascript:;">${item3}<input type="radio" name="ver" value="" checked="checked" /></a>`
						}
						else {
							sizeHtml +=`<a href="javascript:;">${item3}<input type="radio" name="ver" value=""  /></a>`
						}
					})
					$('.choose ul li').eq(1).find('dd').prepend(sizeHtml)
				}
			})
			// 设置点击选颜色
			$('.product').on('click','a',function () {
				$(this).parents('dd').find('a').removeClass()
				$(this).parents('dd').find('a input').prop('checked', false)
				$(this).find('input').prop('checked', true)
				$(this).addClass('selected')
				})
		},'json')
	}, "json")

		// 替换最近浏览过的商品，最多显示2行
	// if (sessionStorage.getItem('seeHistory')) {
	// 	$('.viewd .leftbar_wrap').html('<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2529284978,3206556674&fm=26&gp=0.jpg" style="width:100%;height:100%"/>')
	// 	let viewdHtml=''
	// 	let hisArr = JSON.parse(sessionStorage.getItem('seeHistory'))
	// 	for(let i=0;i<hisArr.length;i++){
	// 	if(i<=1){
	// 		$.get('/api/v1/goods/detail.jsp',{goodsId:hisArr[i]},(res)=>{
	// 			viewdHtml+=`
	// 				<dl name=${res.data.goods_id}>
	// 					<dt><a href="./goods.html?id=${res.data.goods_id}"><img src="http://tmp00001.zhaodashen.cn/${res.data.goods_img}" alt="" /></a></dt>
	// 					<dd><a href="./goods.html?id=${res.data.goods_id}">${res.data.goods_name}</a></dd>
	// 				</dl>
	// 						`	
	// 			$('.viewd .leftbar_wrap').html(viewdHtml)
	// 		},"json")}
	// 		else{
	// 			break
	// 	}
	// }
	// }
	
	$('.viewd .leftbar_wrap').on('click','dl',function(){
		seeHistory($(this).attr('name'))
	})
	
});

$('.choose').on('click','a',function () {
	console.log(1)
	$(this).parents('dd').find('a').removeClass
	$(this).parents('dd').find('a input').prop('checked', false)
	$(this).find('input').prop('checked', true)
	$(this).addClass('selected')
	})
function big() {
	$(".jqzoom").jqueryzoom({
		xzoom:400,
		yzoom:400,
		offset:10,
		position:"right",
		preload:1,
		lens:1
	});
	$("#spec-list").jdMarquee({
		deriction:"left",
		width:350,
		height:56,
		step:2,
		speed:4,
		delay:10,
		control:true,
		_front:"#spec-right",
		_back:"#spec-left"
	});
	$("#spec-list img").bind("mouseover",function(){
		var src = $(this).attr("src");
		$("#spec-n1 img").eq(0).attr({
			src:src.replace("\/n5\/","\/n1\/"),
			jqimg:src.replace("\/n5\/","\/n0\/")
		});
		$(this).css({
			"border":"2px solid #ff6600",
			"padding":"1px"
		});
	}).bind("mouseout",function(){
		$(this).css({
			"border":"1px solid #ccc",
			"padding":"2px"
		});
	});		
}

