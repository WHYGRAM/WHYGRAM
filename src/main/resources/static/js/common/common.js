function moveToMypage(uId) { location.href = '/profile/mypage?users_id=' + uId; }

const logoutElem = document.querySelector('.header__right.right__icon .logout');
logoutElem.addEventListener('hover', () => {logoutElem.innerHTML = '<i class="bi bi-door-open-fill"></i>'});
