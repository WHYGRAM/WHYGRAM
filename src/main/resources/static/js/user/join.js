//msg와 form과 input elem
const msgDiv = document.querySelector('#msg');
const joinFrmElem = document.querySelector('#joinFrm');
const emailElem = joinFrmElem.email;
const nmElem = joinFrmElem.nm;
const birthDtElem = joinFrmElem.birthDt; //아직 하지말기
const nickNmElem = joinFrmElem.nickNm;
const pwElem = joinFrmElem.pw;
const pw2Elem = joinFrmElem.pw2;
const joinBtnElem = joinFrmElem.joinBtn;

//검사 결과 담을 변수 (0-불합격 , 1-합격)
let email = 0; //중복
let nm = 0;
let nickNm = 0;
let pw = 0;
let pw2 = 0;
let equalPw = 0; //비번 서로 일치
let result = email * nm * nickNm * pw * pw2 * equalPw; // 0이 아니면 버튼 활성화

//input 색깔
const ok = "green";
const warn = "pink";

//regExp 설정과 함수
const nmExp = "^[가-힣]{2,5}$";
const nickNmExp = "^[a-zA-z0-9가-힣]{2,12}$";
const pwExp = "^[a-zA-z0-9!@#$%^&*]{8,16}$";

const nmMsg = "이름은 한글로 2~5자 이내로 입력해주세요.";
const nickNmMsg = "닉네임은 영문대소문자, 한글로 2~12자 이내로 입력해주세요.";
const pwMsg = "비밀번호는 영문대소문자, 특수문자(!@#$%^&*)로 8~16자 이내로 입력해주세요.";

function validCheck(strExp, strVal, strMsg, str) {
    let exp = new RegExp(strExp, "g");
    if (strVal == "" || exp.exec(strVal) === null) {
        msgDiv.innerText = strMsg;
        msgDiv.classList.add('msg'); //css
    }
    this.str += 1;
}

//email AJAX 중복 검사

//비번 일치검사
function equalPwCheck(pwVal, pw2Val) {
    if (pw !== pw2) {
        msgDiv.innerText = "비밀번호가 일치하지 않습니다.";
        msgDiv.classList.add('msg'); //css
    }
    this.pw += 1;
    this.pw2 += 1;
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






