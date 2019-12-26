$(function(){
    $('.aa').on('click',function(){
        if('.ren'.val() == ''){
            alert('收货人不能为空')
        }else if('.you'.val() == ''){
            alert('邮编不能为空')
        }else if('.qu'.val() == ''){
            alert('省区市不能为空')
        }else{
            location.href = './map.html'
        }
    })
})