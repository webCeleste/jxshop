// 参数为需要存储的数据
    let uname = sessionStorage.getItem('uname') ? sessionStorage.getItem('uname') : localStorage.getItem('uname');
    if (uname) {
    function seeHistory(tex) {
    let arr = localStorage.getItem(`${uname}seeHistory`) ? JSON.parse(localStorage.getItem(`${uname}seeHistory`)) : []
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

// 替换最近浏览过的商品，最多显示2行
if(localStorage.getItem(`${uname}seeHistory`)){
    $('.viewd .leftbar_wrap').html('<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2529284978,3206556674&fm=26&gp=0.jpg" style="width:100%;height:100%"/>')
    let viewdHtml=''
    let hisArr = JSON.parse(localStorage.getItem(`${uname}seeHistory`))
    for(let i=0;i<hisArr.length;i++){
        if(i<=1){
            $.get('/api/v1/goods/detail.jsp',{goodsId:hisArr[i]},(res)=>{
                viewdHtml+=`
                    <dl name=${res.data.goods_id}>
                        <dt><a href="./goods.html?id=${res.data.goods_id}"><img src="http://tmp00001.zhaodashen.cn/${res.data.goods_img}" alt="" /></a></dt>
                        <dd><a href="./goods.html?id=${res.data.goods_id}">${res.data.goods_name}</a></dd>
                    </dl>
                            `	
                $('.viewd .leftbar_wrap').html(viewdHtml)
            },"json")}
            else{
                break
        }
    }
    $('.viewd .leftbar_wrap').on('click','dl',function(){
        seeHistory($(this).attr('name'))
        location.href=`./goods.html?id=${$(this).attr('name')}`
    })
}

}