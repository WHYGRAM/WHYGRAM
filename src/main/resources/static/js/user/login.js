const loginFrmElem = document.querySelector('#loginFrm');
const loginEmailElem = loginFrmElem.users_email;
const loginPWElem = loginFrmElem.users_password;
const loginBtnElem = loginFrmElem.loginBtn;

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