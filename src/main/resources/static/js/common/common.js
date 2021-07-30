function moveToMypage(uId) { location.href = '/profile/mypage?users_id=' + uId; }
function onError(img, wh) {
    img.style.visibility = 'hidden';
    imgIcon.classList.add(wh);
    img.append(imgIcon);
}

const imgIcon = document.createElement('i');
imgIcon.className = 'bi bi-person-circle';

const headerImg = document.querySelector('pointer.wh50.profileRadius.header-img');
headerImg.onerror = () => { onError(headerImg, "wh50") }

const logoutElem = document.querySelector('.header__right>.right__icon>.logout');
logoutElem.addEventListener('mouseout', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-closed-fill"></i>`});
logoutElem.addEventListener('mouseover', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-open-fill"></i>`});
