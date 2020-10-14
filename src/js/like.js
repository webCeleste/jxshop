$(function () {
    $('.goodslist ul').html('<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1162670919,3230310206&fm=26&gp=0.jpg"style="width:400px"/>')
	 $.get('/api/v1/goods/like.jsp', {}, res=>{
		 console.log(res)
		let html =''
		$.each(res.data, (index, item) => {
			html += `
			<li>
				<dl>
					<dt><a href="./goods.html?id=${item.goods_id}"><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
					<dd><a href="./goods.html?id=${item.goods_id}">${item.goods_name}</a></dd>
					<dd><span>售价：</span> <strong>￥${item.shop_price}</strong></dd>
				</dl>
			</li>
			`
		})

		// 放数据
		$('.goodslist ul').html(html)
	 }, 'json')

})