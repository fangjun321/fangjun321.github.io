define(function(){
  return init;
});

function init(){
  var key=0; //指代你当前图片的Index;
  var timer=time();   //启动定时器

  $("#lunbo-span").on("mouseenter","span",function(){
    clearInterval(timer);
    key=$(this).index();
    draw();
  })

  $("#lunbo-span").on("mouseleave","span",function(){
    timer=time();    //再次绑定计时器
  })
 


  function time(){
    return setInterval(() => {
      if(key==2)
      {
        key=0;
      }
      draw();
      key++;
    }, 1000);
  }
  function draw(){
    $("#lunbo img").css("opacity","0");
    $("#lunbo img").eq(key).css("opacity","1");

    $("#lunbo-span span").removeClass("lunbo-span-action");
    $("#lunbo-span span").eq(key).addClass("lunbo-span-action");
  }




}