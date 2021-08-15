const followerElemArr = document.querySelectorAll('.followerCnt');
const followElemArr = document.querySelectorAll('.followCnt');

const modalTitleElem = document.querySelector('#modalTitle');
const modalListElem = document.querySelector('#modalList');


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
                            events();
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
    const btnFollow = document.createElement('div');
    const followIcn = document.createElement('i');
    
    profileImgTd.append(imgTg);
    profileNmTd.append(nmSpn);
    profileNmTd.append(nickNmSpn);
    profileFollowTd.append(btnFollow);
    btnFollow.append(followIcn);
    
    imgTg.className = 'pointer wh30 profileRadius';
    if (`${item.users_img}`) {
        imgTg.src = `/pic/profile/${item.users_id}/${item.users_img}`;
    } else {
        imgTg.src = '/img/profile/defaultProfile.png';
    }
    imgTg.addEventListener('click', () => { moveToMypage(item.users_id); })
    
    profileFollowTd.className = 'pointer';
    btnFollow.id = 'btnFollow';
    
    if (`${item.isYourFollower}`) {
        btnFollow.dataset.follow = 'unfollow1';
        followIcn.className = 'follow-icon bi bi-person-check';
    } else {
        btnFollow.dataset.follow = 'follow1';
        followIcn.className = 'follow-icon bi bi-person';
    }
    
    profileFollowTd.addEventListener('click' , () => {
        followProc(btnFollow.dataset.follow, item.users_id)
    });
    
    return profileTable;
}

