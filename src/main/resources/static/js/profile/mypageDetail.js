const mypageDetailModalElem = document.querySelector('#mypageDetailModal');
const detailProfile = document.querySelector('#detailProfile');
const imgBtnListElem = document.querySelector('#imgBtnList');
const imgListElem = document.querySelector('#imgList');
const ctntElem = document.querySelector('#ctnt');
const tableDivElem = document.querySelector('#tableDiv');
const cmtListElem = document.querySelector('#cmtList');
const icnListElem = document.querySelector('#icnList');

function showMypageDetail(feedId, mypageId, isFav, isCmt) {
    detailObj.feedId = feedId;
    detailObj.mypageId = mypageId;
    detailObj.isFav = isFav;
    detailObj.isCmt = isCmt;
    detailObj.getMypageDetail();
}

const detailObj = {
    loadingElem : document.querySelector('#modalList > #loading'),
    tableLoadingElem : document.querySelector('#tableLoading'),
    hideLoading : function () {this.loadingElem.classList.add('visually-hidden');},
    hidetableLoading : function () {this.tableLoadingElem.classList.add('visually-hidden');},
    showLoading : function () {this.loadingElem.classList.remove('visually-hidden');},
    showtableLoading : function () {this.tableLoadingElem.classList.remove('visually-hidden');},
    getMypageDetail : function () {
        this.showLoading();
        fetch(`/profile/mypageDetail?feed_id=${this.feedId}&mypage_id=${this.mypageId}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson);
                if (myJson) {
                    this.setMypageDetail(myJson);
                } else {
                    console.log('!  게시물디테일 없음');
                    imgListElem.innerHTML = `<div class="carousel-item active"><img src="/img/feed/empty.jpg" class="d-block w-100"></div>`;
                }
            }).catch(err => {
                console.log(err);
                imgListElem.innerHTML = `<div class="carousel-item active"><img src="/img/feed/error.jpg" class="d-block w-100"></div>`;
        }).then(() => {
                this.hideLoading();
            });
    },
    setMypageDetail : function (data) {
        //정보 넣어놓기
        mypageDetailModalElem.dataset.fid = `${data.feed_id}`;
        mypageDetailModalElem.dataset.uid = `${data.users_id}`;
        mypageDetailModalElem.dataset.regdt = `${data.feed_regdt}`;

        //프로필 [detailProfile]
        detailProfile.innerHTML = `
            <img src="/pic/profile/${data.users_id}/${data.users_img}"
            class="profileRadius rem_wh3"
            onError="this.src=/img/profile/defaultProfile.png">
            <span>${data.users_nickname}</span>
        `;

        //사진 [imgBtnListElem] , [imgListElem] , 정보 넣어놓기
        for(let i=0; i<data.contentsList.length; i++) {
            const item = data.contentsList[i];
            const btnId = `imgBtn${i}`;
            const divId = `imgDiv${i}`;

            //버튼
            const imgBtn = document.createElement('button');
            imgBtn.type = 'button';
            imgBtn.id = btnId;
            imgBtn.dataset.bsTarget = '#carouselExampleIndicators';
            imgBtn.dataset.bsSlideTo = `${i}`;
            imgBtn.setAttribute('aria-label',`Slide ${i+1}`);
            if (i===0) {imgBtn.className = "active"; imgBtn.setAttribute('aria-current','true');}
            imgBtnListElem.append(imgBtn);

            //사진
            const imgDiv = document.createElement('div');
            imgDiv.className = 'carousel-item';
            imgDiv.id = divId;
            imgDiv.dataset.fid = `${item.feed_id}`;
            imgDiv.dataset.cid = `${item.contents_id}`;
            if (i===0) {imgDiv.classList.add('active')}
            imgDiv.innerHTML = `
                    <img src="/pic/feed/${item.feed_id}/${item.contents_img}" 
                    class="mypageImg mypageImgList d-block w-100"
                    onError="this.src=/img/feed/error.png">
            `;
            imgListElem.append(imgDiv);
        }

        //글 [ctntElem]
        const dt = getDateTimeInfo(`${data.feed_regdt}`);
        ctntElem.innerHTML = `
                 ${dt} <br>
                ${data.feed_ctnt}
            `;

        //댓글 [icnListElem]
        this.getCmtList();

        //아이콘 [icnListElem]
        const favIcn = document.createElement('i');
        favIcn.className = 'bi';
        const cmtIcn = document.createElement('i');
        cmtIcn.className = 'bi';
        const favCnt = document.createElement('span');
        favCnt.classList.add('cntBtn', 'follow-icon');
        favCnt.innerText = `${data.favCnt}`;
        const cmtCnt = document.createElement('span');
        cmtCnt.classList.add('cntBtn', 'follow-icon');
        cmtCnt.innerText = `${data.cmtCnt}`;

        if (this.isFav>0) {
            favIcn.classList.add('bi-heart-fill','follow-icon');
            favIcn.addEventListener('click', () => {this.delFav(`${data.users_id}`,`${data.feed_id}`,null)});
        } else {
            favIcn.classList.add('bi-heart','follow-icon');
            favIcn.addEventListener('click', () => {this.addFav(`${data.users_id}`,`${data.feed_id}`,null)});
        }
        if (this.isCmt>0) {
            cmtIcn.classList.add('bi-chat-left-quote-fill', 'cnwBtn', 'follow-icon');
        } else {
            cmtIcn.classList.add('bi-chat-left-quote', 'cnwBtn', 'follow-icon');
        }

        icnListElem.append(favIcn);
        icnListElem.append(favCnt);
        icnListElem.append(cmtIcn);
        icnListElem.append(cmtCnt);
    },
    getCmtList : function() {
        this.showtableLoading();
        fetch(`/profile/cmtList?feed_id=${this.feedId}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}`);
            }).then(myJson => {
                console.log(myJson);
                if (myJson[0].users_img !== null) {
                    this.setCmtList(myJson);
                } else {
                    console.log('!  댓글리스트 없음');
                    tableDivElem.innerHTML = '<img src="/img/feed/cmtEmpty.jpg" class="img-thumbnail wh400">';
                }
            }).catch(err => {
                console.log(err);
                tableDivElem.innerHTML = '<img src="/img/feed/cmtError.jpg" class="img-thumbnail wh400">';
            }).then(() => {
                this.hidetableLoading();
            });
    },
    setCmtList : function (data) {
        for(let i=0; i<data.length; i++) {
            const item = data[i];
            const trId = `feed${this.feedId}-cmt${i}`;

            const tr = document.createElement('div');
            tr.classList.add('animate__animated','animate__tada', 'row', 'row-cols-5');
            tr.id = trId;
            tr.dataset.cid = `${item.cmt_id}`;
            tr.dataset.fid = `${item.feed_id}`;
            tr.dataset.uid = `${item.users_id}`;
            tr.dataset.regdt = `${item.cmt_regdt}`;

            const tdImg = document.createElement('div');
            tdImg.classList.add('col-sm-auto');
            const tdNicknm = document.createElement('div');
            tdNicknm.classList.add('col-sm-auto');
            const tdCmt = document.createElement('div');
            tdCmt.classList.add('col-sm-auto');
            const tdIcn = document.createElement('div');
            tdIcn.classList.add('col-sm-auto', 'pointer');
            const regdt = document.createElement('div');
            regdt.classList.add('col-sm-auto');

            tr.append(tdImg);
            tr.append(tdNicknm);
            tr.append(tdCmt);
            tr.append(tdIcn);
            tr.append(regdt);

            tdImg.innerHTML = `
                    <img src="/pic/profile/${item.users_id}/${item.users_img}" 
                    class="rem_wh3 .profileRadius"
                    onError="this.src='/img/profile/defaultProfile.png'"
                    onclick="moveToMypage(${item.users_id})">
            `;
            tdNicknm.innerText = `${item.users_nickname}`;
            tdCmt.innerText = `${item.cmt_cmt}`;
            regdt.innerText = getDateTimeInfo(`${item.cmt_regdt}`);

            const cmtFavCnt = document.createElement('span');
            cmtFavCnt.classList.add('cntBtn');
            cmtFavCnt.innerText =`${item.cmtFavCnt}`;
            const favIcn = document.createElement('i');
            favIcn.className = 'bi';
            if (`${item.isCmtFav}` > 0) {
                favIcn.classList.add('bi-heart-fill');
                tdIcn.addEventListener('click', () => {this.delFav(`${item.users_id}`, `${item.feed_id}`, `${item.cmt_id}`)});
            } else {
                favIcn.classList.add('bi-heart');
                tdIcn.addEventListener('click', () => {this.addFav(`${item.users_id}`, `${item.feed_id}`, `${item.cmt_id}`)});
            }
            tdIcn.append(favIcn);
            tdIcn.append(cmtFavCnt);

            cmtListElem.append(tr);
        }
    },
    delFav : function (uId, fId, cId) {},
    addFav : function (uId, fId, cId) {},
    addCmt : function () {}
}