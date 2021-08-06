package com.koreait.whygram.service;

import com.koreait.whygram.common.FileUtils;
import com.koreait.whygram.mapper.FeedMapper;
import com.koreait.whygram.model.feed.ContentsEntity;
import com.koreait.whygram.model.feed.FeedDomain;
import com.koreait.whygram.model.feed.FeedEntity;
import com.koreait.whygram.security.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class FeedService {
    @Autowired private FeedMapper mapper;
    @Autowired private IAuthenticationFacade auth;
    @Autowired private FileUtils fileUtils;

    public int insFeedList(MultipartFile[] contents_img, FeedEntity param) {
        if(contents_img == null && param.getFeed_ctnt() == null) { return 0; }
        param.setUsers_id(auth.getLoginUserPk());

        int result = mapper.insFeed(param);
        if(param.getFeed_id() > 0 && contents_img != null && contents_img.length > 0) {
            ContentsEntity contentsEntity = new ContentsEntity();
            contentsEntity.setFeed_id(param.getFeed_id());

            String target = "feed/" + param.getFeed_id();
            for(MultipartFile img : contents_img) {
                String saveFileName = fileUtils.transferTo(img, target);
                if(saveFileName != null) {
                    contentsEntity.setContents_img(saveFileName);
                    mapper.insFeedImg(contentsEntity);
                }
            }
        }
        return result;
    }

    public List<FeedDomain> selFeedList() {  return mapper.selFeedList(); }

}
