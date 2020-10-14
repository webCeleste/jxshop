$(function(){
	//拦截form,在form提交前进行验证
    $('form').bind('submit',beforeSubmit);
	
	//为带有valType属性的元素初始化提示信息并注册onblur事件
	$.each($("[valType]"),function(i, n) {
		$(n).poshytip({
				className: 'tip-yellowsimple',
				content: $(n).attr('msg'),
				showOn: 'none',
				alignTo: 'target',
				alignX: 'right',
				alignY: 'center',
				offsetX: 5,
				offsetY: 10
			});
		$(n).bind('blur',validateBefore);
	});
	
	//定义一个验证器
	$.Validator=function(para) {
		
	
	}

	$.Validator.ajaxValidate=function() {
		beforeSubmit();
	}
	
	//验证的方法
	$.Validator.match=function(para) {
		//定义默认的验证规则
		var defaultVal = {
			required:"/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/"
		};
		var flag=false;
		if(para.rule=='OTHER') {//自定义的验证规则匹配
			flag=new RegExp(para.regString).test(para.data);
		}
		else {
			if(para.rule in defaultVal) {//默认的验证规则匹配
			flag=new RegExp(defaultVal[para.rule]).test(para.data);
			}
		}
		
		return flag;
	}

	
	
	//为jquery扩展一个doValidate方法，对所有带有valType的元素进行表单验证，可用于ajax提交前自动对表单进行验证
	$.extend({
		doValidate: function() {
			return $.Validator.ajaxValidate();
		}
	});

   });

//输入框焦点离开后对文本框的内容进行格式验证
function validateBefore() {
	//验证通过标识
	var flag=true;
	//获取验证类型
	var valType=$(this).attr('valType');
	//获取验证不通过时的提示信息
	var msg=$(this).attr('msg');
	//自定义的验证字符串
	var regString;
	if ($(this).attr('name') == 'passwordto') { if ($(this).val() != $('input').eq(1).val()) { flag = false} }
	else {
		if(valType=='OTHER') {//如果类型是自定义，则获取自定义的验证字符串
			regString=$(this).attr('regString');
			flag = $(this).val() != '' && $.Validator.match({ data: $(this).val(), rule: $(this).attr('valType'), regString: $(this).attr('regString') });
	
			// console.log(flag)
		}
		else {//如果类型不是自定义，则匹配默认的验证规则进行验证
			if($(this).attr('valType')=='required') {//不能为空的判断
				if($(this).val()=='') {
					flag=false;
				}
			}
			else {//已定义规则的判断
				flag=$(this).val()!=''&&$.Validator.match({data:$(this).val(), rule:$(this).attr('valType')});
			}
		}
	}
	//先清除原来的tips
	$(this).poshytip('hide');
	//如果验证没有通过，显示tips
	if(!flag) {
			$(this).poshytip('show');
	}
	
}

//submit之前对所有表单进行验证
function beforeSubmit() {
	var flag=true;
	//alert($("[valType]").length);
	 $.each($("[valType]"),function(i, n) {
		 //清除可能已有的提示信息
		 $(n).poshytip('hide');
		 if ($(this).attr('name') == 'passwordto') { if ($(this).val() != $('input').eq(1).val()) { $(n).poshytip('show');flag = false } }
	else{		 
		if($(n).attr("valType")=='required') {//对不能为空的文本框进行验证
			if($(n).val()=='') {
			//显示tips			
			$(n).poshytip('show');
			flag=false;
			}
		}
		else if($(n).attr("valType")=='OTHER') {//对自定义的文本框进行验证
			if(!($(this).val()!=''&&$.Validator.match({data:$(this).val(), rule:$(this).attr('valType'), regString:$(this).attr('regString')}))) {
				$(n).poshytip('show');
				flag=false;
			}
		}
		else {//对使用已定义规则的文本框进行验证			
			if(!($(this).val()!=''&&$.Validator.match({data:$(this).val(), rule:$(this).attr('valType')}))) {
				$(n).poshytip('show');
				flag=false;
			}
		}
	}	
	 });
	// 发送请求
	// $('form').submit(function(){
		event.preventDefault()
		let uname = $('input').eq(0).val()
		let pwd = $('input').eq(2).val()
		let captcha =$('input').eq(3).val()
		if(flag){
			if ($('.chb').prop('checked')) {
				$.post('/api/v1/public/reg.jsp', { uname, pwd, captcha }, (res) => {
					if (res.meta.state==201) {
						swal({
							title: '注册成功，正在为您跳转登陆页面',
							type:'success',
							timer: 1000,
							showConfirmButton:false
						})
						setTimeout(() => {
							location.href='./login.html'
						},1000)
					}
					else {
						swal({
							title: '注册失败',
							text:res.meta.msg,
							type:'error',
							timer: 2000,
							confirmButtonColor: '#d33',
							  confirmButtonText: '确认'
						})
					}
				},'json')
			}
			else {
				swal({
					title: '请阅读用户注册协议',
					type:'error',
					timer: 2000,
					confirmButtonColor: '#d33',
					  confirmButtonText: '确认'
				})
			}
		}
		else {
			swal({
				title: '输入有误，请检查',
				type:'warning',
				timer: 1000,
				confirmButtonColor: '#3085d6',
				confirmButtonText: '确认'
			})
		}
	// })
	
}


//下面是测试代码，不属于验证器的功能代码之内
//用原型的方式来模拟js的类
function Validators() {

}

Validators.prototype.subByJs=function(e) {
	if($.doValidate()) {
		alert('验证通过');
		//todo
	}
}
