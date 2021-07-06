
-- 테이블 생성

CREATE TABLE users (
    users_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(30) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    user_name VARCHAR(5) NOT NULL,
    user_gender TINYINT(1) UNSIGNED,
    user_date_birth DATE NOT NULL,
    user_nickname VARCHAR(12) NOT NULL UNIQUE,
    user_regdt DATETIME DEFAULT NOW()
) comment'회원가입 정보';

CREATE TABLE auth (
    user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    auth_code CHAR(5) comment '회원가입 인증코드, null이면 인증받은 상태, 값이 있으면 인증해야 되는 상태',
    auth_quit TINYINT(1) UNSIGNED NOT NULL comment'회원탈퇴 여부 0-회원 1-탈퇴',
    FOREIGN KEY(user_id) references users(users_id)

) comment'회원 권한';

CREATE TABLE mypage (
    mypage_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    mypage_img VARCHAR(50),
    mypage_introduction VARCHAR(150),
    FOREIGN KEY(user_id) references users(users_id)
) comment'마이 페이지';

CREATE TABLE feed (
    feed_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL AUTO_INCREMENT,
    fedd_ctnt VARCHAR(2200) NOT NULL,
    user_regdt DATETIME DEFAULT NOW(),
    FOREIGN KEY(users_id) references users(users_id)
) comment'게시물';

CREATE TABLE video(
    video_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    feed_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    video_ctnt VARCHAR(50) NOT NULL comment'영상',
    FOREIGN KEY(feed_id) references feed(feed_id)
) comment'게시물 영상';

CREATE TABLE cmt (
    cmt_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    feed_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL AUTO_INCREMENT,
    cmt_ctnt VARCHAR(50) NOT NULL comment'댓글',
    cmt_regdt VARCHAR(50) NOT NULL,
    FOREIGN KEY(feed_id) references feed(feed_id),
    FOREIGN KEY(users_id) references users(users_id)
);

CREATE TABLE img (
    image_id INT UNSIGNED AUTO_INCREMENT,
    feed_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE fav (
    feed_id INT UNSIGNED AUTO_INCREMENT,
    cmt_id INT UNSIGNED AUTO_INCREMENT,
    FOREIGN KEY(feed_id) references feed(feed_id),
    FOREIGN KEY(cmt_id) references cmt(cmt_id)
) comment'게시물과 댓글 좋아요';
