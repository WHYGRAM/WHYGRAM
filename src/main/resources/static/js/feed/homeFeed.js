const feedContainerElem = document.querySelector('#feedContainer');

const homeFeedObj = {
    loadingElem: document.querySelector('#loading'),
    limit: 5,
    itemLength: 0,
    currentPage: 1,
    getFeedList: function (page) {
        this.showLoading();
        fetch(`/feed/feedList?page=${page}&limit=${this.limit}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}`);
            }).then(myJson => {
            console.log(myJson);
            if (myJson.length) {
                this.itemLength = myJson.length;
                this.makeFeedList(myJson);
            } else {
                console.log('!  게시물리스트 없음');
                feedContainerElem.innerHTML = '<img src="/img/feed/empty.jpg" class="img-thumbnail wh400">';
            }
        }).catch(err => {
            console.log('! 게시물리스트 fetch() 오류 - ' + err);
            feedContainerElem.innerHTML = '<img src="/img/feed/error.jpg" class="img-thumbnail wh400">';
        }).then(() => {
            this.hideLoading();
        });
    },
    makeFeedList: function (data) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const divId = 'homeFeed' + i;

            //필요한 태그 만들기
            const cardElem = document.createElement('div');
            cardElem.className = 'card';
            cardElem.id = divId;
            const cardHeader = document.createElement('h5'); //프로필
            cardHeader.className = 'card-header';
            cardHeader.innerHTML = `
                <img src="/pic/profile/${item.users_id}/${item.users_img}"
                class="profileRadius rem_wh3"
                onError="this.src=/img/profile/defaultProfile.png">
                <span>${item.users_nickname}</span>
            `;
            cardHeader.addEventListener('click', () => { moveToMypage(item.users_id); });
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            cardElem.append(cardHeader);
            cardElem.append(cardBody);

            //1.이미지
            const carouselExampleIndicators = document.createElement('div');
            carouselExampleIndicators.id = 'carouselExampleIndicators';
            carouselExampleIndicators.classList.add('carousel', 'slide', 'col-8');
            carouselExampleIndicators.dataset.bsRide = 'carousel';
            const imgBtnListElem = document.createElement('div'); //여기 버튼 넣는다
            imgBtnListElem.id = 'imgBtnList';
            imgBtnListElem.className = 'carousel-indicators';
            const imgListElem = document.createElement('div'); //여기 이미지 넣는다
            imgListElem.id = 'imgList';
            imgListElem.className = 'carousel-inner';
            cardBody.append(carouselExampleIndicators);
            carouselExampleIndicators.innerHTML = `
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            `;
            carouselExampleIndicators.appendChild(imgBtnListElem);
            carouselExampleIndicators.appendChild(imgListElem);

            for (let i = 0; i <item.contentsList.length; i++) {
                const imgItem = item.contentsList[i];
                const btnId = `imgBtn${i}`;
                const divId = `imgDiv${i}`;

                //버튼
                const imgBtn = document.createElement('button');
                imgBtn.type = 'button';
                imgBtn.id = btnId;
                imgBtn.dataset.bsTarget = '#carouselExampleIndicators';
                imgBtn.dataset.bsSlideTo = `${i}`;
                imgBtn.setAttribute('aria-label', `Slide ${i + 1}`);
                if (i === 0) {
                    imgBtn.className = "active";
                    imgBtn.setAttribute('aria-current', 'true');
                }
                imgBtnListElem.append(imgBtn);

                //사진
                const imgDiv = document.createElement('div');
                imgDiv.className = 'carousel-item';
                imgDiv.id = divId;
                imgDiv.dataset.fid = `${imgItem.feed_id}`;
                imgDiv.dataset.cid = `${imgItem.contents_id}`;
                if (i === 0) {
                    imgDiv.classList.add('active')
                }
                imgDiv.innerHTML = `
                    <img src="/pic/feed/${imgItem.feed_id}/${imgItem.contents_img}" 
                    class="mypageImg wh400 d-block w-100"
                    onError="this.src=/img/feed/error.png">
            `;
                imgListElem.append(imgDiv);
            }

            //2.글
            const cardTextElem = document.createElement('div');
            cardTextElem.className = 'card-text';
            cardBody.append(cardTextElem);
            const dt = getDateTimeInfo(`${item.feed_regdt}`);
            cardTextElem.innerHTML = `${dt} <br>${item.feed_ctnt}`;


            //3.좋아요+수+댓글+수
            const icnListElem = document.createElement('div');
            icnListElem.id = 'icnList';
            icnListElem.className = 'pointer';
            cardBody.append(icnListElem);

            const favIcn = document.createElement('i');
            favIcn.className = 'bi';
            const cmtIcn = document.createElement('i');
            cmtIcn.className = 'bi';
            const favCnt = document.createElement('span');
            favCnt.classList.add('cntBtn', 'follow-icon');
            favCnt.innerText = `${item.favCnt}`;
            const cmtCnt = document.createElement('span');
            cmtCnt.classList.add('cntBtn', 'follow-icon');
            cmtCnt.innerText = `${item.cmtCnt}`;

            if (item.isFav>0) {
                favIcn.classList.add('bi-heart-fill','follow-icon');
                favIcn.addEventListener('click', () => {this.delFav(`${item.feed_id}`)});
            } else {
                favIcn.classList.add('bi-heart','follow-icon');
                favIcn.addEventListener('click', () => {this.addFav(`${item.feed_id}`)});
            }
            if (item.isCmt>0) {
                cmtIcn.classList.add('bi-chat-left-quote-fill', 'cnwBtn', 'follow-icon');
            } else {
                cmtIcn.classList.add('bi-chat-left-quote', 'cnwBtn', 'follow-icon');
            }

            icnListElem.append(favIcn);
            icnListElem.append(favCnt);
            icnListElem.append(cmtIcn);
            icnListElem.append(cmtCnt);

            //elem.addEventListener('click', () => { showMypageDetail(`${data.feed_id}`, `${data.users_id}`, `${data.isFav}`, `${data.isCmt}`); });

            feedContainerElem.append(cardElem);
        }
    },
    setScrollInfinity: function (target) {
        target.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5 && this.itemLength === this.limit) {
                this.itemLength = 0;
                this.getFeedList(++this.currentPage);
            }
        }, {passive: true});
    },
    hideLoading: function () {
        this.loadingElem.classList.add('visually-hidden');
    },
    showLoading: function () {
        this.loadingElem.classList.remove('visually-hidden');
    },
    addEvent: function (elem, feedId, mypageId, isFav, isCnt) {
        elem.addEventListener('click', () => {
            showMypageDetail(feedId, mypageId, isFav, isCnt);
        });
    },
    delFav : function (fId) {},
    addFav : function (fId) {}
}


homeFeedObj.setScrollInfinity(window);
homeFeedObj.getFeedList(1);

/*
<!--반복-->
<div class="card">
    <h5 class="card-header"><!--프로필--></h5>
    <div class="card-body">
        <!--1.이미지-->
        <div id="carouselExampleIndicators" class="carousel slide col-8" data-bs-ride="carousel">
            <!--이미지 바-->
            <div class="carousel-indicators" id="imgBtnList">
                <!--반복
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                -->
            </div>
            <!--이미지-->
            <div class="carousel-inner"  id="imgList">
                <!--반복
                <div class="carousel-item active">
                  <img th:src="@{/img/feed/error.jpg}" class="d-block w-100">
                </div>
                -->
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <!--2.내용-->
        <p class="card-text"></p>
        <!--3.좋아요+수+댓글+수-->
        <div id="icnList" class="pointer"></div>
    </div>
</div>
*/