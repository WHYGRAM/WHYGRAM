const loginFrmElem = document.querySelector('#loginFrm');
const loginEmailElem = loginFrmElem.users_email;
const loginPWElem = loginFrmElem.users_password;
const loginBtnElem = loginFrmElem.loginBtn;

//로그인 input 빈값 검사와 버튼 활성화

loginEmailElem.addEventListener('click', () => {
    btn(loginEmailElem, loginPWElem, loginBtnElem);
});
loginEmailElem.addEventListener('input', () => {
    btn(loginEmailElem, loginPWElem, loginBtnElem);
});

loginPWElem.addEventListener('click', () => {
    btn(loginEmailElem, loginPWElem, loginBtnElem);
});
loginPWElem.addEventListener('input', () => {
    btn(loginEmailElem, loginPWElem, loginBtnElem);
});