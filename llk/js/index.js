(function($){  
    $(window).load(function(){  
        $(".modal-body").mCustomScrollbar({  
            theme:"minimal-dark", //主题颜色  
            scrollButtons:{  
                enable:true //是否使用上下滚动按钮  
            },  
            autoHideScrollbar: true, //是否自动隐藏滚动条  
            scrollInertia :0,//滚动延迟  
            horizontalScroll : false,//水平滚动条  
            callbacks:{  
                onScroll: function(){} //滚动完成后触发事件  
            }  
        });  
                      
    });  
              
})(jQuery);

window.game_num = 1;
window.showTime = 7;//展示时间（easy）
window.allTime = 60;//游戏时间（easy）
window.score = 0;//本轮积分（easy）
window.allScore = 0;//累计积分（easy）
window.imgArrNum = [];//图片数组记录
window.imgExit = [];//图片数组状态记录

window.turnoverBeforeNum = 0;//记录前一个翻转的图片

$(document).ready(function(){
    //$("#img1").attr("src","img/0.png");
    //startGame();

});

function startGame(mode){//开始游戏，设置相关参数
    if(mode == 'easy'){

    }else{
        if(mode == "middle"){
            window.showTime = 5;
            window.allTime = 45;
        }else{
            window.showTime = 3;
            window.allTime = 30;
        }
    }

    $("#game_num").html(window.game_num);
    createImgArrNum();
}

function createImgArrNum(){//创建随机图片分布，以及记录相关数组
    window.imgArrNum = [];
    var times = [0,0,0,0,0,0];
    for( ; window.imgArrNum.length < 30; ){
        var num = Math.floor(Math.random()*5) + 1;
        if(times[num] < 6){
            imgArrNum.push(num);
            times[num]++;
        }
    }
    
    for(var i = 1;i<=30; i++){
        $("#img"+i).attr("src","img/"+ window.imgArrNum[i-1]+".png");
        window.imgExit.push(0);
    }

    setTimeout(function(){
        for(var i = 1; i <= 30; i++){
            $("#img"+i).attr("src","img/0.png");
        }
    },window.showTime*1000);
}

function turnoverImg(num){//翻转图片，并做匹配判断。
    if(window.imgExit[num-1] == 0){
        $("#img"+num).attr("src","img/"+ window.imgArrNum[num-1]+".png");
        console.log(num);
        if(window.turnoverBeforeNum != 0){
            console.log(window.imgArrNum[num]);
            console.log(window.imgArrNum[window.turnoverBeforeNum]);
            if(window.imgArrNum[num] == window.imgArrNum[window.turnoverBeforeNum] && num != window.turnoverBeforeNum){
                setTimeout(function(){
                    $("#img"+num).addClass("hide");
                    $("#img"+window.turnoverBeforeNum).addClass("hide");
                },1000);
                window.turnoverBeforeNum = 0;
                return ;
            }else{

            }
        }
        window.turnoverBeforeNum = num;
        setTimeout(function(){
            $("#img"+num).attr("src","img/0.png");
        },2000);

    }
}