const loginSpn = document.querySelector('.loginSpn');
const joinSpn = document.querySelector('.joinSpn');
const loginSectn = document.querySelector('.loginSectn');
const joinSectn = document.querySelector('.joinSectn');

function clicked(strSpnChked, strSpn, strSectnChecked, strSectn) {
    strSpnChked.style.color = "green";
    strSpn.style.color = "grey";
    strSectnChecked.style= "";
    strSectn.style.display="none";
}

loginSpn.addEventListener('click', () => {clicked(loginSpn, joinSpn, loginSectn, joinSectn)});
joinSpn.addEventListener('click', () => {clicked(joinSpn, loginSpn, joinSectn, loginSectn)});
