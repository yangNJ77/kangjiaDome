define(["jquery"],function($){
   //下载数据 添加到页面
  function download(){
    $.ajax({
        type:"get",
        url:"../data/data.json",
        success:function(arr){
        //通过循环 将数据加载到页面
           
            for(var i=0; i<arr.length;i++){
                var node =$(`<div class="col-xs-1" class="active"></div>`);
                node.appendTo("#nav_top .row");
                
                $(`<a href="#">${arr[i].title}</a> `).appendTo(node);
                if(arr[i].childs){
                  var node =$(`<ul class="figure"  style="display: ${i==1 ?"block":"none"}"></ul>`)
                  node.appendTo(`#nav_top .item`);
                  //取出所有子菜单
                  var childArr= arr[i].childs;
                  // console.log(childArr);
                  for(var j=0; j<childArr.length; j++){
                      $(`<li class="cox-01">
                      <a href="#" title="">
                          <img src="${childArr[j].img}">
                      </a>
                    
                      <h4 class="text-uppercase">${childArr[j].title}</h4>
                      <div class="figure-title">${childArr[j].intro}</div>
                      <p>￥${childArr[j].price}</p>
                     </li>`).appendTo(node); 
                  }
                }
              }
          },error:function(msg){
              console.log(msg)
          }
      });
    }
     
    //顶部导航添加移入移出的效果
    function topNavTab(){
      $("#nav_top .row").on("mouseenter",".col-xs-1",function(){
        // $(this).addClass("col-xs-1-active");
        //找出对应的下标
        var index = $(this).index()-3;
        $(".item").css({display:"block"});
        $(".item").find("ul").eq(index).css("display","block").siblings("ul").css("display","none");

        
      });
      
      $("#nav_top").mouseleave(function(){
        // $(this).removeClass("col-xs-1-active");
        $(".item").css({display:"none"});
        $(".item").find("ul").eq(index).css("display","none").siblings("ul").css("display","none");
      });
    }
  
  //下载轮播图数据
  function downloadCarousel(){
       $.ajax({
            type:"get",
            url:"../data/slidShow.json",
            success:function(arr){
                // console.log(arr);
                var newArr =arr.slidShow;
                //console.log(newArr);
                for(var i=0; i<newArr.length; i++){
                  $(`<li><img src=" ${newArr[i].img}" ></li>`).appendTo(`#carousel-inner .imgBox`);
                }
            },error:function(msg){
              console.log(msg);
            }
        });
  }
  //轮播图的轮播
  function carousel(){
    var oUl= $("#carousel-inner").find(".imgBox");
    var oBtns= $("#carousel-inner").find("ol li");
    var  iNow =1; //当前显示图片的下标
    var  timer = null;
  //点击按钮的时候实现切换
  oBtns.click(function(){
    iNow = $(this).index() + 1;
    tab();
  })
  //自动轮播
  timer= setInterval(function(){
    iNow++;
    // tab();
  },2000);
  //移入移出
  $("#carousel-inner").mouseenter(function(){
    clearInterval(timer);
  }).mouseleave(function(){
    timer= setInterval(function(){
      iNow++;
      // tab();
    },2000);
  })
  //添加左右切换
  $(".lRTabs").find("a").click(function(){
    if(this.className=="left"){
      iNow--;
      tab();
    }else{
      iNow++;
      tab();
    }
  })


    //封装一个切换函数
    function tab(){
       oBtns.removeClass("active").eq(iNow - 1).addClass("active");
       if(iNow==6){
           oBtns.eq(0).addClass("cative");
       }
       oUl.animate({left: -iNow * 1920},800,function(){
         if(iNow==6){
           oUl.css("left",-1920);
           iNow=1;
         }
         if(iNow == 0){
          oUl.css("left",5*-1920);
          iNow=5;
         }
       });
    }
  }
  console.log("连接成功");
  //侧边导航数据下载
function sildsDownload(){
      $.ajax({
        type:"get",
        url:"../data/side.json",
        success:function(arr){
         //console.log(arr);
         for(var i=0; i<arr.length; i++){
          $(`<li class=""><a href="#">${arr[i].title}</a><span>></span></li>`).appendTo(`#sideNav .navRow .box`);
           //取出子菜单
            var newArr =arr[i].childs;
            var node=$(` <ul class="box01"></ul>`);
            node.appendTo(`#sideNav #sildeList`);
            //console.log(newArr);
            for(var j=0; j<newArr.length; j++){
                $(` <li><img src="${newArr[j].img}" title="${newArr[j].state}"><a href="#">${newArr[j].state}</a></li> `).appendTo(node);
                
            }
        }
        },error:function(msg){
          console.log(msg);
        }
      })
}
//给侧导航添加移入移出
function sideNavTab(){
  $("#sideNav .navRow .box").on("mouseenter","li",function(){
     $(this).addClass("active");
    //找出对应的下标
    var index = $(this).index();
    $("#sildeList").css({display:"block"});
    $("#sildeList").find("ul").eq(index).css("display","block").siblings("ul").css("display","none");
   });
  //$("#sideNav").mouseleave(function(){
    // $("#sideNav").mouseleave(function(){
    //   $("#sildeList").css({display:"none"});
    // }); 
    $("#sideNav .navRow .box").on("mouseleave","li",function(){
    $(this).removeClass("active");
    $("#sildeList").css({display:"none"});
    }); 
}
    

    return{
      download:download,
      topNavTab:topNavTab,
      downloadCarousel:downloadCarousel,
      carousel:carousel,
      sildsDownload:sildsDownload,
      sideNavTab:sideNavTab,
    }
 });