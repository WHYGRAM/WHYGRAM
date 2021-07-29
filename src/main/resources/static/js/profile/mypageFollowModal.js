const followerElemArr = document.querySelectorAll('.followerCnt');
const followElemArr = document.querySelectorAll('.followCnt');

const followModalElem = document.querySelector('#followModal');
const modalTitleElem = document.querySelector('#modalTitle');
const modalListElem = document.querySelector('#modalList')

if(followerElemArr) {
    followerElemArr.forEach(item => {
        item.addEventListener('click', () => {
            modalTitleElem.innerText = '팔로워';
            
            fetch(`followerList?follow_him=${mypageConstElem.dataset.pid}`)
                .then(res => res.json())
                .then(myJson => {
                    if(myJson.length > 0) {
                        myJson.forEach(item => {
                            const list = makeFollowItem(item);
                            modalListElem.append(list);
                        });
                    }
                });
        });
    });
}