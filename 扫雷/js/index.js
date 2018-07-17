var oBtn = document.getElementById('btn');
var oBox = document.getElementById('box');
var oFlagBox = document.getElementById('flagBox');
var oAlertBox = document.getElementById('alertBox');
var oAlertImg = document.getElementById('alertImg');
var oClose = document.getElementById('close');
var oPrice = document.getElementById('price');
var minesNum;  //记录有多少雷
var minesOver //记录已经被标记的雷的数量
var minesMap = [];
var startGame = true;


oBtn.onclick = function () {
    if (startGame) {
        oBox.style.display = 'block';
        oFlagBox.style.display = 'block';
        init();
        startGame = false;

    }


};
oClose.onclick = function () {
    startGame=true;
    oBox.style.display = 'none';
    oAlertBox.style.display = 'none';
    oFlagBox.style.display = 'none';
    oBox.innerHTML = '';
}
oBox.oncontextmenu = function () {
    return false;
};
oBox.onmousedown = function (e) {
    var event = e.target;
    if (e.which == 1) {
        leftClick(event);
    }
    else if (e.which == 3) {
        rightClick(event);

    }
};

function init() {
    minesNum = 10;
    minesOver = 10;
    oPrice.innerHTML = minesOver;

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
        for (var i = 0; i < aIsMines.length; i++) {
            aIsMines[i].classList.add('show');
        }
        setTimeout(function () {
            oAlertBox.style.display = 'block';
            oAlertImg.style.backgroundImage = 'url("img/gameover.jpg")';

        }, 1000)
    }
    else {
        var n = 0;
        var arr = dom && dom.getAttribute('id').split('-');
        var arrX = arr && +arr[0];
        var arrY = arr && +arr[1];
        dom && dom.classList.add('num');
        for (var i = arrX - 1; i <= arrX + 1; i++) {
            for (var j = arrY - 1; j <= arrY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isMines')) {
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = arrX - 1; i <= arrX + 1; i++) {
                for (var j = arrY - 1; j <= arrY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('checked')) {
                            nearBox.classList.add('checked');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}

function rightClick(dom) {
    if (dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');
    if (dom.classList.contains('isMines') && dom.classList.contains('flag')) {
        minesOver--;
    }
    if (dom.classList.contains('isMines') && !dom.classList.contains('flag')) {
        minesOver++;
    }
    oPrice.innerHTML = minesOver;
    if (minesOver == 0) {
        oAlertBox.style.display = 'block';
        oAlertImg.style.backgroundImage = 'url("img/success.jpg")';
    }


}