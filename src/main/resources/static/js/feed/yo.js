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