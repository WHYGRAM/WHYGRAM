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

if(followElemArr) {
    followElemArr.forEach(item => {
        item.addEventListener('click', () => {
            modalTitleElem.innerText = '팔로우';

            fetch(`followList?follow_hisFollower=${mypageConstElem.dataset.pid}`)
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

function makeFollowItem(item) {
    //테이블
    const profileTable = document.createElement('tr');
    const profileImgTd = document.createElement('td');
    const profileNmTd = document.createElement('td');
    const profileFollowTd = document.createElement('td');
    
    profileTable.append(profileImgTd);
    profileTable.append(profileNmTd);
    profileTable.append(profileFollowTd);
    
    profileNmTd.className = 'pointer';
    profileNmTd.addEventListener('click', () => { moveToMypage(item.users_id); });
    
    //내용
    const imgTg = document.createElement('img');
    const nmSpn = document.createElement('span');
    const nickNmSpn = document.createElement('span');
    const followBtn = document.createElement('button');
    const followIcn = document.createElement('i');
    
    profileImgTd.append(imgTg);
    profileNmTd.append(nmSpn);
    profileNmTd.append(nickNmSpn);
    profileFollowTd.append(followBtn);
    followBtn.append(followIcn);
    
    imgTg.className = 'pointer wh30 profileRadius';
    if (`${item.users_img}`) {
        imgTg.src = `/pic/profile/${item.users_id}/${item.users_img}`;
    } else {
        imgTg.src = '/img/profile/defaultProfile.png';
    }
    imgTg.onerror = () => { onError(imgTg, "wh30"); }
    imgTg.addEventListener('click', () => {moveToMypage(item.users_id);})
    
    followBtn.className = 'pointer';
    // i 정하기
    
}