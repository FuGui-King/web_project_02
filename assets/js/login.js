$(function () {
  $('#reg_box').on('click', function () {
    $('.register').show();
    $('.login').hide()
  })

  $('#login_box').on('click', function () {
    $('.login').show();
    $('.register').hide()
  })

  // 自定义校验规则
  var form = layui.form;
  var layer = layui.layer;
  // 通过 `form.verify()` 函数自定义校验规则，里面是 `key：value`形式，key后续对应设置到标签的 `lay-verity`属性中，`value`就是验证的规则，这里定义了两个自定义校验规则，一个是密码框，利用的是正则，一个是确认密码
  form.verify({
    pwd: [/^\S{6,12}$/, '密码必须是6-12位，且不能出现空格'],
    repwd: function (value) {
      console.log(value)
      var pwd = $('.register [name=password]').val()
      console.log($('.register [name=password]'))
      if (pwd !== value) {
        return '密码不一致！'
      }
    }
  })

  $('#form_reg').submit(function(e) {
    e.preventDefault()
    $.ajax({
      method:'post',
      url:'/api/reguser',
      data:{
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
      },
      success:function(res){
        // console.log('ok')
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $('#login_box').click()
        $('.login')[0].reset()
      }
    })
  })

  // 登录
  $('#form_login').submit(function(e) {
    e.preventDefault()
    $.ajax({
      method:'post',
      url:'/api/login',
      data:$(this).serialize(),
      success:function(res){
        if(res.status !== 0) {
          // console.log('ok')
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        localStorage.setItem('token',res.token)
        location.href = '/index.html'
      }
    })
  })











})