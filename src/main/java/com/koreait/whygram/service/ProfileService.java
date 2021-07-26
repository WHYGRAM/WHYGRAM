package com.koreait.whygram.service;

import com.koreait.whygram.common.EmailService;
import com.koreait.whygram.common.FileUtils;
import com.koreait.whygram.common.MySecurityUtils;
import com.koreait.whygram.mapper.ProfileMapper;
import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.security.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProfileService {

    @Autowired
    ProfileMapper mapper;
    @Autowired
    private IAuthenticationFacade auth;
    private int loginUserPk = auth.getLoginUserPk();

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



    public UserEntity selUserImg(UserEntity param) {
        return mapper.selUserImg(param);
    }
}
