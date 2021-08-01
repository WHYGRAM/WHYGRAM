function moveToMypage(uId) { location.href = '/profile/mypage?users_id=' + uId; }

const imgIcon = document.createElement('i');
imgIcon.className = 'bi bi-person-circle';

const logoutElem = document.querySelector('.header__right>.right__icon>.logout');
logoutElem.addEventListener('mouseout', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-closed-fill"></i>`});
logoutElem.addEventListener('mouseover', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-open-fill"></i>`});
