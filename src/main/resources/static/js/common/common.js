function moveToMypage(uId) { location.href = '/profile/mypage?users_id=' + uId; }

const logoutElem = document.querySelector('.logout');
logoutElem.addEventListener('mouseout', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-closed-fill"></i>`});
logoutElem.addEventListener('mouseover', () => {logoutElem.innerHTML = `<i class="header-icon bi bi-door-open-fill"></i>`});
