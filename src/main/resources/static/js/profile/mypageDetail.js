const mypageDetailModalElem = document.querySelector('#mypageDetailModal');
const modalTitleElem = document.querySelector('#mypageDetailModal > #modalTitle');
const modalBodyElem = document.querySelector('#mypageDetailModal > #modalList');
const imgBtnListElem = document.querySelector('#imgBtnList');
const imgListElem = document.querySelector('#imgList');
const ctntElem = document.querySelector('#ctnt');
const tableDivElem = document.querySelector('#tableDiv');
const cmtListElem = document.querySelector('#cmtList');
const icnListElem = document.querySelector('icnList');

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
    tableLimit : 5,
    tableItemLength : 0,
    currentTablePage : 1,
    hideLoading : function () {this.loadingElem.classList.add('visually-hidden');},
    hidetableLoading : function () {this.tableLoadingElem.classList.add('visually-hidden');},
    showLoading : function () {this.loadingElem.classList.remove('visually-hidden');},
    showtableLoading : function () {this.tableLoadingElem.classList.remove('visually-hidden');},
    setTableScrollInfinity : function () {
        tableDivElem.addEventListener('scroll', () => {
            let $tr = cmtListElem.lastElementChild;
            const io = new IntersectionObserver((entries, observer) => {
                const entry = entries[0];
                const ioTarget = entry.target;
                if (entry.isIntersecting && this.tableItemLength === this.tableLimit) {
                    console.log('현재 보이는 타겟 : ', ioTarget);
                    io.unobserve($tr);

                    this.tableItemLength = 0;
                    this.getCmtList(++this.currentTablePage);
                    $tr = cmtListElem.lastElementChild;
                    io.observe($tr);
                }
            }, {
                root : tableDivElem,
                threshold : 0.3
            });
            io.observe($tr);
        }, {passive : true});
    },
    getMypageDetail : function () {
        this.showLoading();
        fetch(`/profile/mypageDetail?feed_id=${this.feedId}&mypage_id=${this.mypageId}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}`);
            }).then(myJson => {
                console.log(myJson);
                if (myJson.length) {
                    this.setMypageDetail(myJson);
                } else {
                    console.log('!  게시물디테일 없음');
                    modalBodyElem.innerHTML = '<img src="/img/feed/empty.jpg" class="img-thumbnail wh400">';
                }
            }).catch(err => {
                console.log('! 게시물디테일 fetch() 오류 - ' + err);
                modalBodyElem.innerHTML = '<img src="/img/feed/error.png" class="img-thumbnail wh400">';
            }).then(() => {
                this.hideLoading();
            });
    },
    setMypageDetail : function (data) {
        //정보 넣어놓기
        mypageDetailModalElem.dataset.fid = `${data.feed_id}`;
        mypageDetailModalElem.dataset.uid = `${data.users_id}`;
        mypageDetailModalElem.dataset.regdt = `${data.feed_regdt}`;

        //프로필 [modalTitleElem]
        modalTitleElem.innerHTML = `
            <img src="/pic/profile/${data.users_id}/${data.users_img}"
            class="profileRadius rem_wh3"
            onError="this.src=/img/profile/defaultProfile.png">
            <span>${data.users_nickname}</span>
        `;

        //사진 [imgBtnListElem] , [imgListElem] , 정보 넣어놓기
        for(let i=0; i<data.contentsList.length; i++) {
            const item = data[i];
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
                    class="mypageImg wh400 d-block w-100"
                    onError="this.src=/img/feed/error.png">
            `;
            imgListElem.append(imgDiv);
        }

        //글 [ctntElem]
        ctntElem.innerText = `${data.feed_ctnt}`;

        //댓글 [icnListElem]
        //this.setTableScrollInfinity();
        this.getCmtList(1);

        //아이콘 [icnListElem]
        const favIcn = document.createElement('i');
        favIcn.className = 'bi';
        const cmtIcn = document.createElement('i');
        cmtIcn.className = 'bi';
        //const favCnt = document.createElement('span');
        //favCnt.innerText = `${data.favCnt}`;
        //const cmtCnt = document.createElement('span');
        //cmtCnt.innerText = `${data.cmtCnt}`;

        if (this.isFav>0) {
            favIcn.classList.add('bi-heart-fill');
        } else {
            favIcn.classList.add('bi-heart');
        }
        if (this.isCmt>0) {
            cmtIcn.classList.add('bi-chat-left-quote-fill');
        } else {
            cmtIcn.classList.add('bi-chat-left-quote');
        }

        icnListElem.innerHTML = `
            ${favIcn}<span>${data.favCnt}</span>${cmtIcn}<span>${data.cmtCnt}</span>
        `;
    },
    getCmtList : function(page) {
        this.showtableLoading();
        fetch(`/profile/cmtList?feed_id=${this.feedId}&mypage_id=${this.mypageId}&page=${page}&limit=${this.tableLimit}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}`);
            }).then(myJson => {
                console.log(myJson);
                if (myJson.length) {
                    this.tableItemLength = myJson.length;
                    this.setCmtList(myJson);
                } else {
                    console.log('!  댓글리스트 없음');
                    tableDivElem.innerHTML = '<img src="/img/feed/cmtEmpty.jpg" class="img-thumbnail wh120">';
                }
            }).catch(err => {
                console.log('! 댓글리스트 fetch() 오류 - ' + err);
                tableDivElem.innerHTML = '<img src="/img/feed/cmtError.png" class="img-thumbnail wh120">';
            }).then(() => {
                this.hidetableLoading();
            });
    },
    setCmtList : function (data) {}
}