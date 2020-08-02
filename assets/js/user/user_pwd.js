$(function() {

    var form = layui.form;
    form.verify({
        pwd: [/^\S{6,12}$/, '密码必须是6到12位,不能出现空格'],
        samePwd: function(val) {
            if(val === $('[name=oldPwd]').val()){
                return '不能与原始密码一样！'
            } 
        },
        rePwd: function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一样'
            }
        }
    })

    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                else {
                    layui.layer.msg('密码修改成功！')
                    $('.layui-form')[0].reset()
                }
            }
        })
    })

})