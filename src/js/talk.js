$(function () {
    $('body').append(`
        <div class="service">
        <a href="https://chatlink.mstatik.com/widget/standalone.html?eid=235819" class="service_a" target="myFrameName"></a>
        </div>
        <button id="close"style="display:block;position:fixed;top:200px;right:50px;z-index:1000001;display:none;">X关闭</button>
        <iframe name='myFrameName' width="500" height="550" id="talk" style="display:none;position:fixed;top:200px;right:50px;z-index:1000000"> 
            <button id="close">X</button>
	    </iframe> 
    `)
    // $('.service_a').click(function(){
	// 	window.open(' https://chatlink.mstatik.com/widget/standalone.html?eid=235819',
	// 	'newwin','status=no,scrollbars=0,resizable=0,width=700,height=600,top=30,left=300');
	// 	return false;
	// })
    $('#close').click(function () {
        $('#talk').css('display', 'none')
        $(this).css('display','none')
    })
    $('.service').click(function () {
        setTimeout(function () {
            $('#talk').css('display', 'block')
            $('#close').css('display','block')
        },700)
    })
})