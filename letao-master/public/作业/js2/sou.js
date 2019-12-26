var arr=[]
if (localStorage.search_input!=undefined) {
    var loc=JSON.parse(localStorage.search_input)
    arr=loc
    var ul=''
    $.each(loc,function(i,iem){
        li=`
        <li>
            <a href="#">${iem}</a>
            <span class="icon_delete fa fa-close"></span>
        </li>
        `
        ul+=li
    })
    $('.oul').append(ul)
}
$('.a11').click(function(){
   $('.text-top form').each(function(i,item){
       var search_input=$('.input').val()
       console.log(item,search_input)
       if (search_input!='') {
           arr.push(search_input)
           localStorage.search_input=JSON.stringify(arr)
           console.log(arr)
           location.href=`xiang.html?key=${search_input}`
       }
       else{
           alert('请输入内容')
           return false
       }
   })
})

$('.oul').on('click','.fa-close',function(){
    ul=''
    var index=$(this).parent().index()
    console.log(arr,index)
    arr.splice(index,1)
    localStorage.search_input=JSON.stringify(arr)
    $.each(arr,function(i,iem){
        li=`
        <li>
            <a href="#">${iem}</a>
            <span class="icon_delete fa fa-close"></span>
        </li>
        `
        ul+=li
    })
    console.log(ul)

    $('.oul').html(ul)
})
$('.span2').on('click',function(){
    arr=[]
    localStorage.search_input=JSON.stringify(arr)

    $('.oul').html('')
})