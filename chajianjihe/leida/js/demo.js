/**
 * Created by Administrator on 2016/6/13.
 */
$(function(){
  var ctx=$("#cvs")[0].getContext("2d");
  //**********************************************
  //      0
  //      初始化参数
  $("#cvs")[0].height=600;//设置画布大小
  $("#cvs")[0].width=600;
  var r=300;       //外圆宽度
  var q=4;         //环数量
  var x=$("#cvs")[0].height/2;    //圆的初始横坐标
  var y=$("#cvs")[0].width/2;     //圆的初始纵坐标
  var lw=2;        //坐标线粗细
  var j=0;         //初始弧度
  var bx=x*2;      //初始坐标
  var by=y;
  var t=10;        //动画速度
  var s=0.25*Math.PI;  //扫描区域弧度
  var w=30;        //文本间距

  //************************************************
  //      1
  //      核心控制器
  var k=window.setInterval(function(){
    //引入静态背景,需要传入当前人数，人口可容纳总数
    staticBG(2400,4000);
    //引入动态背景
    dynamicBG();
    //引入文字,需要传入当前人数，人口可容纳总数
    addText(2400,4000);
  },t);

  //************************************************
  //      2
  //      函数封装
  //      2-1静态背景绘制函数
  function staticBG(dq,zd){
    // 开始绘制静态背景
    ctx.beginPath();
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    ctx.arc(x,y,r,0,2*Math.PI);
    //放射渐变
    //context.createRadialGradient(x0,y0,r0,x1,y1,r1);
    var grd=ctx.createRadialGradient(x,y,r/2,x,y,r);
    var bfb=(dq/zd).toFixed(1);
    //背景颜色变化
    if(bfb<=0.5)
    {
      grd.addColorStop(bfb*2,"#fff600");
      grd.addColorStop(bfb==0?0:1,"#3cff00");
    }
    else if(bfb>0.5)
    {
      bfb=bfb-0.5;
      grd.addColorStop(bfb==0.5?1:bfb*2,"#ff0000");
      grd.addColorStop(1,"#fff600");
    }
    ctx.fillStyle=grd;
    ctx.fill();
    ctx.strokeStyle="#fff";
    //画内圆
    for(var i=0;i<q;i++){
      ctx.lineWidth=lw;
      ctx.beginPath();
      ctx.arc(x,y,r*(i+1)/(q+1),0,2*Math.PI);
      ctx.stroke();
    }
    //画坐标系
    ctx.lineWidth=lw;
    ctx.moveTo(0,y);
    ctx.lineTo(x*2,y);
    ctx.moveTo(x,0);
    ctx.lineTo(x,y*2);
    ctx.stroke();
  }

  //************************************************
  //
  //     2-2  动态背景绘制函数
  function dynamicBG(){

    ctx.beginPath();
    ctx.moveTo(x,y);
    //ctx.lineTo(x*2,y);
    bx=(bx-x)*Math.cos(j)-(by-y)*Math.sin(j)+x;
    by=(by-y)*Math.cos(j)+(bx-x)*Math.sin(j)+y;
    //ctx.lineTo(bx,by);
    var grd=ctx.createLinearGradient(0,y,x*2,0);
    grd.addColorStop(0,"rgba(255,255,255,1)");
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
  }
//************************************************
//
//    2-3  文字添加函数
//
  function addText(dq,zd){
    drawRoundedRect('rgba(255,255,255,0)',  'rgba(0,0,0,0.6)',  x/2-50,y/4, x, y/2, 40);
    ctx.font="30px Arial";
    ctx.fillStyle="#fff";
    ctx.fillText("当前人数:"+dq,x/2-50,y/2-20);
    ctx.fillText("最大容纳人数:"+zd,x/2-50,y/2-20+w);
    //保留一位小数
    ctx.fillText("人口密度:"+(dq/zd).toFixed(1)*100+"%",x/2-50,y/2-20+w*2);
  }


//************************************************
//
//    2-4  绘制圆角矩形函数
//

  function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
    if (width> 0) ctx.moveTo(cornerX + cornerRadius, cornerY);
    else  ctx.moveTo(cornerX - cornerRadius, cornerY);
    ctx.arcTo(cornerX+width,cornerY,cornerX + width,cornerY+height,cornerRadius);
    ctx.arcTo(cornerX+width,cornerY + height,cornerX,cornerY+height,cornerRadius);
    ctx.arcTo(cornerX,cornerY+height,cornerX,cornerY,cornerRadius);
    if(width> 0) {
      ctx.arcTo(cornerX,cornerY,cornerX+cornerRadius,cornerY,cornerRadius);
    }
    else{
      ctx.arcTo(cornerX,cornerY,cornerX-cornerRadius,cornerY,cornerRadius);
    }
  }
  function drawRoundedRect(strokeStyle,fillStyle,cornerX,cornerY,width,height,cornerRadius) {
    ctx.beginPath();
    roundedRect(cornerX, cornerY, width, height, cornerRadius);
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.stroke();
    ctx.fill();
  }



})

