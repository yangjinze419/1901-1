var herf=location.href
var aa=herf.substr(49)
console.log(aa)
$.ajax({
    url:'/product/queryProductDetail',
    data:{
        id:aa,
    },
    success:function(data){
    console.log(data)
    var li=(  `<div class="text-box">
                <div class="text-box-txt">
                    <div class="text-tab">
                        <div class="text-tab-img">
                            <img src="${data.pic[0].picAddr}" alt="">
                        </div>
                    </div>
                    <div class="text-txt">
                            ${data.proName}
                    </div>
                    <div class="text-mous">
                            价格:
                        <strong>${data.price}</strong>
                        <del>${data.oldPrice}</del>
                    </div>
                    <div class="text-xiao">
                        尺码:
                        <span>40</span>
                        <span>41</span>
                        <span>42</span>
                        <span>43</span>
                        <span>44</span>
                        <span>45</span>
                        <span>46</span>
                        <span>47</span>
                        <span>48</span>
                        <span>49</span>
                        <span>50</span>
                        <span>51</span>
                        <span>52</span>
                        <span>53</span>
                        <span>54</span>
                        <span>55</span>
                    </div>
                    <div class="text-shu">
                        数量:
                        <span class="jian">-</span>
                        <input readonly type="text" value="0" data-max="20" class="sum">
                        <span class="jia">+</span>
                        剩余20件
                    </div>
                </div>
                </div>
                `)
            $('.text').append(li)
            var now = 0;
                var value = $('.sum').data('max')
            $('body').on('click','.jia',function(){
                
                if(now<value){
                    now++
                    $(this).prev().val(now)
                }else{
                    alert("没有库存了")
                }
            })
            $('body').on('click','.jian',function(){
                if (now>0) {
                    now--
                     $(this).next().val(now)
                }
                else{
                    alert('请选择数量')
                     return false
                }
            })
            $('.text-xiao').on('click','span',function(){
                $(this).addClass('text-span').siblings().removeClass('text-span')
            })
            console.log($('.text-xiao span').text())
            $('.buttom-one').on('click',function(){
                var id=location.search.split('=')[1]
                console.log(id)
                if($('.sum').val() == 0){
                    alert("请选择数量")
                }
                else if($('.text-xiao span').hasClass('text-span') == ''){
                    alert("请选择尺码")
                }
                else{
                    $.ajax({
                        url:'/cart/addCart',
                        type:'post',
                        data:{
                            productId: id,
                            size: $('.text-xiao ').find('.text-span').text(),
                            num: $('.sum').val()
                        },
                        success:function(data){
                            if (data.success) {
                               if (confirm('添加成功,是否去购物车看看')==true) {
                                   location.href='./gouwu.html'
                               }

                            }else{
                                location.href='./gou.html'
                            }
                        }
                    })
                }
            })
    },  
})