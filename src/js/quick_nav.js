$(function () {
    let token = sessionStorage.getItem('token')?sessionStorage.getItem('token'):localStorage.getItem('token');
    let uname = sessionStorage.getItem('uname')?sessionStorage.getItem('uname'):localStorage.getItem('uname');
    if (token) {
        $('.user .prompt').html(`您好，${uname}`)
        $('.viewlist ul').html('')
        if(localStorage.getItem('seeHistory')){
            $('.viewlist ul').html('<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2529284978,3206556674&fm=26&gp=0.jpg" style="width:100%;height:100%"/>')
            let viewdHtml=''
            let hisArr = JSON.parse(localStorage.getItem('seeHistory'))
            for(let i=0;i<hisArr.length;i++){
                if(i<=4){
                    $.get('/api/v1/goods/detail.jsp',{goodsId:hisArr[i]},(res)=>{
                        viewdHtml +=`
                            <li><a href="./goods.html?id=${res.data.goods_id}"><img src="http://tmp00001.zhaodashen.cn/${res.data.goods_img}" alt="" /></a></li>
                                    `	
                        $('.viewlist ul').html(viewdHtml)
                    },"json")}
                    else{
                        break
                }
            }
            $('.viewlist ul').on('click','li',function(){
                seeHistory($(this).attr('name'))
            })
        }
        $('.cart dd').remove()
        $('.cart dt').click(function () {
            location.href='./flow1.html'
        })
    }
    else {
        $('.user .prompt').html(`您好，请<a href="./login.html">登录</a>`)
        $('.cart dt a').attr('href','javaScript')
    }
    $('.list1 a').eq(0).attr('href', './user.html')
    $('.list1 a').eq(1).attr('href', './order.html')
    $('.list1 a').eq(2).attr('href', './address.html')
    function seeHistory(tex) {
        let arr = localStorage.getItem(`${uname}seeHistory`) ? JSON.parse(localStorage.getItem('seeHistory')) : []
        if (tex) {
            if (arr.indexOf(tex) == -1) {
                arr.unshift(tex)
            }
            // 如果存在，先从数组中剔除这个数据，再前压进去
            else {
                arr.splice(arr.indexOf(tex), 1)
                arr.unshift(tex)
            }
            localStorage.setItem(`${uname}seeHistory`,JSON.stringify(arr))
        }
    }
})

