/**
 * Created by Administrator on 2016/6/7.
 */
$(function(){
    //*************************************
    //
    //              1
    //              初始化参数

    //模拟传入参数json格式
    var jsonstr="[{'name':'警戒','value':'00:04:00'},{'name':'控火','value':'00:10:08'},{'name':'搜救','value':'00:17:50'},{'name':'总攻','value':'00:28:22'}]";
    var jsonarray = eval('('+jsonstr+')');

    //获取画布
    var vas = $("#cvs")[0];
    var ctx = vas.getContext("2d");

    //动态设置画布大小
    var w=$("#chart").width();
    var h=$("#chart").height();
    vas.width = w;
    vas.height = h;
    var t=20;           //动画速度；
    var n=28;           //绘制横轴个数（时间间隔）；
    var setfont="12px Arial";             //设置字体大小字体；

    //添加条形
    var tHeight=$("#cvs").height()*jsonarray.length*0.15/4;  //定义高度
    var tInterval=$("#cvs").height()*jsonarray.length*0.1/4; //定义垂直间隔



    //*************************************
    //
    //              2
    //              核心控制器
    $("#cvs").ready(function(){
      //添加静态背景，传入坐标参数
      staticBG(jsonarray);
      //添加动画效果
      var j=0;
      var animate=window.setInterval(function(){
        j++;
        if(j==70)
        {window.clearInterval(animate);}
        //添加数据
        addData(j);
      },t)
    })

    //*************************************
    //
    //              3
    //              函数序列

    //              3-1
    //              静态背景绘制
    function staticBG(jsonarray){
      //绘制背景
      var my_gradient=ctx.createLinearGradient(0,0,0,h);
      my_gradient.addColorStop(0,"#000cd0");
      my_gradient.addColorStop(1,"#000cd0");
      ctx.fillStyle=my_gradient;
      ctx.fillRect(0,0,$("#cvs").width(),$("#cvs").height());
      //绘制边框
      ctx.strokeStyle="#fff";
      ctx.strokeRect(w*0.05,h*0.15,w*0.93,h*0.83);
      //绘制时间间隔
      for(var i=1;i<n;i++)
      {
        if(i%2!=0)
        {
          ctx.strokeText(i+1,w*0.045+w*0.93*(i+1)/n,h*0.1);
        }
        ctx.strokeRect(w*0.05+w*0.93*i/n,h*0.15,0,h*0.83);
      }
      //处理文字
      ctx.strokeStyle="#fff";
      ctx.font=setfont;
      ctx.strokeText("时间（分钟）",w*0.01,h*0.1);
      //绘制参数
      for(var i=0;i<jsonarray.length;i++)
      {
        ctx.strokeText(jsonarray[i].name,w*0.01,h*(0.3+0.6*i/(jsonarray.length-1)));
      }
    }
      //*************************************
      //
      //            3-2
      //            添加数据
    function addData(j){
      //一个格子宽度
      //四个参数（起始+上一个宽度，间隔+上一个间隔，本宽度，本高度）
      var tOneWeight=w*0.93/n;
      ctx.fillStyle="#01a195";
      ctx.fillRect(w*0.05,tInterval*2,tOneWeight*4*j/70,tHeight);
      ctx.fillStyle="#e50081";
      ctx.fillRect(w*0.05+tOneWeight*4,tInterval*4,tOneWeight*6*j/70,tHeight);
      ctx.fillStyle="#00a0ea";
      ctx.fillRect(w*0.05+tOneWeight*10,tInterval*6,tOneWeight*8*j/70,tHeight);
      ctx.fillStyle="#f29702";
      ctx.fillRect(w*0.05+tOneWeight*18,tInterval*8,tOneWeight*10*j/70,tHeight);
      //添加文字
      //这里需要控制一下居中。。。。。。再说吧没时间了
      ctx.strokeText("00:04:00 警戒",w*0.05+tOneWeight,tInterval*3);
      ctx.strokeText("00:10:08 控火",w*0.05+tOneWeight*6,tInterval*5);
      ctx.strokeText("00:17:50 搜救",w*0.05+tOneWeight*13,tInterval*7);
      ctx.strokeText("00:28:22 总攻",w*0.05+tOneWeight*22,tInterval*9);

    }
  }
)