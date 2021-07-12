const loginSpn = document.querySelector('.loginSpn');
const joinSpn = document.querySelector('.joinSpn');
const loginSectn = document.querySelector('.loginSectn');
const joinSectn = document.querySelector('.joinSectn');

function clicked(strSpnChked, strSpn, strSectnChecked, strSectn) {
    strSpnChked.style.color = "green";
    strSpn.style.color = "grey";
    strSectnChecked.style= "";
    strSectn.style.display="none";
}

loginSpn.addEventListener('click', () => {clicked(loginSpn, joinSpn, loginSectn, joinSectn)});
joinSpn.addEventListener('click', () => {clicked(joinSpn, loginSpn, joinSectn, loginSectn)});

/********* 비밀번호 모달창 ********/
const findPwElem = document.querySelector('#findPw');
const modalFindPwElem = document.querySelector('.modal');
const modalCloseIcon = document.querySelector('.modal_close_icon');
const textchkElem = document.querySelector('.textchk');
const chkbtnElem = document.querySelector('.chkbtn');

// 모달창 열기
findPwElem.addEventListener('click', () => {
    modalFindPwElem.classList.remove('hide');
});

// 모달창 닫기

if(findPwElem) {
    modalCloseIcon.addEventListener('click', () => {
        modalFindPwElem.classList.add('hide');
    });
}

// 모달창에 입력값이 있으면 버튼 활성화
textchkElem.addEventListener('keyup', () => {
    chkbtnElem.classList.remove('disable');
});