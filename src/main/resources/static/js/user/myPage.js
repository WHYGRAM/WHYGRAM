const profileInputElem = document.querySelector('#profileInput');
const profileImgBtnElem = document.querySelector('#profileImgBtn');
const profileUploadElem = document.querySelector('#profileUpload');

profileImgBtnElem.addEventListener('click', () => {
    profileInputElem.click();
});