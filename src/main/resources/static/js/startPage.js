// 로그인, 회원가입, 비밀번호 찾기 클릭 elem, 함수, 이벤트
const loginSpn = document.querySelector('.loginSpn');
const joinSpn = document.querySelector('.joinSpn');
const loginSectn = document.querySelector('.loginSectn');
const joinSectn = document.querySelector('.joinSectn');
const findPwElem = document.querySelector('#findPw');

// 로그인, 회원가입, 비밀번호 찾기 중 클릭된 링크 색깔 바꾸기
function clicked(strSpnChked, strSpn, strSpn2, strSectnChecked, strSectn) {
    strSpnChked.style.color = "green";
    strSpn.style.color = "grey";
    strSpn2.style.color = "grey";
    strSectnChecked.style= "";
    strSectn.style.display="none";
}

loginSpn.addEventListener('click', () => {clicked(loginSpn, joinSpn, findPwElem, loginSectn, joinSectn);});
joinSpn.addEventListener('click', () => {clicked(joinSpn, loginSpn, findPwElem, joinSectn, loginSectn);});
findPwElem.addEventListener('click', () => {
    clicked(findPwElem, loginSpn, joinSpn, loginSectn, joinSectn);
});

// submit 버튼 활성화
function btn(str1Elem, str2Elem, strBtn) {
    if (isNotEmpty(str1Elem) && isNotEmpty(str2Elem)) {
        strBtn.disabled = false;
    } else {
        strBtn.disabled = true;
    }
}

//빈값 체크
function isNotEmpty(strElem) {
    if (strElem.value) {
        return true;
    }
    return false;
}

function isNotEmpty2(strElem, strMsg, okMsg) { // +ok()+warn()-boolean
    if (strElem.value) {
        ok(strElem, okMsg);
    } else {
        warn(strElem, strMsg);
    }
}

// AJAX 헤더와 초기화
function init(param) {
    const init = {
        method : 'POST',
        headers:{
            'accept' : 'application/json',
            'content-type' : 'application/json;charset=UTF-8'
        },
        body : JSON.stringify(param)
    };
    return init;
}



