//计时器。
var n_timer;
var time;
var n_ms = 0; //毫秒
var n_sec = 0; //秒
var n_min = 0; //分
var n_hour = 0; //时

function timer() {
    return setInterval(function() {
        var str_sec = n_sec;
        var str_min = n_min;
        var str_hour = n_hour;
        var str_ms = n_ms;
        if (n_sec < 10) {
            str_sec = "0" + n_sec;
        }
        if (n_min < 10) {
            str_min = "0" + n_min;
        }
        if (n_hour < 10) {
            str_hour = "0" + n_hour;
        }
        if (n_ms < 10) {
            str_ms = "00" + str_ms;
        }
        if (n_ms >= 10 && n_ms < 100) {
            str_ms = "0" + str_ms;
        }
        time = str_hour + ":" + str_min + ":" + str_sec + " " + str_ms;

        $("#timeCounter").text(time);
        n_ms = n_ms + 151;
        if (n_ms >= 1000) {
            n_ms = n_ms - 1000;
            n_sec++;
        }
        if (n_sec > 59) {
            n_sec = 0;
            n_min++;
        }
        if (n_min > 59) {
            n_sec = 0;
            n_hour++;
        }
    }, 151);
}

//开始计时。
function start() {
    clearInterval(n_timer);
    n_sec = 0;
    n_min = 0;
    n_hour = 0;
    $("#timeCounter").text("00:00:00 000");
    n_timer = timer();
}

//停止计时。
function stop() {
    clearInterval(n_timer);
}


//显示数据
var dataSource;
var product; //指向setInterval()函数，以便于清除。
var totalCount; //用来设定每隔多少时间刷新一次统计数据，记录该函数。
var i; //计数器，用来依次打出数据。
var fileId; //表示打出第几个文件。
var range = 1; //用来记录一级分类的三级分类文件数目。
var startId = 0; //用来记录从哪个文件开始。
var flag = false; //标记用户是否选择了商品。

//var goodsCount = 0; //累计抓取商品条数。
var moreGoodsCount = 0; //新增条数。
var totalPrice = 0; //累计商品总价。
//var totalSaleCount = 0; 累计商品总销量。
var totalCommentCount = 0; //累计商品评论总数。
var totalRate = 0; //累计商品好评度。
var whatGoods; //记录用户所选的商品大类，以便后面分析。

//记录存储商品抓取总数。
if (!localStorage.totalGoodsCount) {
    localStorage.totalGoodsCount = 2421428;
}

//获取当前日期时间并以格式“yyyy-MM-dd HH:MM:SS”显示。
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

function getNowDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function showData(src) {

    i = 0;
    return setInterval(function() {
        $.getJSON(src, function(result) {

            if (i < result.length) {
                $("#show").append("<tr><td>" + result[i].id + "</td><td>" + result[i].name + "</td><td>" + result[i].price + "</td><td>" + result[i].comment_count + "</td><td>" + result[i].rate + "</td><td>" + getNowFormatDate() + "</td></tr>");

                //添加每一行数据的进入动画。
                $("#show tr").addClass("animated fadeInUp");
                //使scrollBar一直保持在显示框的最底部。
                var height = $("#partbRight")[0].scrollHeight;
                $("#partbRight").scrollTop(height);

                //每一条数据刷新之后，进行相应的统计。
                localStorage.totalGoodsCount++;
                moreGoodsCount++;
                totalPrice += parseFloat(result[i].price);
                if (!isNaN(parseInt(result[i].comment_count))) {
                    totalCommentCount += parseInt(result[i].comment_count);
                }
                if (!isNaN(parseInt(result[i].rate))) {
                    totalRate += parseInt(result[i].rate);
                }
                i++;
            } else {
                //刷新完一个数据文件，随机选择下一个文件继续刷新。
                clearInterval(product);
                fileId = Math.floor(Math.random() * range) + startId;
                product = showData("./data/product_" + fileId + ".json");

            }
        });
    }, 150);
}

