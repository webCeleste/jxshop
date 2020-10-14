
// 实现tab选项卡
$(function () {
    $('.guide_wrap').html(`<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1557122104,3885355970&fm=26&gp=0.jpg" style="height:230px"/> `)
    let type = 'hot'
    tabfn(type)
    $('.guide_content span').mouseover(function () {
        $('.guide_wrap').html(`<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1557122104,3885355970&fm=26&gp=0.jpg" style="height:230px"/> `)
        type=$(this).attr('type')
        tabfn(type)
    })
})

function tabfn(type) {
    $.get('/api/v1/goods/index.jsp', {type}, (res) => {
        // console.log(res.data.list)
        let html = `<div>
        <ul>`
        $.each(res.data.list, (index, item) => {
            html += `
            <li>
				<dl>
					<dt><a href="./goods.html?id=${item.goods_id}"><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
					<dd><a href="./goods.html?id=${item.goods_id}">${item.goods_name}</a></dd>
					<dd><span>售价：</span><strong> ${item.shop_price}</strong></dd>
				</dl>
			</li>
            `
        })
        $('.guide_wrap').html(html+'</ul></div>')
    },'json')
}  
