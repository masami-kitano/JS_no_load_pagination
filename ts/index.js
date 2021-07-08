(function () {
    'use strict';
    var worksList = document.querySelectorAll('.works__list-content');
    var pageNums = document.querySelectorAll('.page-num');
    var previousPostLink = document.getElementById('previous-post-link');
    var leftNum = document.getElementById('left-num');
    var centerNum = document.getElementById('center-num');
    var rightNum = document.getElementById('right-num');
    var nextPostLink = document.getElementById('next-post-link');
    var range = 1;
    var maxRange = 3;
    var maxPageNum = 0;
    var workItemCount = 0;
    worksList.forEach(function (workItem, index) {
        // 最初のレンダリングで4つ目以降の要素を削除
        if (index > 2) {
            workItem.style.display = 'none';
        }
        // workItemの数をカウント
        workItemCount++;
    });
    // workItemの総数から最大ページ数を算出
    maxPageNum = Math.ceil(workItemCount / maxRange);
    // 最初は1からスタートなので、前ページリンクは削除
    previousPostLink.style.display = 'none';
    // ページネーション番号をクリックした際の処理
    pageNums.forEach(function (pageNum) {
        pageNum.addEventListener('click', function () {
            var worksGroupNum = Number(this.innerText);
            switchPreviousLink();
            switchNextLink(worksGroupNum);
            switchItem(worksList, worksGroupNum);
            pageNums.forEach(function (pageNum) {
                pageNum.classList.remove('current');
            });
            if (worksGroupNum === 1) {
                currentFirstPage();
                previousPostLink.style.display = 'none';
                leftNum.classList.add('current');
            }
            else if (worksGroupNum === maxPageNum) {
                currentLastPage();
                previousPostLink.style.display = 'block';
                rightNum.classList.add('current');
            }
            else {
                switchNum(worksGroupNum);
                previousPostLink.style.display = 'block';
                centerNum.classList.add('current');
            }
        });
    });
    // 前リンクをクリックした際の処理
    previousPostLink.addEventListener('click', function (e) {
        console.log(e);
        console.log(this);
        var previousNum = 0;
        pageNums.forEach(function (pageNum) {
            if (pageNum.classList.contains('current')) {
                if (Number(pageNum.innerText) === 1) {
                    previousNum = 1;
                }
                else {
                    previousNum = Number(pageNum.innerText) - 1;
                }
                pageNum.classList.remove('current');
            }
        });
        if (previousNum === 1) {
            leftNum.classList.add('current');
        }
        else {
            centerNum.classList.add('current');
        }
        nextPostLink.style.display = 'block';
        switchPreviousLink();
        switchItem(worksList, previousNum);
        if (previousNum === 1) {
            currentFirstPage();
            previousPostLink.style.display = 'none';
        }
        else {
            switchNum(previousNum);
            previousPostLink.style.display = 'block';
        }
    });
    // 次リンクをクリックした際の処理
    nextPostLink.addEventListener('click', function () {
        var nextNum = 0;
        pageNums.forEach(function (pageNum) {
            if (pageNum.classList.contains('current')) {
                nextNum = Number(pageNum.innerText) + 1;
                pageNum.classList.remove('current');
            }
        });
        if (nextNum === maxPageNum) {
            rightNum.classList.add('current');
        }
        else {
            centerNum.classList.add('current');
        }
        switchPreviousLink();
        switchNextLink(nextNum);
        switchItem(worksList, nextNum);
        if (nextNum === maxPageNum) {
            currentLastPage();
            nextPostLink.style.display = 'none';
        }
        else {
            switchNum(nextNum);
        }
    });
    /* -------------
      関数
    ------------- */
    // 表示要素の切り替え用の関数
    var switchItem = function (itemList, switchCondition) {
        itemList.forEach(function (item) {
            if (Number(item.dataset.workGroupIndex) === switchCondition) {
                item.style.display = 'block';
            }
            else {
                item.style.display = 'none';
            }
        });
    };
    // ページネーションの番号切り替え用の関数
    var switchNum = function (num) {
        leftNum.innerText = (num - range);
        centerNum.innerText = num;
        rightNum.innerText = num + range;
    };
    // 前ページリンクの表示切り替え用の関数
    var switchPreviousLink = function () {
        if (leftNum.classList.contains('current') &&
            Number(leftNum.innerText) === 1) {
            previousPostLink.style.display = 'none';
        }
        else {
            previousPostLink.style.display = 'block';
        }
    };
    // 次ページリンクの表示切り替え用の関数
    var switchNextLink = function (num) {
        if (num === maxPageNum) {
            nextPostLink.style.display = 'none';
        }
        else {
            nextPostLink.style.display = 'block';
        }
    };
    // 1ページ
    var currentFirstPage = function () {
        leftNum.innerText = '1';
        centerNum.innerText = '2';
        rightNum.innerText = '3';
    };
    // ラストページ
    var currentLastPage = function () {
        leftNum.innerText = maxPageNum - 2;
        centerNum.innerText = maxPageNum - 1;
        rightNum.innerText = maxPageNum;
    };
})();
