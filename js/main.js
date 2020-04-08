
function buildOverview() {

    myXhr('get',{path:'/about/'}).done(function(json){
        //got good data back in json
        //dump out all of the degree titles
        console.log(json);
        console.log(Object.entries(json));
        // $.each(json.faculty,function(i, item){
        //     console.log($(this));
        //     console.log(item.name);
        //     $('#content').append('<h2>'+item.title+'</h2>'+'<p>'+item.name+'</p>');
        // });
    });

}




function myXhr(t, d){
    return $.ajax({
        type:t,
        url:'http://serenity.ist.rit.edu/~klw2488/340/proxy/proxy.php',
        dataType:'json',
        data:d,
        cache:false,
        async:true,
        // beforeSend:function(){
        //     $(id).append('<img src="gears.gif" class="spin"/>');
        // }
    }).fail(function(){
        //handle failure
    });
}
buildOverview();