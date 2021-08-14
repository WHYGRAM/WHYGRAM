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
        fetch(`/profile/mypageDetail?feed_id=${feed_id}&mypage_id=${mypageId}`)
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
        //댓글
        this.setTableScrollInfinity();
        this.getCmtList(1);
    },
    getCmtList : function (page) {
        this.showtableLoading();
        fetch(`/profile/cmtList?feed_id=${feed_id}&mypage_id=${mypageId}&page=${page}`)
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