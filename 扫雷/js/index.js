var oBtn = document.getElementById('btn');
var oBox = document.getElementById('box');
var oFlagBox = document.getElementById('flagBox');
var oAlertBox=document.getElementById('alertBox');
var minesNum;  //记录有多少雷
var minesOver //记录已经被标记的雷的数量
var minesMap = [];


oBtn.onclick = function () {
    oBox.style.display = 'block';
    oFlagBox.style.display = 'block';
    init();
};
oBox.oncontextmenu = function () {
    return false;
};
oBox.onmousedown = function (e) {
    var event = e.target;
    if (e.which == 1) {
        leftClick(event);
    }
    else if (e.which == 2) {
        rightClick(event);

    }
};

function init() {
    minesNum = 10;
    minesOver = 10;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var oDiv = document.createElement('div');
            oDiv.className = 'block';
            oDiv.setAttribute('id', i + '-' + j);
            oBox.append(oDiv);
            minesMap.push({mine: 0})

        }
    }
    aBlock = document.getElementsByClassName('block');
    while (minesNum) {
        var minesIndex = Math.floor(Math.random() * 100);
        if (minesMap[minesIndex].mine === 0) {
            minesMap[minesIndex].mine = 1;
            aBlock[minesIndex].className += ' isMines';
            minesNum--;
        }
    }


}

function leftClick(dom) {
    var aIsMines = document.getElementsByClassName('isMines');
    if (dom && dom.classList.contains('isMines')) {
        console.log(11);
        for (var i=0;i<aIsMines.length;i++){
            aIsMines[i].classList.add('show');
        }
        setTimeout(function(){
            oAlertBox.style.display='block';
        },1000)
    }
    else {
        var n = 0;
        

    }
}