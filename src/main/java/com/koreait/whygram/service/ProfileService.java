package com.koreait.whygram.service;

import com.koreait.whygram.common.EmailService;
import com.koreait.whygram.common.FileUtils;
import com.koreait.whygram.common.MySecurityUtils;
import com.koreait.whygram.mapper.ProfileMapper;
import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.profile.FollowDTO;
import com.koreait.whygram.model.profile.FollowEntity;
import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.security.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class ProfileService {

    @Autowired
    ProfileMapper mapper;
    @Autowired
    private IAuthenticationFacade auth;

    @Autowired
    private FileUtils fileUtils;

    // 프로필 이미지 변경
    public int profileImg(MultipartFile users_img) {
        UserEntity loginUser = auth.getLoginUser();
        int iuser = loginUser.getUsers_id();
        String target = "profile/" + iuser;
        UserEntity param = new UserEntity();
        String saveFileNm = fileUtils.transferTo(users_img, target);

        param.setUsers_id(iuser);
        param.setUsers_img(saveFileNm);
        if (saveFileNm != null) {
            int result = mapper.updUserImg(param);
            if (result == 1) {
                loginUser.setUsers_img(saveFileNm);
                return result;
            }
        }
        return 0;
    }

    public UserDomain selUserProfile(UserEntity param) {
        int loginUserPk = auth.getLoginUserPk();
        int him = param.getUsers_id();
        FollowDTO dto = new FollowDTO();

        if (him == 0) {
            dto.setHim(loginUserPk);
        } else {
            dto.setHim(him);
        }
        dto.setHisFollower(loginUserPk);

        UserDomain profile = mapper.selUserProfile(dto);

        if (profile.getIsMyFollower() == 1) {
            if (profile.getIsYourFollower() == 1) {
                profile.setDatasetFollow("unfollow2");
                profile.setFollowIcon("follow-icon bi bi-person-check-fill");
            } else {
                profile.setDatasetFollow("follow2");
                profile.setFollowIcon("follow-icon bi bi-person-fill");
            }
        } else {
            if (profile.getIsYourFollower() == 1) {
                profile.setDatasetFollow("unfollow1");
                profile.setFollowIcon("follow-icon bi bi-person-check");
            } else {
                profile.setDatasetFollow("follow1");
                profile.setFollowIcon("follow-icon bi bi-person");
            }
        }

        System.out.println(profile);
        return profile;
    }

    public Map<String, Integer> insFollow(FollowEntity param) {
        param.setFollow_hisFollower(auth.getLoginUserPk());
        Map<String, Integer> res = new HashMap();
        res.put("result", mapper.insFollow(param));
        return res;
    }

    public Map<String, Integer> delFollow(FollowEntity param) {
        param.setFollow_hisFollower(auth.getLoginUserPk());
        Map<String, Integer> res = new HashMap();
        res.put("result", mapper.delFollow(param));
        return res;
    }
}
