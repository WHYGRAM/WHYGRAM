//msg와 form과 input elem
const warnMsgDiv = document.querySelector('.warnMsg');

const joinFrmElem = document.querySelector('#joinFrm');
const joinBtnElem = joinFrmElem.joinBtn;

const joinEmailElem = document.querySelector('.joinEmail');
const emailIdElem = joinFrmElem.emailId;
const emailAdrsElem = joinFrmElem.emailAdrs;

const nmElem = joinFrmElem.nm;
const nickNmElem = joinFrmElem.nickNm;
const pwElem = joinFrmElem.pw;
const pw2Elem = joinFrmElem.pw2;

const birthElem = document.querySelector('#users_date_birth');
const yearSelElem = joinFrmElem.yearSel;
const monSelElem = joinFrmElem.monSel;
const daySelElem = joinFrmElem.daySel;

//regExp 설정과 유효성 검사 함수
const emailExp = "^[a-zA-z0-9가-힣]{1,50}$";
const nmExp = "^[가-힣]{2,5}$";
const nickNmExp = "^[a-zA-z0-9가-힣]{2,12}$";
const pwExp = "^[a-zA-z0-9!@#$%^&*]{8,16}$";

const nmMsg = "이름은 한글로 2~5자 이내로 입력해주세요.";
const nickNmMsg = "닉네임은 영문대소문자, 한글로 2~12자 이내로 입력해주세요.";
const pwMsg = "비밀번호는 영문대소문자, 특수문자(!@#$%^&*)로 8~16자 이내로 입력해주세요.";

function isvalid(strElem, strExp) {
    let exp = new RegExp(strExp, "g");
    if (exp.exec(strElem.value) !== null && isNotEmpty(strElem)) {
        return true;
    }
    return false;
}

function isvalid2(strElem, strExp, strMsg, okMsg) {   // +ok()+warn()-boolean
    let exp = new RegExp(strExp, "g");
    if (exp.exec(strElem.value) !== null && isNotEmpty(strElem)) {
        ok(strElem, okMsg);
    } else {
        warn(strElem, strMsg);
    }
}

//email 완성 함수 AJAX 중복 검사
function completeEmail() {
    let emailId = emailIdElem.value;
    let emailAdrs = emailAdrsElem.value;
    let joinEmail = emailId + emailAdrs;
    return joinEmail;
}

/*
function emailCheck() {
    joinEmailElem.value = completeEmail();
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
 */

//비번검사
function pwCheck(pwElem, pw2Elem, pwExp, pwMsg) {
    if (isvalid(pwElem, pwExp)) {  // 둘 다 유효성 합격이다
        if (pwElem.value === pw2Elem.value) { // 비번 서로 일치한다.
            ok(pwElem, "");
            ok(pw2Elem, "");
        } else { //비번 일치하지 않는다.
            warn(pw2Elem, "비밀번호가 일치하지 않습니다.");
        }
    } else { // pw가 유효성 불합격이거나 pw2가 비어있다.
        warn(pwElem, pwMsg);
        warn(pw2Elem, "비밀번호를 확인해주세요.");
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
        joinBtnElem.disabled = false;
    } else {
        joinBtnElem.disabled = true;
    }
}
