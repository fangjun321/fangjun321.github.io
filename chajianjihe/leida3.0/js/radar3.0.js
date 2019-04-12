/**
 * Created by Administrator on 2017/2/7.
 */
$(function(){
  function radar(){
    var jsonstr="[[{'now':999,'max':999},{'now':999,'max':999},{'now':999,'max':999},{'now':999,'max':999},{'now':999,'max':999},{'now':999,'max':999},{'now':999,'max':999},{'now':999,'max':999}]," +
      "[{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100}]," +
      "[{'now':50,'max':100},{'now':50,'max':100},{'now':50,'max':100},{'now':50,'max':100},{'now':50,'max':100},{'now':50,'max':100},{'now':50,'max':100},{'now':50,'max':100}]," +
      "[{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100},{'now':25,'max':100}]," +
      "[{'now':99,'max':100},{'now':100,'max':100},{'now':100,'max':100},{'now':100,'max':100},{'now':100,'max':100},{'now':77,'max':100},{'now':99,'max':100},{'now':33,'max':100}]]";
    var jsonarray = eval('('+jsonstr+')');



    var ctx=$("#cvs")[0].getContext("2d");

    //模拟数据   当前环数5

    //**********************************************
    //      0
    //      初始化参数
    $("#cvs")[0].height=800;//设置画布大小
    $("#cvs")[0].width=800;
    var r=200;       //外圆宽度
    var q=jsonarray.length-1;         //环数量
    var x=$("#cvs")[0].height/2;    //圆的初始横坐标
    var y=$("#cvs")[0].width/2;     //圆的初始纵坐标
    var lw=2;        //坐标线粗细
    var j=0;         //初始弧度
    //var bx=x*2;      //初始坐标
    //var by=y;
    var t=10;        //动画速度
    var s=0.25*Math.PI;  //扫描区域弧度
    var w=30;        //文本间距


    //画弹出窗口
    var img=new Image();
    img.src="img/heisetanchukuang.png";

    var dialog=new Object();
    dialog={
      img:img,
      on:0,
      x:0,
      y:0
    };
    //文字录入
    var dialogText=new Object();
    dialogText={
      now:0,
      max:0,
      midu:0,
      on:0,
      x:0,
      y:0
    };


    //************************************************
    //      1
    //      核心控制器
    var k=window.setInterval(function(){
      //引入静态背景,需要传入当前人数，人口可容纳总数
      staticBG(jsonarray);
      //引入动态背景
      dynamicBG();
      //引入文字,需要传入当前人数，人口可容纳总数
      //addText(jsonarray);
    },t);

    //************************************************
    //      2
    //      函数封装
    //      2-1静态背景绘制函数
    function staticBG(jsonarray){

      ctx.clearRect(0,0,$("#cvs")[0].width,$("#cvs")[0].height);

      // 开始绘制静态背景
      ctx.beginPath();
      ctx.arc(x,y,r,0,2*Math.PI);
      //放射渐变
      //context.createRadialGradient(x0,y0,r0,x1,y1,r1);
      var grd=ctx.createRadialGradient(x,y,0,x,y,r);
      //背景颜色变化

      for(var i=0;i<jsonarray.length;i++)
      {
        var now=0;
        var max=0;
        //环内数值相加
        for(var j=0;j<jsonarray[i].length;j++)
        {
          now+=jsonarray[i][j].now;
          max+=jsonarray[i][j].max;
        }
        //hsla颜色设置
        grd.addColorStop(1/jsonarray.length*i,"hsla("+(1-(now/max).toFixed(2))*125+",100%,50%,0.5)");
      }
      ctx.fillStyle=grd;
      ctx.fill();
      ctx.strokeStyle="rgba(255,255,255,0.7)";
      //画内圆
      for(var i=0;i<q;i++){
        ctx.lineWidth=lw;
        ctx.beginPath();
        ctx.arc(x,y,r*(i+1)/(q+1),0,2*Math.PI);
        ctx.stroke();
      }
      //画坐标系
      ctx.lineWidth=lw;
      ctx.moveTo(x-r,y);
      ctx.lineTo(x+r,y);
      ctx.moveTo(x,y-r);
      ctx.lineTo(x,y+r);
      ctx.stroke();
      //画X线
      ctx.moveTo(x-r/1.414,y+r/1.414);
      ctx.lineTo(x+r/1.414,y-r/1.414);
      ctx.moveTo(x-r/1.414,y-r/1.414);
      ctx.lineTo(x+r/1.414,y+r/1.414);
      ctx.stroke();

    }

    //************************************************
    //
    //      2-2  动态背景绘制函数
    function dynamicBG(){

      ctx.beginPath();
      ctx.moveTo(x,y);
      var grd=ctx.createLinearGradient(0,y,x*2,0);
      grd.addColorStop(0,"rgba(255,255,255,0.3)");
      grd.addColorStop(1,"rgba(255,255,255,0)");
      ctx.fillStyle=grd;
      //ctx.fillStyle="#fff";
      ctx.arc(x,y,r,j,j+s);
      //ctx.lineTo(x,y);
      ctx.fill();
      j=j+Math.PI/180;
      //重置弧度，防止内存溢出
      if(j>=2*Math.PI)
      {j=0;}
      //console.log(j);



      //绘制对话框
      if(dialog.on==1){
        ctx.drawImage(img,dialog.x-25,dialog.y-150);
      }
      if(dialogText.on==1){
        ctx.font="10px 微软雅黑";
        ctx.fillStyle="#fff";
        ctx.fillText("当前人数:"+dialogText.now,dialogText.x,dialogText.y-120);
        ctx.fillText("最大容纳:"+dialogText.max,dialogText.x,dialogText.y-80);
        ctx.fillText("人口密度:"+(dialogText.now/dialogText.max).toFixed(1)*100+"%",dialogText.x,dialogText.y-40);
      }
    }
    //************************************************
    //
    //      2-3  文字添加函数  放置在动态背景绘制函数内
    //

    //************************************************
    //
    //      2-4  鼠标事件函数
    //

    function cvsMove(){
      $("#cvs").on("mousemove",function(event){
        //获取事件源鼠标位置
        //console.log(event.offsetX,event.offsetY);
        var x=changeZuobiao(event.offsetX,$("#cvs")[0].width/2);
        var y=changeZuobiao(event.offsetY,$("#cvs")[0].width/2);
        //鼠标距离原点距离
        var l=Math.sqrt(x*x+y*y);

        //***********************************************
        //                   1        确定鼠标所属圆
        var rr=compareR(l,jsonarray);
        var xiangxian=compareXiangxian(x,y);
        //console.log(rr,xiangxian);


        //判断是否显示对话框
        if(rr!=undefined){
          //console.log(jsonarray[rr][xiangxian]);
          dialog.on=1;
          dialog.x=event.offsetX;
          dialog.y=event.offsetY;
          dialogText.on=1;
          dialogText.x=event.offsetX;
          dialogText.y=event.offsetY;

          //文字添加
          dialogText.now=jsonarray[rr][xiangxian].now;
          dialogText.max=jsonarray[rr][xiangxian].max;
        }

        else{
          dialog.on=0;
          dialogText.on=0;
        }
      })

    }
    cvsMove();



    //          坐标原点移动
    function changeZuobiao(a,b){
      return a-b;
    }

    //***********************************************
    //          区域确认1：环确认
    function compareR(l,jsonarray){
      //最小环半径r
      var sr=r/jsonarray.length-1;
      //如果小于当前环就返回当前环值
      //注意，超出环返回undefined
      for(var i=0;i<jsonarray.length;i++){
        if(l<sr*(i+1))
        {
          return i;
        }
      }
      //console.log(jsonarray.length);
    }


    //***********************************************
    //          区域确认2：象限确认

    function compareXiangxian(x,y){
      //确定象限

      //第一象限
      if(x>=0&&y<=0)
      {
        if( Math.abs(x)<Math.abs(y))
        {
          return 0;
        }
        else
        {
          return 1;
        }
      }
      //第二象限
      if(x>=0&&y>0)
      {
        if( Math.abs(x)>Math.abs(y))
        {
          return 2;
        }
        else
        {
          return 3;
        }
      }
      //第三象限
      if(x<=0&&y>=0)
      {
        if( Math.abs(x)<Math.abs(y))
        {
          return 4;
        }
        else
        {
          return 5;
        }
      }
      //第四象限
      if(x<=0&&y<0)
      {
        if( Math.abs(x)>Math.abs(y))
        {
          return 6;
        }
        else
        {
          return 7;
        }
      }
    }

  }
  radar();

})