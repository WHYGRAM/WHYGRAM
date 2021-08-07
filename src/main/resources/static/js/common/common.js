function moveToMypage(uId) { location.href = '/profile/mypage?users_id=' + uId; }

const logoutElem = document.querySelector('.logout');
logoutElem.addEventListener('mouseout', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-closed-fill"></i>`});
logoutElem.addEventListener('mouseover', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-open-fill"></i>`});

function getDateTimeInfo(dt) {
    const nowDt = new Date();
    const targetDt = new Date(dt);

    const nowDtSec = parseInt(nowDt.getTime() / 1000);
    const targetDtSec = parseInt(targetDt.getTime() / 1000);

    const diffSec = nowDtSec - targetDtSec;
    if(diffSec < 120) {
        return '1분 전';
    } else if(diffSec < 3600) { //분 단위
        return `${parseInt(diffSec / 60)}분 전`;
    } else if(diffSec < 86400) { //시간 단위
        return `${parseInt(diffSec / 3600)}시간 전`;
    } else if(diffSec < 604800) { //일 단위
        return `${parseInt(diffSec / 86400)}일 전`;
    }
    return targetDt.toLocaleString();
}