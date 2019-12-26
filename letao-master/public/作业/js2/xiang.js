var herf=location.href
var aa=herf.substr(44)
// console.log(aa)
$.ajax({
    url:'/product/queryProduct',
    data:{
        proName:aa,
        page:1,
        size:10
    },
    success:function(data){
    // console.log(data)
    $.each(data.data,function(i,item){
    // console.log(item)
    var li=$(  `<a class="text-text-on" data-id="${item.id}">
                    <div class="box">
                        <img src="${item.pic[0].picAddr}" alt="">
                        <p class="box-p">${item.proName}</p>
                        <p>
                            <span class="box-span1">￥${item.price}</span>
                            <span class="box-span2">￥${item.oldPrice}</span>
                        </p>
                        <button class="box-button">立即购买</button>
                    </div>    
                </a>`)
            $('.text-text-bottom').append(li)
        }) 

        $('.box-button').click(function(){
            var search_input=$(this).parent().parent().data('id')
            console.log(search_input)
            location.href=`qing.html?productId=${search_input}`
        })
    }   
})