//显示用户选择的商品类别。
function showChoice() {
    var choice = document.getElementsByName("goods");

    if (choice[0].checked) {
        $("#theChoice").html("个护化妆、清洁用品、宠物");
    } else {
        if (choice[1].checked) {
            $("#theChoice").html("母婴、玩具乐器");
        } else {
            if (choice[2].checked) {
                $("#theChoice").html("男装、女装、童装、内衣");
            } else {
                if (choice[3].checked) {
                    $("#theChoice").html("鞋靴、箱包、珠宝、奢侈品");
                }
            }
        }
    }
}

//显示刷新数据计算出来的统计数据。
function showTotalCount() {

    return setInterval(function() {
        $("#sampleCount").html(localStorage.totalGoodsCount);
        $("#moreSampleCount").html(moreGoodsCount);
        $("#averagePrice").html((totalPrice / moreGoodsCount).toFixed(2));
        $("#averageCommentCount").html((totalCommentCount / moreGoodsCount).toFixed(2));
        $("#averageRate").html((totalRate / moreGoodsCount).toFixed(2) + "%");
    }, 200);
}

//清零函数。把计时器、统计数据都清零。
function toClear() {
    $("#timeCounter").text("00:00:00 000");
    $("#show").html("");

    n_sec = 0;
    n_min = 0;
    n_hour = 0;

    moreGoodsCount = 0;
    totalPrice = 0;
    totalRate = 0;
    totalSaleCount = 0;
    totalCommentCount = 0;

    $("#moreSampleCount").html("0");
    $("#averagePrice").html("0");
    $("#averageSaleCount").html("0");
    $("#averageCommentCount").html("0");
    $("#averageRate").html("0%");
}

var isStopOrNot = true; //标识刷新数据的动作是否停止。
var transOrNot = true; //标识是否需要分析动画。
var refreshDataOrNot = true; //标识是否刷新数据。
var relativeRatioOfPrice; //标识价格环比增长情况。
var relativeRatioOfComment; //标识评论数环比增长情况。
var relativeRatioOfGoodComment; //标识好评数环比增长情况。
var absoluteRatioOfPrice; //标识价格同比增长情况。
var absoluteRatioOfComment; //标识评论数同比增长情况。
var absoluteRatioOfGoodComment; //标识好评数同比增长情况。
var contributeRate1; //标识价格贡献系数。
var contributeRate2; //标识评论数贡献系数。
var contributeRate3; //标识好评数贡献系数。


