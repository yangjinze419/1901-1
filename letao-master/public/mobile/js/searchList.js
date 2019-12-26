// 乐淘-搜索内容页面
//1.mui实现下拉刷新获取最新数据(默认第1页),上拉加载第几页数据。
//2.搜索按钮,筛选条件统一请求接口发送数据向后台  /product/queryProduct?_=1558354766646&page=1&size=10&proName=1&brandId=&price=&num=&sale=&time=1

$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true//是否启用回弹
    });

    /*根据url里key设置搜索内容*/
    if(location.search){
        var strs = location.search.substr(1).split("&");
        for(var i = 0; i < strs.length; i ++) {
            var arr = strs[i].split("=");
            if(arr[0] == 'key'){
                /*urlcode 转码*/
                window.proName = decodeURI(arr[1]);
                $('.search_input').val(window.proName);
                break;
            }
        }
    }

//mui实现下拉刷新获取最新数据(默认第1页),上拉加载第几页数据
    mui.init({
        pullRefresh: {
            container: '.mui-scroll-wrapper',
            down: {
                auto:true,
                callback: function(){
                    var that = this;
                    /*获取数据*/
                    window.pageNum = 1;
                    getProductList($.extend({},window.params),function(data){
                        /*渲染*/
                        $('#product_box').html(template('productTpl',{model:data}));
                        /*结束刷新状态*/
                        that.endPulldownToRefresh();
                        that.refresh(true);
                    });
                }
            },
            up: {
                contentrefresh: '正在加载...',
                contentnomore:'没有更多数据了',
                callback: function(){
                    var that = this;
                    /*获取数据*/
                    window.pageNum ++;
                    getProductList($.extend({},window.params),function(data){
                        if(!data.data.length || data.data.length < 10){
                            that.endPullupToRefresh(true);
                            return false;
                        }
                        /*渲染*/
                        $('#product_box').append(template('productTpl',{model:data}));
                        that.endPullupToRefresh();
                    });
                }
            }
        }
    });

//点击筛选条件-点击样式变红,箭头变换方向
    $('body').on('tap','.cz_orderBar a', function (e) {
        var $this = $(e.currentTarget);

        if($this.hasClass('now')){
            /*排序*/
            var $span = $this.find('span');
            if($span.hasClass('fa-angle-down')){
                $span.removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                $span.addClass('fa-angle-down').removeClass('fa-angle-up');
            }
        }else{
            /*样式*/
            $('.cz_orderBar a').removeClass('now').find('span').attr('class','fa fa-angle-down');
        }

        /*条件-点击筛选时给对象赋值,通过1或2代表向下或向上向后台传值*/
        $this.addClass('now');
        var key = $this.attr('data-type');
        var value = $this.find('span').hasClass('fa-angle-down')?1:2;
        //设置全局params变量为空对象,请求接口时会用到
        window.params = {};
        window.params[key] = value;
        console.log(window.params); //向下{num: 1},向上{num: 2}

        /*刷新*/
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    }).on('tap','.search_btn',function(){
        /*搜索*/
        var key = $.trim($('.search_input').val());

        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        window.proName = key;
        /*刷新*/
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        return false;
    });
});

//请求接口数据 /product/queryProduct?_=1558354766646&page=1&size=10&proName=1&brandId=&price=&num=&sale=&time=1
var getProductList = function(params,callback){
    LeTao.ajax({
        type:'get',
        url:'/product/queryProduct?_='+Date.now(),
        data:{
            page:window.pageNum||1, //请求页数
            size:10,//每页显示条数
            proName:window.proName||'', //搜索内容

            brandId :params.brandId ||'',//品牌id,后期扩展根据分类里的品牌id找产品
            price :params.price ||'', //价格
            num :params.num ||'',//销量
            sale :params.sale ||'', //折扣
            time :params.time || '' //上架时间
        },
        dataType:'json',
        success:function(data){
            callback && callback(data);
        },
        error:function(){
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
    });
}