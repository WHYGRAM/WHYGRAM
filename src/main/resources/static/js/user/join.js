//msg와 form과 input elem
const warnMsgDiv = document.querySelector('.warnMsg');
const joinFrmElem = document.querySelector('#joinFrm');
const emailIdElem = joinFrmElem.emailId;
const emailAdrsElem = joinFrmElem.emailAdrs;
const nmElem = joinFrmElem.nm;
const yearSelElem = joinFrmElem.yearSel;
const monSelElem = joinFrmElem.monSel;
const daySelElem = joinFrmElem.daySel;
const nickNmElem = joinFrmElem.nickNm;
const pwElem = joinFrmElem.pw;
const pw2Elem = joinFrmElem.pw2;
const joinBtnElem = joinFrmElem.joinBtn;


//input 색깔
function ok(strElem, strMsg) {
    strElem.style.backgroundColor = "green";
    warnMsgDiv.innerText = strMsg;
}
function warn(strElem, strMsg) {
    strElem.style.backgroundColor = "pink";
    warnMsgDiv.innerText = strMsg;
}

//regExp 설정과 함수
const emailExp = "^[a-zA-z0-9가-힣]{2,20}$";
const nmExp = "^[가-힣]{2,5}$";
const nickNmExp = "^[a-zA-z0-9가-힣]{2,12}$";
const pwExp = "^[a-zA-z0-9!@#$%^&*]{8,16}$";

const nmMsg = "이름은 한글로 2~5자 이내로 입력해주세요.";
const nickNmMsg = "닉네임은 영문대소문자, 한글로 2~12자 이내로 입력해주세요.";
const pwMsg = "비밀번호는 영문대소문자, 특수문자(!@#$%^&*)로 8~16자 이내로 입력해주세요.";

function isvalid(strElem, strExp, strMsg, okMsg) {
    let exp = new RegExp(strExp, "g");
    if (exp.exec(strElem.value) !== null && isNotEmpty(strElem)) {
        ok(strElem, okMsg);
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

//email 완성 함수 AJAX 중복 검사
function email() {
    let emailId = emailIdElem.value;
    let emailAdrs = emailAdrsElem.value;
    let joinEmail = emailId + emailAdrs;
    return joinEmail;
}

const joinEmailElem = document.querySelector('.joinEmail');
joinEmailElem.value = email();

function emailCheck() {
    const param = {users_email : joinEmailElem.value};
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
              ok(emailIdElem, "사용가능한 이메일입니다. 이메일 인증이 필요한 점 유의해 주세요.");
          } else { //아이디 중복됨
              warn(emailIdElem, "중복된 이메일입니다.");
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

//생년월일 완성 함수
function birth() {
    let year = yearSelElem.value;
    let mon = monSelElem.value;
    let day = daySelElem.value;

    if (mon < 10) {
        mon = "0" + mon.toString();
    }
    if (day < 10) {
        day = "0" + day.toString();
    }
    let birthDate = year.toString() + mon.toString() + day.toString();
    return  birthDate;
}

const birthElem = document.querySelector('#users_date_birth');
birthElem.value = birth();


//input과 이벤트 연결
emailIdElem.addEventListener("input", () => {
    isvalid(emailIdElem, emailExp, "이메일을 입력해주세요", "");
    emailCheck();
});

emailIdElem.addEventListener("click", () => {
    isvalid(emailIdElem, emailExp, "이메일을 입력해주세요", "");
    emailCheck();
});

nmElem.addEventListener('click', () => {
    isvalid(nmElem, nmExp, nmMsg);
});
nmElem.addEventListener('input', () => {
    isvalid(nmElem, nmExp, nmMsg);
});

nickNmElem.addEventListener('click', () => {});
nickNmElem.addEventListener('input', () => {});

pwElem.addEventListener('click', () => {}); //일치검사 추가
pwElem.addEventListener('input', () => {});

pw2Elem.addEventListener('click', () => {});
pw2Elem.addEventListener('input', () => {});

//전체검사 -> 셀렉트 검사 , input 검사 ->

//let txt = e.target.value;

