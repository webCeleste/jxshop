// 封装一个函数，每次表单提交的时候获取input框内容
$(function () {
    let t
    function searchHistory() {
        // 判断是否存在history数据，存在转换为js数组，不存在定义空数组
        let arr = localStorage.getItem('history')?JSON.parse(localStorage.getItem('history')):[]
        // 每次判断当前输入的值是否存在，如果不存在，直接前压到数组
        let tex = $('form.fl').find('.txt').val()
        if (tex) {
            if (arr.indexOf(tex) == -1) {
                arr.unshift(tex)
            }
            // 如果存在，先从数组中剔除这个数据，再前压进去
            else {
                arr.splice(arr.indexOf(tex), 1)
                arr.unshift(tex)
            }
            localStorage.setItem('history',JSON.stringify(arr))
        }
        location.href=`./list.html?k=${tex}`
    }
    
    // 显示模糊查询
    function searchData(val) {
        if(val){
            clearTimeout(t)
            t = setTimeout(() => {
                $.get('/api/v1/goods/index.jsp', {pagesize:8,keywords:val}, (res) => {
                    $('#search_list').html('')
                    let html=''
                    $.each(res.data.list, (index, item)=>{
                            html+=`<li style="padding:3px 10px;">${item.goods_name}</li>`
                    })
                    $('#search_list').html(html)
                },'json')
            },300
            )
        }
    }
    
    // 显示查询记录
    function getSearchHistory(val) {
        if (!val) {
            $('#search_list').html('')
            let arr = JSON.parse(localStorage.getItem('history'))
            let html=''
            $.each(arr,(index,item)=>{
                if (index <= 6) {
                    html+=`<li style="padding:3px 10px;">${item}</li>`
                }
            })
            $('#search_list').html(html)
        }  
    }
    $('form').eq(0).submit(function(){	
        // 每次搜索存到本地记录
        event.preventDefault()
        searchHistory()
    })
    // 键盘松开，获取数据，显示模糊查询
    $('form').eq(0).find('.txt').keyup(function () {
        console.log(111)
        let val = $(this).val()
        searchData(val)
        getSearchHistory(val)
    })
    // 获取光标如果为空显示历史搜索记录，设置最多显示6行，如果有内容显示模糊查询
    $('form').eq(0).find('.txt').focus(function () {
        let val = $(this).val()
        getSearchHistory(val)
        searchData(val)
    })
    // 点击li使得提取内容给input框
    $('#search_list').on('click', 'li', function () {
        $('form').eq(0).find('.txt').val($(this).text())

        console.log($(this).text())
    })
    // 失去光标清空list内容
    $('form').eq(0).find('.txt').on('blur',function () {
        setTimeout(()=>{$('#search_list').html('')},300)
    })
    if (location.href.indexOf('k') != -1) {
        $('form').eq(0).find('.txt').val(getParams('k'))
    }
})