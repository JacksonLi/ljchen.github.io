//游戏规则说明
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

//“新手上路”难度的参数对象
var easyModel = {
    row_num:5,
    col_num:6,

    game1:{
        //游戏开始后，所有图片展示的时间
        showTime:7,
        //游戏倒计时的总时间
        lastTime:70,
        //每次消除一对图片，所获得的积分
        scorePerTime:10,
        //游戏过关后，剩余每秒钟的奖励积分
        scorePerSecond:5,
    },
    game2:{
        showTime:6,
        lastTime:65,
        scorePerTime:12,
        scorePerSecond:8,
    },
    game3:{
        showTime:6,
        lastTime:60,
        scorePerTime:13,
        scorePerSecond:10,
    },
    game4:{
        showTime:5,
        lastTime:60,
        scorePerTime:15,
        scorePerSecond:12,
    },
    game5:{
        showTime:5,
        lastTime:55,
        scorePerTime:16,
        scorePerSecond:15,
    },
    game6:{
        showTime:5,
        lastTime:50,
        scorePerTime:18,
        scorePerSecond:18,
    },
    game7:{
        showTime:4,
        lastTime:50,
        scorePerTime:20,
        scorePerSecond:20,
    },
    game8:{
        showTime:4,
        lastTime:45,
        scorePerTime:22,
        scorePerSecond:25,
    },
    game9:{
        showTime:3,
        lastTime:40,
        scorePerTime:25,
        scorePerSecond:30,
    }
};
//“正常驾驶”难度的参数对象
var middleModel = {
    row_num:7,
    col_num:8,
    game1:{
        //游戏开始后，所有图片展示的时间
        showTime:7,
        //游戏倒计时的总时间
        lastTime:70,
        //每次消除一对图片，所获得的积分
        scorePerTime:10,
        //游戏过关后，剩余每秒钟的奖励积分
        scorePerSecond:10,
    },
    game2:{
        showTime:6,
        lastTime:65,
        scorePerTime:12,
        scorePerSecond:12,
    },
    game3:{
        showTime:6,
        lastTime:60,
        scorePerTime:13,
        scorePerSecond:15,
    },
    game4:{
        showTime:5,
        lastTime:60,
        scorePerTime:15,
        scorePerSecond:18,
    },
    game5:{
        showTime:5,
        lastTime:55,
        scorePerTime:16,
        scorePerSecond:20,
    },
    game6:{
        showTime:5,
        lastTime:50,
        scorePerTime:18,
        scorePerSecond:25,
    },
    game7:{
        showTime:4,
        lastTime:50,
        scorePerTime:20,
        scorePerSecond:30,
    },
    game8:{
        showTime:4,
        lastTime:45,
        scorePerTime:22,
        scorePerSecond:35,
    },
    game9:{
        showTime:3,
        lastTime:40,
        scorePerTime:25,
        scorePerSecond:40,
    }
};
//“老司机飙车”难度的参数对象
var difficultModel = {
    row_num:8,
    col_num:8,
    game1:{
        //游戏开始后，所有图片展示的时间
        showTime:7,
        //游戏倒计时的总时间
        lastTime:70,
        //每次消除一对图片，所获得的积分
        scorePerTime:10,
        //游戏过关后，剩余每秒钟的奖励积分
        scorePerSecond:20,
    },
    game2:{
        showTime:6,
        lastTime:65,
        scorePerTime:12,
        scorePerSecond:25,
    },
    game3:{
        showTime:6,
        lastTime:60,
        scorePerTime:13,
        scorePerSecond:30,
    },
    game4:{
        showTime:5,
        lastTime:60,
        scorePerTime:15,
        scorePerSecond:35,
    },
    game5:{
        showTime:5,
        lastTime:55,
        scorePerTime:16,
        scorePerSecond:40,
    },
    game6:{
        showTime:5,
        lastTime:50,
        scorePerTime:18,
        scorePerSecond:50,
    },
    game7:{
        showTime:4,
        lastTime:50,
        scorePerTime:20,
        scorePerSecond:60,
    },
    game8:{
        showTime:4,
        lastTime:45,
        scorePerTime:22,
        scorePerSecond:80,
    },
    game9:{
        showTime:3,
        lastTime:40,
        scorePerTime:25,
        scorePerSecond:100,
    }
};

//全局对象的参数
window.game_num = 1;//游戏关卡
window.showTime = 7;//展示时间（easy）
window.lastTime = 70;//游戏时间（easy）
window.score = 0;//本轮积分（easy）
window.allScore = 0;//累计积分（easy）
window.imgArrNum = [];//图片数组记录
window.startOrNot = false;//标记游戏开始与否
window.scorePerTime = 10;//每次消除一对，增加的分数
window.scoreOfRound = 150;//每个关卡通关的分数
window.gameModel = 'easy';//记录游戏难度等级
window.gameModelEN = '新手上路';//记录游戏等级的中文名称

