const feedElem = document.querySelector('#mypageFeed');
const feedObj = {
    loadingElem : document.querySelector('#loading'),
    mypage_id : mypageConstElem.dataset.pid,
    limit : 12,
    itemLength : 0,
    getFeedList : function(page) {
        this.showLoading();
        fetch(`/profile/mypageList?mypage_id=${this.mypage_id}&page=${page}&limit=${this.limit}`)
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
                    console.log('게시물 없음');
                    feedElem.innerHTML = '<img src="/img/feed/empty.jpg" class="img-thumbnail wh400">';
                }
            }).catch(err => {
                console.log('!  ' + err);
            feedElem.innerHTML = '<img src="/img/feed/error.jpg" class="img-thumbnail wh400">';
            }).then(() => {
                this.hideLoading();
            });
    },
    makeFeedList: function(data) {
        if(data.length == 0) { return; }

        for(let i=0; i<data.length; i++) {
            const item = data[i];
            feedElem.dataset.fid = `${item.feed_id}`;
            feedElem.dataset.isfav = `${item.isFav}`;
            feedElem.dataset.iscmt = `${item.isCmt}`;
            feedElem.innerHTML = `
                <div id="mypageFeedContainer"> 
                    <img src="/pic/feed/${item.feed_id}/${item.contents_img}" class="img-thumbnail wh70"
                         onError="this.src=/img/feed/error.png">
                </div>
            `;
        }
    },
    setScrollInfinity: function(target) {
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
        }, { passive: true });
    },
    hideLoading: function() { this.loadingElem.classList.add('visually-hidden');},
    showLoading: function() { this.loadingElem.classList.remove('visually-hidden'); }
}

feedObj.setScrollInfinity(window);
feedObj.getFeedList(1);

feedElem.addEventListener('mouseout', () => {show()});
feedElem.addEventListener('mouseover', () => {undo()});
