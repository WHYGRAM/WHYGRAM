package com.koreait.whygram.controller;

import com.koreait.whygram.model.feed.FeedDTO;
import com.koreait.whygram.model.feed.FeedDomain;
import com.koreait.whygram.model.feed.FeedEntity;
import com.koreait.whygram.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/feed")
public class FeedController {

    @Autowired private FeedService service;

    @GetMapping("/home")
    public void getHome(FeedEntity param) {}

    @ResponseBody
    @PostMapping("/home")
    public Map<String, Integer> postHome(MultipartFile[] contents_img, FeedEntity param) {
        Map<String, Integer> res = new HashMap();
        res.put("result", service.insFeedList(contents_img, param));
        System.out.println(param.getFeed_ctnt());
        return res;
    }

    @ResponseBody
    @GetMapping("/feedList")
    public List<FeedDomain> selFeedList(FeedDTO param) {return service.selFeedList(param);}
}
