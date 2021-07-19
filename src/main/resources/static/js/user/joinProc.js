//이벤트 연결
emailIdElem.addEventListener("input", () => {
    if (isvalid(emailIdElem, emailExp) && isNotEmpty(emailAdrsElem)) {emailCheck();}
    isvalid2(emailIdElem, emailExp, "이메일을 입력해주세요", "");
    pushJoinBtn();
});
emailIdElem.addEventListener("click", () => {
    if (isvalid(emailIdElem, emailExp) && isNotEmpty(emailAdrsElem)) {emailCheck();}
    isvalid2(emailIdElem, emailExp, "이메일을 입력해주세요", "");
    pushJoinBtn();
});
emailAdrsElem.addEventListener("click", () => {
    if (isvalid(emailIdElem, emailExp) && isNotEmpty(emailAdrsElem)) {emailCheck();}
    isNotEmpty2(emailAdrsElem, "이메일 주소를 선택해주세요.", "");
    pushJoinBtn();
});

nmElem.addEventListener('click', () => {
    isvalid2(nmElem, nmExp, nmMsg, "");
    pushJoinBtn();
});
nmElem.addEventListener('input', () => {
    isvalid2(nmElem, nmExp, nmMsg, "");
    pushJoinBtn();
});

yearSelElem.addEventListener('click', () => {
    isNotEmpty2(yearSelElem, "년도를 선택해주세요.", "");
    pushJoinBtn();
});
monSelElem.addEventListener('click', () => {
    isNotEmpty2(monSelElem, "달을 선택해주세요.", "");
    pushJoinBtn();
});
daySelElem.addEventListener('click', () => {
    isNotEmpty2(daySelElem, "날짜를 선택해주세요.", "");
    pushJoinBtn();
});

nickNmElem.addEventListener('click', () => {
    if (isvalid(nickNmElem, nickNmExp)) {nickNmCheck();}
    isvalid2(nickNmElem, nickNmExp, nickNmMsg, "");
    pushJoinBtn();
});
nickNmElem.addEventListener('input', () => {
    if (isvalid(nickNmElem, nickNmExp)) {nickNmCheck();}
    isvalid2(nickNmElem, nickNmExp, nickNmMsg, "");
    pushJoinBtn();
});

pwElem.addEventListener('click', () => {
    pwCheck(pwElem, pw2Elem, pwExp, pwMsg);
    pushJoinBtn();
});
pwElem.addEventListener('input', () => {
    pwCheck(pwElem, pw2Elem, pwExp, pwMsg);
    pushJoinBtn();
});

pw2Elem.addEventListener('click', () => {
    pwCheck(pwElem, pw2Elem, pwExp, pwMsg);
    pushJoinBtn();
});
pw2Elem.addEventListener('input', () => {
    pwCheck(pwElem, pw2Elem, pwExp, pwMsg);
    pushJoinBtn();
});


