//msg와 form과 input elem
const warnMsgDiv = document.querySelector('.warnMsg');
const joinFrmElem = document.querySelector('#joinFrm');
const emailElem = joinFrmElem.email;
const nmElem = joinFrmElem.nm;
const birthDtElem = joinFrmElem.birthDt; //아직 하지말기
const nickNmElem = joinFrmElem.nickNm;
const pwElem = joinFrmElem.pw;
const pw2Elem = joinFrmElem.pw2;
const joinBtnElem = joinFrmElem.joinBtn;

//input 색깔
function ok(strElem) {
    strElem.style.backgroundColor = "green";
    warnMsgDiv.innerText = "";
}
function warn(strElem, strMsg) {
    strElem.style.backgroundColor = "pink";
    warnMsgDiv.innerText = strMsg;
}

const nmExp = "^[가-힣]{2,5}$";
const nickNmExp = "^[a-zA-z0-9가-힣]{2,12}$";
const pwExp = "^[a-zA-z0-9!@#$%^&*]{8,16}$";

const nmMsg = "이름은 한글로 2~5자 이내로 입력해주세요.";
const nickNmMsg = "닉네임은 영문대소문자, 한글로 2~12자 이내로 입력해주세요.";
const pwMsg = "비밀번호는 영문대소문자, 특수문자(!@#$%^&*)로 8~16자 이내로 입력해주세요.";

//regExp 설정과 함수
function isvalid(strElem, strExp, strMsg) {
    let exp = new RegExp(strExp, "g");
    if (exp.exec(strElem.value) !== null && isNotEmpty(strElem)) {
        ok(strElem);
        return true;
    }
    warn(strElem, strMsg);
    return false;

}

//빈값 체크
function isNotEmpty(strElem) {
    if (strElem.value) {
        return true;
    }
    return false;
}

//email AJAX 중복 검사
function emailCheck(strElem) {
    const param = {users_email : emailElem.value};
    const init = {
        method : 'POST',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(param)
    };

    fetch('/user/emailCheck',init) //컨트롤러, 서비스 작업 해야함
        .then(res => res.json())
        .then(myJson => {
          console.log(myJson);
          if(myJson.result === 0) { //중복검사 통과
              ok(strElem);
          } else { //아이디 중복됨
              warn(strElem, "중복된 이메일입니다.");
          }
        });
}

//비번검사
function pwCheck(pwElem, pw2Elem, pwExp, pwMsg) {
    if (isvalid(pwElem, pwExp, pwMsg) && isNotEmpty(pw2Elem)) { // 둘 다 빈값이 아니고
        if (pwElem.value === pw2Elem.value) { // 서로 일치하면
            ok(pwElem);
            ok(pw2Elem);
        } else { // 둘 다 빈값은 아니지만 서로 일치하지 않으면
            warn(pwElem, "");
            warn(pw2Elem, "비밀번호가 일치하지 않습니다.");
        }
    } else if (!isvalid(pwElem, pwExp, pwMsg)){ // pw가 유효성 검사 탈락
        warn(pwElem, pwMsg);
    } else if(!isNotEmpty(pw2Elem)) { //pw2가 빈값
        warn(pw2Elem, "비밀번호를 확인해주세요.");
    }
}

//input과 이벤트 연결
emailElem.addEventListener("blur", e => {}); //중복검사만

nmElem.addEventListener('click', () => {});
nmElem.addEventListener('input', e => {});

nickNmElem.addEventListener('click', () => {});
nickNmElem.addEventListener('input', e => {});

pwElem.addEventListener('click', () => {}); //일치검사 추가
pwElem.addEventListener('input', e => {});

pw2Elem.addEventListener('click', () => {});
pw2Elem.addEventListener('input', e => {});


//let txt = e.target.value;
