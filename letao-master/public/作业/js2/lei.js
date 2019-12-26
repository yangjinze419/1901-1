getCurrents(1)
function getCurrents(x){
    $.ajax({
        url:'/category/queryTopCategory',
        success:function(data){
        console.log(data)
        $.each(data.rows,function(i,item){
        // console.log(item)
        var li=$(`<ul data-id='${item.id}'>
                    <li>${item.categoryName}</li>
                  </ul>`)
        $('.text-left').append(li)
        $('.text-left').find('li').eq(0).addClass('abc')
        }) 
        }
        })
    $('.text-left').on('click','li',function(){
        $('.text-right-ul').html('') 
        ii=$(this).parent().data('id')
        $('.text-left li').removeClass('abc')
        $(this).addClass('abc')
    $.ajax({
        url:'/category/querySecondCategory',
        data:{id:ii},
        success:function(data){
        $.each(data.rows,function(i,item){
        var li=$(`
            <li data-id="${item.id}">
                <a href=" ">
                    <img src="${item.brandLogo}">
                    <p>${item.brandName}</p >
                </a>
            </li>`)
        $('.text-right-ul').append(li)
        })
        }
        }) 
        }) 
        $('.text-left li').eq(0).click()  
}
// $.ajax({

//     url:'/category/queryTopCategory',
//     success:function(data){
//     // console.log(data)
//     $.each(data.rows,function(i,item){
//     // console.log(item)
//     var li=$(`<div class="sport" data-id='${item.id}'>${item.categoryName}</div>`)
    
//     $('.conment_list').append(li)
//     $('.conment_list').find('.sport').eq(0).addClass('abc')
    
//     }) 
    
    
//     $('.conment_list').on('click','.sport',function(){
//     $('.mui-clearfix').html('') 
//     ii=$(this).data('id')
//     $(this).addClass('abc').siblings().removeClass('abc')
    
//     $.ajax({
//     url:'/category/querySecondCategory',
//     data:{id:ii},
    
//     success:function(data){
//     $.each(data.rows,function(i,item){
//     var li=$(`<li data-id="${item.id}">
//     < a href=" ">< img src="${item.brandLogo}">
//     <p>${item.brandName}</p ></ a>
//     </li>`)
//     $('.mui-clearfix').append(li)
//     })
//     }
//     }) 
//     }) 
    
//     $('.conment_list .sport').eq(0).click()
    
//     }
//     })