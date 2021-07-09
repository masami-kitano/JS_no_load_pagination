(function () {
    'use strict';
    var listItem = document.querySelectorAll('.item');
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
    listItem.forEach(function (workItem, index) {
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
    // 最大ページが2だった場合にrightNumは消す
    if (maxPageNum === 2) {
        rightNum.style.display = 'none';
    }
    // ページネーション番号をクリックした際の処理
    pageNums.forEach(function (pageNum) {
        pageNum.addEventListener('click', function () {
            var clickGroupNum = Number(this.innerText);
            if (maxPageNum === 2) {
                removeCurrentElement(pageNums);
                switchItem(listItem, clickGroupNum);
                switchNum(clickGroupNum);
                if (clickGroupNum === 1) {
                    leftNum.classList.add('current');
                    previousPostLink.style.display = 'none';
                    nextPostLink.style.display = 'block';
                }
                else {
                    centerNum.classList.add('current');
                    previousPostLink.style.display = 'block';
                    nextPostLink.style.display = 'none';
                }
            }
            else {
                switchPreviousLink();
                switchNextLink(clickGroupNum);
                switchItem(listItem, clickGroupNum);
                removeCurrentElement(pageNums);
                if (clickGroupNum === 1) {
                    currentFirstPage();
                    previousPostLink.style.display = 'none';
                    leftNum.classList.add('current');
                }
                else if (clickGroupNum === maxPageNum) {
                    currentLastPage();
                    previousPostLink.style.display = 'block';
                    rightNum.classList.add('current');
                }
                else {
                    switchNum(clickGroupNum);
                    previousPostLink.style.display = 'block';
                    centerNum.classList.add('current');
                }
            }
        });
    });
    // 前ページリンクを押下した際の処理
    previousPostLink.addEventListener('click', function () {
        if (maxPageNum === 2) {
            previousPostLink.style.display = 'none';
            nextPostLink.style.display = 'block';
            leftNum.classList.add('current');
            centerNum.classList.remove('current');
            switchItem(listItem, 1);
            switchNum(1);
        }
        else {
            var previousNum_1 = 0;
            pageNums.forEach(function (pageNum) {
                if (pageNum.classList.contains('current')) {
                    if (Number(pageNum.innerText) === 1) {
                        previousNum_1 = 1;
                    }
                    else {
                        previousNum_1 = Number(pageNum.innerText) - 1;
                    }
                    pageNum.classList.remove('current');
                }
            });
            nextPostLink.style.display = 'block';
            switchPreviousLink();
            switchItem(listItem, previousNum_1);
            if (previousNum_1 === 1) {
                currentFirstPage();
                previousPostLink.style.display = 'none';
                leftNum.classList.add('current');
            }
            else {
                switchNum(previousNum_1);
                previousPostLink.style.display = 'block';
                centerNum.classList.add('current');
            }
        }
    });
    // 次ページリンクを押下した際の処理
    nextPostLink.addEventListener('click', function () {
        if (maxPageNum === 2) {
            previousPostLink.style.display = 'block';
            nextPostLink.style.display = 'none';
            leftNum.classList.remove('current');
            centerNum.classList.add('current');
            switchItem(listItem, 2);
            switchNum(2);
        }
        else {
            var nextNum_1 = 0;
            pageNums.forEach(function (pageNum) {
                if (pageNum.classList.contains('current')) {
                    nextNum_1 = Number(pageNum.innerText) + 1;
                    pageNum.classList.remove('current');
                }
            });
            switchPreviousLink();
            switchNextLink(nextNum_1);
            switchItem(listItem, nextNum_1);
            if (nextNum_1 === maxPageNum) {
                currentLastPage();
                nextPostLink.style.display = 'none';
                rightNum.classList.add('current');
            }
            else {
                switchNum(nextNum_1);
                centerNum.classList.add('current');
            }
        }
    });
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
        if (maxPageNum === 2) {
            leftNum.innerText = '1';
            centerNum.innerText = '2';
        }
        else {
            leftNum.innerText = "" + (num - range);
            centerNum.innerText = "" + num;
            rightNum.innerText = "" + (num + range);
        }
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
        leftNum.innerText = "" + (maxPageNum - 2);
        centerNum.innerText = "" + (maxPageNum - 1);
        rightNum.innerText = "" + maxPageNum;
    };
    // currentクラスを削除
    var removeCurrentElement = function (pageNums) {
        pageNums.forEach(function (pageNum) {
            pageNum.classList.remove('current');
        });
    };
})();
