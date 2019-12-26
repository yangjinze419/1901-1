
$.ajax({
    url:'/cart/queryCart',
    success:function(data){
    console.log(data)
    $.each(data,function(i,item){
    // console.log(item)
    var li=$(  `<li class="text-box-cs-ul-li">
                    
                    <a href="javasctipt:;" class="text-cs-a">
                        <img src="${item.pic[0].picAddr}" alt="">
                        <div class="text-cs-a-div">
                            <p class="cs-a-p1">${item.proName}</p>
                            <p class="cs-a-p2">
                                <span style="color: red;">¥${item.price}</span>
                                <span class="span1">¥${item.oldPrice}</span>
                                <span class="span2">x${item.statu}双</span>
                            </p>
                            <p class="cs-a-p3">
                                <span style="font-size: 12px;">鞋码：${item.productSize}</span>
                            </p>
                        </div>
                        <input type="checkbox" class="opp">
                    </a>
                </li>
                `)
            $('.text-box-cs-ul').append(li)
        })
    }   
})
