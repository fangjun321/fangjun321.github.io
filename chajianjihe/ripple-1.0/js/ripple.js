/**
 * ripple.js-v1.0
 * Created by fangjun on 2016/4/20.
 */

(function($){
  $.fn.ripple=function(select){
    $(select).on("click",function(e){
      // 移除旧节点
      $(".ripple").remove();
      //判断当前event时间位置是否在当前节点上
      if(e.toElement==$(this).context)
      {
      //设置点击后
      var buttonWidth = $(this).width();
      var buttonHeight = $(this).height();
      //添加波纹
      $(this).prepend("<span class='ripple'></span>");
      //变圆
      if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
      } else {
        buttonWidth = buttonHeight;
      }
      // 获取元素中心
      var x = e.offsetX - buttonWidth / 2;
      var y = e.offsetY - buttonHeight / 2;


      //添加animation
      $(".ripple").css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + 'px',
        left: x + 'px'
      }).addClass("rippleEffect");
      }
  })
}})(jQuery);


