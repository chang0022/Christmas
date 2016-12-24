/**
 * Created by Chang on 2016/12/23.
 */
window.onload = function() {
    var phoneBtn = document.querySelector('#js-phoneBtn');
    var phoneInput = document.querySelector('#js-phoneInput');
    var nowPhone = '';
    var nowData = {};

    var myShakeEvent = new Shake({
        threshold: 15
    });
    var flag = false;
    phoneBtn.addEventListener('click', function () {
        var value = phoneInput.value;
        nowPhone = value;

        if (localStorage.getItem(value) == 0) {
            openBox('sorry-box');
            return false;
        }
        if (isPhone(value)) {
            User.forEach(function (v) {
                if (v.phone == nowPhone) {
                    nowData.phone = v.phone;
                    nowData.awards = v.awards;
                    nowData.image = v.image;
                    nowData.result = v.result;
                    nowData.desc = v.desc;
                    flag = true
                }
            });
            if(!flag) {
                nowData.phone = nowPhone;
                nowData.awards = 5;
            }
            myShakeEvent.start();
        }
    });


    window.addEventListener('shake', shakeEventDidOccur, false);


    var s = 3;
    var results = document.querySelector('#js-results');
    function shakeEventDidOccur () {
        var times = document.querySelector('#js-gameTime');
        var game = document.querySelector('.game-times h2');
        if (nowData.awards == 5) {
            if (s > 0) {
                s--;
                times.innerHTML = s;
                results.innerHTML = '<p>' + randomMsg() + '</p>';
                openBox('gift-box');
                myShakeEvent.stop();
                localStorage.setItem(nowData.phone, s);
            } else {
                game.innerHTML = 'Game Over';
                myShakeEvent.stop();
            }
        } else {
            if (s > 1) {
                s--;
                times.innerHTML = s;
                results.innerHTML = '<p>' + randomMsg() + '</p>';
                openBox('gift-box');
                myShakeEvent.stop();

                localStorage.setItem(nowData.phone, s);
            } else if (s > 0) {
                s--;
                results.innerHTML = '<p>' + nowData.result + '</p><p><img class="result-image" src="'+ nowData.image +'"></p><p>' + nowData.desc + '</p><p><a href="card.html" class="get-link">跳转领取</a></p>';
                game.innerHTML = 'Game Over';
                myShakeEvent.stop();
                openBox('gift-box');

                localStorage.setItem(nowData.phone, s);
            } else {
                game.innerHTML = 'Game Over';
                myShakeEvent.stop();
            }
        }
    }

    function isPhone(value) {
        var tel = /^1[34578]\d{9}$/;
        if(tel.test(value)) {
            closeMask();
            return true;
        } else {
            errorMsg();
            return false;
        }
    }

    function errorMsg() {
        var error = document.querySelector('#js-error');
        error.setAttribute('class', 'show');
        setTimeout(function () {
            error.setAttribute('class', '');
        }, 2000);
    }

    function closeMask() {
        var mask = document.querySelector('#mask');
        mask.style.display = 'none';
    }

    function openMask() {
        var mask = document.querySelector('#mask');
        mask.style.display = 'block';
    }
    function openBox(boxName) {
        var box = document.querySelectorAll('.confirm-box');
        var len = box.length;
        openMask();
        for (var i = 0; i < len; i++) {
            var v = box[i];
            if(v.className.indexOf(boxName) == -1) {
                v.style.display = 'none';
            } else {
                v.style.display = 'block';
            }
        }
    }
    document.querySelector('#js-ruleBtn').addEventListener('click', function (e) {
        var openName = this.getAttribute('data-open');
        openBox(openName);
    });
    document.querySelector('#js-Close').addEventListener('click', function (e) {
        var openName = e.target.dataset.open;
        openBox(openName)
    });

    document.querySelector('#js-openGift').addEventListener('click', function (e) {
        var openName = e.target.dataset.open;
        openBox(openName)
    });

    document.querySelector('#js-ColorResult').addEventListener('click', function () {
        var mask = document.querySelector('#mask');
        mask.style.display = 'none';
        myShakeEvent.start();
    });

    document.querySelector('.js-music').addEventListener('click', playPause);
};

function playPause() {
    var music = document.querySelector('#bg-music');
    var musicBnt = document.querySelector('.js-music');
    if (music.paused){
        music.play();
        addClass(musicBnt, 'music-on');        }
    else{
        music.pause();
        removeClass(musicBnt, 'music-on');
    }
}

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function randomMsg() {
    var len = Thanks.length;
    var index = parseInt(len*Math.random());
    return Thanks[index];
}
var addRippleEffect = function (e) {
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'button') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
};

document.addEventListener('click', addRippleEffect, false);