window.turnoverBeforeNum = 0;//记录前一个翻转的图片
window.style = 'car';//记录游戏主题

//最新的图片对象
window.imgObject1 = {
    isNull:true,
};
//上一次点击的图片对象
window.imgObject2 = {
    isNull:true,
};

$(document).ready(function(){
    //$("#img1").attr("src","img/0.png");

    //startGame();

});

//开始游戏，设置相关参数
function startGame(){
    //隐藏掉开始游戏按钮
    $("#start_game").attr("disabled","disabled");
    $("#mode").attr("disabled","disabled");
    $("#style").attr("disabled","disabled");
    //获取玩家选择的难度等级
    var mode = $("#mode option:selected").val();
    window.style = $("#style option:selected").val();
    //根据玩家选择的难度等级，初始化相关参数
    if(mode == 'easy'){
        window.gameModel = 'easy';
        window.showTime = easyModel.game1.showTime;
        window.lastTime = easyModel.game1.lastTime;
        window.scorePerSecond = easyModel.game1.scorePerSecond;
        window.scorePerTime = easyModel.game1.scorePerTime;
        window.scoreOfRound = window.scorePerTime*15;
        window.gameModelEN = '新手上路';
    }else{
        if(mode == "middle"){
            window.gameModel = 'middle';
            window.showTime = middleModel.game1.showTime;
            window.lastTime = middleModel.game1.lastTime;
            window.scorePerSecond = middleModel.game1.scorePerSecond;
            window.scorePerTime = middleModel.game1.scorePerTime;
            window.scoreOfRound = window.scorePerTime*15;
            window.gameModelEN = '正常驾驶';
        }else{
            window.gameModel = 'difficult';
            window.showTime = difficultModel.game1.showTime;
            window.lastTime = difficultModel.game1.lastTime;
            window.scorePerSecond = difficultModel.game1.scorePerSecond;
            window.scorePerTime = difficultModel.game1.scorePerTime;
            window.scoreOfRound = window.scorePerTime*15;
            window.gameModelEN = '老司机飙车';
        }
    }
    //显示游戏的初始相关数据
    window.score = 0;
    window.allScore = 0;
    window.game_num = 1;
    $("#remain_second").html(window.lastTime);
    $("#game_model_en").html(window.gameModelEN);
    $("#game_model_en").removeClass("hide");
    $("#game_num").html(window.game_num);
    $("#the_score").html(window.score);
    $("#all_score").html(window.allScore);
    window.startOrNot = true;

    $("#game_board").removeClass("hide");
    $("#ready").addClass("hide");
    $("#pass_game").addClass("hide");
    $("#pass_all_game").addClass("hide");
    $("#fail_game").addClass("hide");
    createImgArrNum();
}

//创建随机图片分布，以及记录相关数组
function createImgArrNum(){
    //初始化图片数字数组为空
    window.imgArrNum = [];
    //记录每张图片出现的次数，最多不能超过6次
    var times = [0,0,0,0,0,0];
    //生成30张图片的数字数组
    for( ; window.imgArrNum.length < 30; ){
        //产生数字随机数
        var num = Math.floor(Math.random()*5) + 1;
        //这个随机数的次数要小于6次
        if(times[num] < 6){
            window.imgArrNum.push(num);
            times[num]++;
        }
    }
    //为图片赋值，展示图片
    for(var i = 1; i<=30; i++){
        $("#img"+i).attr("src","img/"+ window.style +"/"+window.imgArrNum[i-1]+".png");
        $("#img"+i).removeClass("hide");
    }
    //展示时间结束后，图片翻转
    setTimeout(function(){
        for(var i = 1; i <= 30; i++){
            $("#img"+i).attr("src","img/"+window.style+"/0.png");
        }
        //游戏倒计时开始
        countDown();
    },window.showTime*1000);
}

//每张照片被点击后的处理函数，翻转图片，并做匹配判断
function turnoverImg(num){
    //如果不处于游戏状态，点击图片时会报错
    if(!window.startOrNot){
        alert("请先点击开始游戏！");
        return ;
    }
    //判断当前图片对象isNull参数是否为true
    if(window.imgObject1.isNull){
        //展示被点击的图片
        $("#img"+num).attr("src","img/"+window.style+"/"+ window.imgArrNum[num-1]+".png");
        //设置当前图片对象的相关参数
        window.imgObject1.num = num;
        window.imgObject1.isNull = false;
    }else{
        //展示被点击的图片
        $("#img"+num).attr("src","img/"+window.style +"/"+ window.imgArrNum[num-1]+".png");
        //判断前后两张图片是否相同，且不为同一张图片
        if(num != window.imgObject1.num && window.imgArrNum[num-1] == window.imgArrNum[window.imgObject1.num-1]){
            //记录前一张图片的序号
            var numMark = window.imgObject1.num;
            //0.5秒后，将匹配的两张图片隐藏，并增加积分
            setTimeout(function(){
                $("#img"+num).addClass("hide");
                $("#img"+numMark).addClass("hide");
                window.score = window.score + window.scorePerTime;
                $("#the_score").html(window.score);
                //每次增加积分后，判断所有图片是否消除完，即本关是否通过
                passOrNot();
            },500);
            //将图片对象清空
            window.imgObject1.isNull = true;
            window.imgObject1.num = 0;
        }else{
            //记录前一张图片的序号
            var numMark = window.imgObject1.num;
            //1秒后将不匹配的两张图片翻转回去
            setTimeout(function(){
                $("#img"+num).attr("src","img/"+window.style + "/0.png");
                $("#img"+numMark).attr("src","img/"+window.style +"/0.png");
            },1000);
            //将图片对象清空
            window.imgObject1.isNull = true;
            window.imgObject1.num = 0;
        }
    }
}

