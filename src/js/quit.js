$(function () {
  let uname = sessionStorage.getItem('uname') ? sessionStorage.getItem('uname') : localStorage.getItem('uname');
  $('.topnav_left').html(`<div class="dizhi">
  <span>选择地址</span>
  <div class="country">
    <ul>
    
    </ul>
    <div class="box">
      
    </div>
  </div>
</div>`)
  if (uname) {
        $('.topnav_right ul').html(
            `
          <li>您好<span style="font-size:14px;font-weight:700">${uname}</span>，欢迎来到京西！[<a href="javaScript:" id='quit'>退出</a>] [<a href="./regist.html">免费注册</a>] </li>
					<li class="line">|</li>
					<li>我的订单</li>
					<li class="line">|</li>
					<li>客户服务</li>
            `
        )
        $('.topnav_right ul').on('click', '#quit', function () {
    //         swal({
    //             title: '是否确认退出',
    //             type: 'warning',
    //              showCancelButton: true,
    //              confirmButtonColor: '#3085d6',
		//    		      cancelButtonColor: '#d33',
		//    		      confirmButtonText: '确认',
		//    		      cancelButtonText: '取消'
    //           }).then(function(isConfirm) {
    //             if (isConfirm) {
    //               // 点击确认保存用户信息，跳转网页
    //               localStorage.clear()
    //               location.href='./login.html'
    //             }
    //           })
          sessionStorage.clear()
          localStorage.removeItem('token')
          localStorage.removeItem('uname')
          sessionStorage.setItem('net',location.href)
          location.reload()
        })
      }
    else {
      $('.topnav_right ul').html(
        `
      <li>您好，欢迎来到京西！[<a href="./login.html" id='quit'>登陆</a>] [<a href="./regist.html">免费注册</a>] </li>
      <li class="line">|</li>
      <li>我的订单</li>
      <li class="line">|</li>
      <li>客户服务</li>    
      `)
    //  查看订单
      $('.my_order').click(function () { 
        swal({
            title: "您尚未登录",
            text: "是否跳转到登录页面",
            type: 'warning',
            showCancelButton: true,
		   	  	confirmButtonColor: '#3085d6',
		   	  	cancelButtonColor: '#d33',
		   	  	confirmButtonText: '确认',
		   	  	cancelButtonText: '取消'  
        }).then(function(isConfirm) {
          if (isConfirm) {
          // 保存下当前地址便于登陆跳转
           localStorage.setItem('net','./order.html')
           location.href='./login.html'
          }
        })
      }
    )
      }
  // 点击登陆，跳转到登陆界面
  $('.topnav_right ul a').eq(0).click(function () {
    localStorage.setItem('net',location.href)
  })
   // 点击注册，跳转到注册界面
   $('.topnav_right ul a').eq(1).click(function () {
     localStorage.setItem('net', location.href)
     location.href='./regist.html'
   })
   $('.topnav_right ul li').eq(2).click(function () {
    localStorage.setItem('net', location.href)
    location.href='./order.html'
   })
   
      function dizhi(){
		
		// 获取地址
		$.get('/api/v1/area/index.jsp',{type:"省",pid:1},res=>{
			
			// console.log(res);
			let provincehtml = '';
			let cityhtml = '';
			$.each(res.data,(index,item)=>{
				provincehtml += `<li index="${item.region_id}">${item.region_name}</li>`

				// 避免异步拿到的城市数据混乱使用同步async:false
				$.ajax({
					type:'get',
					url:'/api/v1/area/index.jsp',
					data:{
						type:"市",
						pid:item.region_id
					},
					async:false,
					dataType:"json",
					success:function(res){
						cityhtml += `
								<div class="a_con">
									<ul>
										<li class="province" style="font-size:16px; font-weight:bold;">${item.region_name}</li>`
										$.each(res.data,(index,item1)=>{
		
											cityhtml += `<li>${item1.region_name}</li>`
										})
					cityhtml +=		`</ul>
								</div>`
						
					$('.box').html(cityhtml);
					
					}
				})
				// $.get('/api/v1/area/index.jsp',{type:"市",pid:item.region_id},res=>{
				// 	// console.log(res);
					
				// 	cityhtml += `
				// 				<div class="a_con">
				// 					<ul>
				// 						<li class="province" style="font-size:16px; font-weight:bold;">${item.region_name}</li>`
				// 						$.each(res.data,(index,item1)=>{

				// 							cityhtml += `<li>${item1.region_name}</li>`
				// 						})
				// 	cityhtml +=		`</ul>
				// 				</div>`
						
				// 	$('.box').html(cityhtml);
				// 	dizhic();
				// },'json')

			})
			
			$('.country>ul').html(provincehtml);
			dizhic();
		},'json')


		

		// 点击地址滚动
		function dizhic(){
			let ospan = document.querySelector(".dizhi span");
			let country = document.querySelector(".country");
			let ali = document.querySelectorAll(".country ul li");
			let acon = document.querySelectorAll(".a_con");
			let aconLi = document.querySelectorAll(".a_con li");
			let box = document.querySelector(".box");
			
			function blockFn(e){
				country.style.display = "block";
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;
				}
			}

			function noneFn(e){
				country.style.display = "none";
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;
				}
			}

			aconLi.forEach(item => {
				item.addEventListener("click",noneFn);
			})

			ospan.addEventListener("click",blockFn);
			country.addEventListener("click",blockFn);

			document.addEventListener("click",function(){
				country.style.display = "none";
			})

			ali.forEach((item,index) => {
				item.addEventListener("click",move)
				box.addEventListener("scroll",function(){
					item.addEventListener("click",move)
				})
				function move(){
					// let temp = box.scrollTop;
				
					// box.scrollTop = index*(box.scrollHeight/6);
					// console.log(box.scrollTop);
					let conH = [];
					let conR = [0];
					let hgt = 0;
					acon.forEach((con,i) => {
						// console.log(con.offsetHeight);
						conH.push(con.offsetHeight);
						hgt += con.offsetHeight;
						conR.push(hgt);
					})
			
					box.scrollTop = conR[index];
					
			}

			})
			$('.a_con ul li').click(function(){
				let province = $(this).parents('ul').find('.province').html();
				
				$('.dizhi span').html("定位：" +province+' '+$(this).html());
			})

		}
	  }
	    dizhi();
})