//msg, form, input, span elem
const warnMsgDiv = document.querySelector('.warnMsg');

const joinFrmElem = document.querySelector('#joinFrm');
const joinBtnElem = joinFrmElem.joinBtn;

const joinEmailElem = document.querySelector('#joinEmail');
const emailIdElem = joinFrmElem.emailId;
const emailAdrsElem = joinFrmElem.emailAdrs;
const emSpanElem = document.querySelector('.chkSpan.emSpan');

const nmElem = joinFrmElem.nm;
const nickNmElem = joinFrmElem.nickNm;
const nickNmSpanElem = document.querySelector('.chkSpan.nickNmSpan');
const pwElem = joinFrmElem.pw;
const pw2Elem = joinFrmElem.pw2;

const birthElem = document.querySelector('#users_date_birth');
const yearSelElem = joinFrmElem.yearSel;
const monSelElem = joinFrmElem.monSel;
const daySelElem = joinFrmElem.daySel;

//이메일, 닉네임 중복여부
let isEmailChk = false;
let isNickChk = false;

//input 색깔
function ok(strElem, strMsg) {
    strElem.style.backgroundColor = "LightGreen ";
    warnMsgDiv.innerText = strMsg;
}
function warn(strElem, strMsg) {
    strElem.style.backgroundColor = "pink";
    warnMsgDiv.innerText = strMsg;
}

//regExp 설정과 유효성 검사 함수
const emailExp = "^[a-zA-z0-9가-힣]{1,50}$";
const nmExp = "^[가-힣]{2,5}$";
const nickNmExp = "^[a-zA-z0-9가-힣]{2,12}$";
const pwExp = "^[a-zA-z0-9!@#$%^&*]{8,16}$";

const nmMsg = "이름은 한글로 2~5자 이내로 입력해주세요.";
const nickNmMsg = "닉네임은 영문대소문자, 한글로 2~12자 이내로 입력해주세요.";
const pwMsg = "비밀번호는 영문대소문자, 특수문자(!@#$%^&*)로 8~16자 이내로 입력해주세요.";

function isvalid(strElem, strExp) {
    const exp = new RegExp(strExp, "g");
    if (exp.exec(strElem.value) && isNotEmpty(strElem)) {
        return true;
    }
    return false;
}

function isvalid2(strElem, strExp, strMsg, okMsg) {   // +ok()+warn()-boolean
    const exp = new RegExp(strExp, "g");
    if (exp.exec(strElem.value) && isNotEmpty(strElem)) {
        ok(strElem, okMsg);
    } else {
        warn(strElem, strMsg);
    }
}

//email 완성 함수 AJAX 중복 검사
function completeEmail() {
    const emailId = emailIdElem.value;
    const emailAdrs = emailAdrsElem.value;
    const users_email = emailId + emailAdrs;
    return users_email;
}

function emailCheck() {
    joinEmailElem.value = completeEmail();
    const users_email = joinEmailElem.value;
    console.log(users_email);

    if (!isvalid(emailIdElem, emailExp) || !isNotEmpty(emailAdrsElem)) { return; }

    fetch('/user/emailCheck/' + users_email)
        .then(res => res.json())
        .then(myJson => {
            console.log(myJson);
          if(myJson.result == 0) { //중복검사 통과
              emSpanElem.innerHTML = '<i class="fas fa-check-circle"></i>';
              isEmailChk = true;
              pushJoinBtn();
              ok(emailIdElem, "사용가능한 이메일입니다. 이메일 인증이 필요한 점 유의해 주세요.");
          } else { //아이디 중복됨
              emSpanElem.innerHTML='<i class="fas fa-exclamation-triangle"></i>';
              isEmailChk = false;
              pushJoinBtn();
              warn(emailIdElem, "중복된 이메일입니다.");
          }
    });
}


//닉네임 AJAX 중복 검사
function nickNmCheck() {
    const nickNm = nickNmElem.value;
    console.log(nickNm);

    if (!isvalid(nickNmElem, nickNmExp)) { return; }

    fetch('/user/nickNmCheck/' + nickNm)
        .then(res => res.json())
        .then(myJson => {
            console.log(myJson);
            if(myJson.result == 0) { //중복검사 통과
                nickNmSpanElem.innerHTML = '<i class="fas fa-check-circle"></i>';
                isNickChk = true;
                pushJoinBtn();
                ok(nickNmElem, "사용가능한 닉네임입니다.");
            } else { //닉네임 중복됨
                nickNmSpanElem.innerHTML='<i class="fas fa-exclamation-triangle"></i>';
                isNickChk = false;
                pushJoinBtn();
                warn(nickNmElem, "중복된 닉네임입니다.");
            }
        });
}


//비번검사
function pwCheck(pwElem, pw2Elem, pwExp, pwMsg) {
    if (isvalid(pwElem, pwExp)) {  //비밀번호는 ok
        if (pwElem.value === pw2Elem.value) { // 비번 서로 일치한다.
            ok(pwElem, "");
            ok(pw2Elem, "");
        } else { //비번 일치하지 않는다.
            warn(pw2Elem, "비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요.");
        }
    } else { // pw나 pw2가 비어있다. 유효성 지키라고 한다.
        warn(pwElem, pwMsg);
        warn(pw2Elem, pwMsg);
    }
}

function pwCheck2(pwElem, pw2Elem, pwExp) { // 둘 다 유효성 합격이고 일치한다
    if (isvalid(pwElem, pwExp) && (pwElem.value === pw2Elem.value)) {
        return true;
    }
    return false;
}

//생년월일 완성 함수
function completeBirth() {
    let year = yearSelElem.value;
    let mon = monSelElem.value;
    let day = daySelElem.value;

    if (mon < 10) {
        mon = "0" + mon.toString();
    }
    if (day < 10) {
        day = "0" + day.toString();
    }
    const birthDate = year.toString() + mon.toString() + day.toString();
    return  birthDate;
}

// 버튼 활성화 함수
function pushJoinBtn() {
    joinEmailElem.value = completeEmail();
    birthElem.value = completeBirth();
    if (isvalid(emailIdElem, emailExp) && isNotEmpty(emailAdrsElem) && isvalid(nmElem, nmExp)
    && isNotEmpty(yearSelElem) && isNotEmpty(monSelElem) && isNotEmpty(daySelElem) && isvalid(nickNmElem, nickNmExp)
    && pwCheck2(pwElem, pw2Elem, pwExp)) {
        if (!isEmailChk || !isNickChk) {
            joinBtnElem.disabled = true;
        } else {
            joinBtnElem.disabled = false;
        }
    } else {
        joinBtnElem.disabled = true;
    }
}
