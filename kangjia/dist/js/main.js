// console.log("文件引进成功");
// 1、配置要引入的.js模块的路径
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav":"nav",
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"],
    }
});


// <1>使用简单 <2>模块间的关系
// 2、引入模块，调用实现对应的功能
require(["nav"], function(nav){
     nav.download();           //顶部导航下载数据
     nav.topNavTab();          //顶部导航移进移出
     nav.downloadCarousel();   //轮播图下载数据
     nav.carousel();           //轮播图的轮播
     nav.sildsDownload();      //侧导航下载数据
     nav.sideNavTab();         //侧导航移进移出
})