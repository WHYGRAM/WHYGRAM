const joinFrmElem = document.querySelector('#joinFrm');
const emailElem = joinFrmElem.email;
const nmElem = joinFrmElem.nm;
const birthDtElem = joinFrmElem.birthDt;
const nickNmElem = joinFrmElem.nickNm;
const pwElem = joinFrmElem.pw;
const pw2Elem = joinFrmElem.pw2;

const ok = "green";
const warn = "pink";

emailElem.addEventListener('input', (e) => {checkId(e);});

function checkId(e) {
    let email = e.target.value;

    // regExp 검사
    regExpEmail(email);
    // ajax 중복 검사

}

function regExpEmail(email) {
    const exp = new RegExp("","g");
}