var timeInterval;//计时器对象，便于清除计时器

//检测本关卡是否通过
function passOrNot(){
    //如果本关累计得分等于本关消除图片的总得分，则为过关
    if(window.score == window.scoreOfRound){
        //过关后，将更新积分
        //本关积分
        window.score = window.score + window.lastTime*window.scorePerSecond;
        $("#the_score").html(window.score);
        //总积分
        window.allScore = window.allScore + window.score;
        $("#all_score").html(window.allScore);
        $("#remain_second").html(window.lastTime);
        window.clearInterval(timeInterval);
        //alert("恭喜您通过了本关卡！");
        //游戏块隐藏，显示恭喜过关页面
        if(window.game_num != 9){
            $("#game_board").addClass("hide");
            $("#pass_game").removeClass("hide");
        }else{
            //通过所有关卡
            $("#pass_model_name").html(window.gameModelEN);
            $("#game_board").addClass("hide");
            $("#pass_all_game").removeClass("hide");
            //恢复选择功能
            $("#start_game").removeAttr("disabled");
            $("#mode").removeAttr("disabled");
            $("#style").removeAttr("disabled");
            //出现烟花效果
            $("#firework").removeClass("hide");
            setTimeout(function(){
                $("#firework").addClass("hide");
            },5000);
        }
    }
}

//倒计时函数
function countDown(){
    $("#remain_second").html(window.lastTime);
    timeInterval = setInterval(function(){
        if(window.lastTime == 0){
            //游戏时间结束
            $("#remain_second").html(window.lastTime);
            //alert("时间到，游戏结束！");
            $("#game_board").addClass("hide");
            $("#fail_game").removeClass("hide");
            //清除计时器
            window.clearInterval(timeInterval);
        }else{
            //游戏时间未结束，则减一秒
            window.lastTime--;
            $("#remain_second").html(window.lastTime);
        }
    },1000);
}

//继续挑战
function nextGame(){
    //游戏关数+1
    window.game_num++;

    var gameNum = "game"+window.game_num;
    if(window.gameModel == 'easy'){
        window.showTime = easyModel[gameNum].showTime;
        window.lastTime = easyModel[gameNum].lastTime;
        window.scorePerSecond = easyModel[gameNum].scorePerSecond;
        window.scorePerTime = easyModel[gameNum].scorePerTime;
        window.scoreOfRound = window.scorePerTime*15;
    }else{
        if(window.gameModel == 'middle'){
            window.showTime = middleModel[gameNum].showTime;
            window.lastTime = middleModel[gameNum].lastTime;
            window.scorePerSecond = middleModel[gameNum].scorePerSecond;
            window.scorePerTime = middleModel[gameNum].scorePerTime;
            window.scoreOfRound = window.scorePerTime*15;
        }else{
            window.showTime = difficultModel[gameNum].showTime;
            window.lastTime = difficultModel[gameNum].lastTime;
            window.scorePerSecond = difficultModel[gameNum].scorePerSecond;
            window.scorePerTime = difficultModel[gameNum].scorePerTime;
            window.scoreOfRound = window.scorePerTime*15;
        }
    }
    //显示相关数据
    $("#remain_second").html(window.lastTime);
    window.score = 0;
    $("#game_num").html(window.game_num);
    $("#the_score").html(window.score);
    $("#all_score").html(window.allScore);

    $("#game_board").removeClass("hide");
    $("#pass_game").addClass("hide");
    $("#pass_all_game").addClass("hide");
    $("#fail_game").addClass("hide");
    createImgArrNum();
}

//重新挑战
function replayGame(){
    //关数不增加，直接开始游戏
    window.game_num--;
    nextGame();
}

//退出游戏
function quitGame(){
    $("#start_game").removeAttr("disabled");
    $("#mode").removeAttr("disabled");
    $("#style").removeAttr("disabled");

    $("#ready").removeClass("hide");
    $("#game_board").addClass("hide");
    $("#pass_game").addClass("hide");
    $("#pass_all_game").addClass("hide");
    $("#fail_game").addClass("hide");

    window.score = 0;
    window.allScore = 0;
    $("#the_score").html(window.score);
    $("#all_score").html(window.allScore);
}