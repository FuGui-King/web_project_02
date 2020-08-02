$(function () {

    form = layui.form;
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '必须 1 ~ 6 位之间!'
            }
        }
    })
})

userInfo()
function userInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            form.val('formUserInfo',res.data)
        }
    })
}


$('#btn').on('click',function(e) {
    e.preventDefault()
    userInfo()
})

$('.layui-form').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),   
        success:function(res){
            if(res.status !== 0) {
                return layer.msg('失败')
            }   
            layer.msg('获取用户信息成功!')
            // 此时因为iframe 是嵌套在整个index页面的 所以需要通过整个window对象渲染的
            window.parent.getUserInfo();
            // console.log(window.parent);
            

        }
    })
})







