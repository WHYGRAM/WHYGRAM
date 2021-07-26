let profileImg = null;
const profileInputElem = document.querySelector('.profileInput');
const profileImgElem = document.querySelector('.profileImg');

profileImgElem.addEventListener('click', () => {
    profileInputElem.click();
});

// 이미지가 선택되면 추가
profileInputElem.addEventListener('change', ()=> {
    const imgData = profileInputElem.value.substring('C:\\fakepath\\'.length);
    if(imgData) {
        profileImg = profileInputElem.files[0];
        changeImg();
    }
});

function changeImg() {
    const data = new FormData();
    console.log(profileImg);
    if(profileImg) {
        data.append('users_img', profileImg);
    }
    fetch('/profile/mypage', {
        method: 'POST',
        body: data
    }).then(res => res.json())
        .then(myJson => {
            switch(myJson.result) {
                case 0:
                    alert('프로필이미지 등록에 실패하였습니다.');
                    break;
                case 1:
                    location.href = '/profile/mypage';
                    break;
            }
        });
};





