require.config({
  paths:{
    "jquery":"jquery-1.11.3.min",
    "bt":"bootstrap",
    "lunbo":"lunbo"
  }
})

require(["jquery","bt","lunbo"],function($,bt,lunbo){
  bt();
  lunbo();
})