var analyseOrNot = false; //标识是否有数据可以进行分析。
$(document).ready(function() {
    $("#date").html(getNowDate());

    $("#sampleCount").html(localStorage.totalGoodsCount);
    $("#btn1").click(function() {
        toClear();
        clearInterval(totalCount);

        var choice = document.getElementsByName("goods");
        if (choice[0].checked) {
            range = 34;
            startId = 1;
            flag = true;
            whatGoods = "个护化妆、清洁用品、宠物";
        } else {
            if (choice[1].checked) {
                range = 22;
                startId = 36;
                flag = true;
                whatGoods = "母婴、玩具乐器";
            } else {
                if (choice[2].checked) {
                    range = 21;
                    startId = 59;
                    flag = true;
                    whatGoods = " 男装、女装、童装、内衣 ";
                } else {
                    if (choice[3].checked) {
                        range = 19;
                        startId = 81;
                        flag = true;
                        whatGoods = "鞋靴、箱包、珠宝、奢侈品 ";
                    } else {
                        alert("您还没有选择商品类别。请先选择商品！");
                    }
                }
            }
        }
        if (flag) {
            start();
            fileId = Math.floor(Math.random() * range) + startId;

            clearInterval(product);
            product = showData("./data/product_" + fileId + ".json");
            isStopOrNot = false;
            analyseOrNot = true;
            refreshDataOrNot = true;
            setTimeout(function(){ 
            totalCount = showTotalCount();
        },200);
        }
    });

    //用户点击停止之后，停止计时器、停止刷新数据，并最后显示统计结果。
    $("#btn2").click(function() {
        stop();
        clearInterval(product);
        setTimeout(function(){
        if(moreGoodsCount!=0){
        $("#sampleCount").html(localStorage.totalGoodsCount);
        $("#moreSampleCount").html(moreGoodsCount);
        $("#averagePrice").html((totalPrice / moreGoodsCount).toFixed(2));
        $("#averageCommentCount").html((totalCommentCount / moreGoodsCount).toFixed(2));
        $("#averageRate").html((totalRate / moreGoodsCount).toFixed(2) + "%");
    }},200);
        clearInterval(totalCount);
        isStopOrNot = true;
    });

    //清零的处理事件。
    $("#clear").click(function() {
        toClear();
        analyseOrNot = false;
    });

    //用户点击商品分类后，显示用户选择的商品分类。
    $("#choose").click(function() {
        showChoice();
    });


    //用户点击分析之后，显示分析结果。
    $("#analyse").click(function() {
        if (analyseOrNot && isStopOrNot) {
            $(".whatGoodsToAnalyse").html(whatGoods);


            if (refreshDataOrNot) {
                //生成分析数据的随机数。
                relativeRatioOfPrice = Math.random() * 0.4 + 0.2;
                relativeRatioOfComment = Math.random() * 0.4 + 0.2;
                relativeRatioOfGoodComment = Math.random() * 0.4 + 0.2;
                absoluteRatioOfPrice = Math.random() * 4 + 2;
                absoluteRatioOfComment = Math.random() * 4 + 2;
                absoluteRatioOfGoodComment = Math.random() * 4 + 2;
                contributeRate1 = Math.random() * 40 + 30;
                contributeRate2 = Math.random() * 40 + 30;
                contributeRate3 = Math.random() * 40 + 30;

                //写入随机数据。
                $("#relativeRatioOfPriceId").html(relativeRatioOfPrice.toFixed(2) + "%");
                $("#relativeRatioOfCommentId").html(relativeRatioOfComment.toFixed(2) + "%");
                $("#relativeRatioOfGoodCommentId").html(relativeRatioOfGoodComment.toFixed(2) + "%");
                $("#absoluteRatioOfPriceId").html(absoluteRatioOfPrice.toFixed(2) + "%");
                $("#absoluteRatioOfCommentId").html(absoluteRatioOfComment.toFixed(2) + "%");
                $("#absoluteRatioOfGoodCommentId").html(absoluteRatioOfGoodComment.toFixed(2) + "%");
                $("#contributeRate1Id").html(contributeRate1.toFixed(1));
                $("#contributeRate2Id").html(contributeRate2.toFixed(1));
                $("#contributeRate3Id").html(contributeRate3.toFixed(1));
            }
            refreshDataOrNot = false;

            if (transOrNot) {

                var holdTime = (Math.floor(Math.random() * 20) + 30) * 100;
                $("#bg-box").removeClass("hide");
                transOrNot = false;
            }
            setTimeout(function() {
                $("#tableShow").addClass("hide");
                $("#partbRight").removeClass("scroll");
                $("#bg-box").addClass("hide");
                $("#analyseResult").removeClass("hide");
                $("#analyseResult").removeClass("animated fadeOut");
                $("#analyseResult").addClass("animated fadeIn");
            }, holdTime);
        } else {
            if (!isStopOrNot) {
                alert("数据抓取还未停止，请先点击停止按钮！");
            } else {
                alert("您还没有获取数据，请先点击开始按钮获取数据！");
            }
        }
    });

    //用户点击图标之后，返回显示数据列表。
    $("#back").click(function() {
        transOrNot = true;

        $("#analyseResult").removeClass("animated fadeIn");
        $("#analyseResult").addClass("animated fadeOut");
        setTimeout(function() {
            $("#analyseResult").addClass("hide");
            $("#partbRight").addClass("scroll")
            $("#tableShow").removeClass("hide");
        }, 1000);
    });

});
