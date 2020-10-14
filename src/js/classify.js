// 商品分类
$(function () {
    $('.cat_bd').html(`<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2529284978,3206556674&fm=26&gp=0.jpg" style="width:100%;height:100%"/> `)
    $.get('/api/v1/category/index.jsp',{},(res)=> {
        // console.log(res)
        let classifyHtml = ''
        $.each(res.data, (index, item)=>{
            let html2=''
            $.each(item.children, (index, item) => {
                let html3 = '<dd>'
                $.each(item.children, (index, item) => {
                    html3+=`<a href="">${item.cat_name}</a>`
                })
                html3 += '</dd>'
                html2+=`<dl class="dl_1st">
                <dt><a href="">${item.cat_name}</a></dt>
                ${html3}
                </dl>`
            })
            classifyHtml += `
            <div class="cat">
                <h3><a href="">${item.cat_name}</a></h3>
                <div class="cat_detail">
                ${html2}
                </div>
            </div>`
        })
        $('.cat_bd').html(classifyHtml)
    },'json')
})