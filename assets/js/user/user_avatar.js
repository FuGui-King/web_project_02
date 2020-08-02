$(function () {



    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#btnImage').on('click', function (e) {
        e.preventDefault()
        $('#file').click()
    })


    // - 给文件选择框绑定 change 事件
    //     - 用户选择了文件就会触发这个事件，通过`e.target.files` 获取用户选择文件列表
    //         - 通过索引0拿到用户选择的文件
    //         - 将文件转化为路径
    //         - 利用`$image` 重新初始化裁剪区域

    $('#file').on('change', function (e) {
        alert(123)
        e.preventDefault()
        var files = e.target.files;
        if (files.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    
    $('.layui-btn-danger').on('click',function() {
        var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

        $.ajax({
            method:'post',
            url:'/my/update/avatar',
            data:{
                avatar: dataURL
            },
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
 
    

        

})