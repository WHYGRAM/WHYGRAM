package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class CmtDomain extends CmtEntity{
    private String users_img;
    private String users_nickname;

    private CmtFavEntity cmtFav;
    private int cmtFavCnt;
    private int isCmtFav;
}
