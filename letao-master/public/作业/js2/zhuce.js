$(function(){
    $('body').on('tap','button',function(){
        if(window.loading) return false;
        var data = {
            username:$.trim($('[name=mobile]').val()),
            password:$.trim($('[name=pass]').val()),
            rePass:$.trim($('[name=rePass]').val()),
            vCode:$.trim($('[name=code]').val())
        }
        if(!data.username){
            mui.toast('请输入手机号');
            return false;
        }
        if(!/^1\d{10}$/.test(data.username)){
            mui.toast('请输入合法手机号');
            return false;
        }
        if(!data.password){
            mui.toast('请输入密码');
            return false;
        }
        if(!data.rePass){
            mui.toast('请再次输入密码');
            return false;
        }
        if(data.password != data.rePass){
            mui.toast('密码需要一致');
            return false;
        }
        if(!data.vCode){
            mui.toast('请输入验证码');
            return false;
        }
        if(!/^\d{6}$/.test(data.vCode)){
            mui.toast('请输入合法验证码');
            return false;
        }
        data.mobile = data.username;
    }).on('tap','.button',function(){
        var btn = $('.button');
        if(btn.hasClass('btn_disabled')) return false;
        LeTao.ajax({
            type:'get',
            url:'/user/vCode',
            data:'',
            dataType:'json',
            beforeSend:function(){
                btn.addClass('btn_disabled').html('正在发送...');
            },
            success:function(data){
                console.log(data.vCode);
                var time = 60;
                btn.html(time+'秒后再获取');
                var timer = setInterval(function(){
                    time --;
                    btn.html(time+'秒后再获取');
                    if(time <= 0) {
                        clearInterval(timer);
                        btn.removeClass('btn_disabled').html('获取认证码');
                    }
                },1000);
            }
        });
    });
})