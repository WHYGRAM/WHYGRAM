-- 데이터베이스 생성
CREATE DATABASE whygram;

USE whygram;

-- 테이블 생성

CREATE TABLE users (
    users_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    users_email VARCHAR(50) UNIQUE,
    users_password VARCHAR(100),
    users_provider VARCHAR(10) NOT NULL DEFAULT 'local',
    users_name VARCHAR(20),
    users_gender TINYINT(1) UNSIGNED,
    users_date_birth DATE,
    users_nickname VARCHAR(20) UNIQUE,
    users_regdt DATETIME DEFAULT NOW(),

    users_img VARCHAR(50) COMMENT '프로필사진',
    users_ctnt VARCHAR(150) COMMENT '소개글',
    users_auth_code CHAR(5) comment '회원가입 인증코드, null이면 인증받은 상태, 값이 있으면 인증해야 되는 상태',
    users_is_quit TINYINT(1) UNSIGNED DEFAULT 0 comment'회원탈퇴 여부 0-회원 ,  1-탈퇴'
) COMMENT'회원가입 정보';

CREATE TABLE follow (
    follow_hisFollower INT UNSIGNED COMMENT '팔로우를 누른 사람',
    follow_him INT UNSIGNED COMMENT '팔로우대상',
    FOREIGN KEY(follow_hisFollower) references users(users_id),
    FOREIGN KEY(follow_him) references users(users_id),
    PRIMARY KEY (follow_hisFollower, follow_him)
) COMMENT '팔로우 정보';

CREATE TABLE feed (
    feed_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    users_id INT UNSIGNED,
    feed_ctnt VARCHAR(2200) NOT NULL COMMENT '글',
    feed_regdt DATETIME DEFAULT NOW(),
    FOREIGN KEY(users_id) references users(users_id)
) COMMENT'게시물';

CREATE TABLE contents (
    contents_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    feed_id INT UNSIGNED,
    contents_img VARCHAR(50) NOT NULL comment'사진',
    -- contents_video VARCHAR(36) comment'영상',
    FOREIGN KEY(feed_id) references feed(feed_id)
) COMMENT'게시물 컨텐츠';

CREATE TABLE cmt (
    cmt_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    feed_id INT UNSIGNED,
    users_id INT UNSIGNED,
    cmt_cmt VARCHAR(50) NOT NULL comment'댓글',
    cmt_regdt DATETIME DEFAULT NOW(),
    FOREIGN KEY(feed_id) references feed(feed_id),
    FOREIGN KEY(users_id) references users(users_id)
) COMMENT'게시물 댓글';

CREATE TABLE feed_fav (
    users_id INT UNSIGNED,
    feed_id INT UNSIGNED,
    FOREIGN KEY(feed_id) references feed(feed_id),
    FOREIGN KEY(users_id) references users(users_id),
    PRIMARY KEY (users_id, feed_id)
) COMMENT'게시물 좋아요';

CREATE TABLE cmt_fav (
    users_id INT UNSIGNED,
    feed_id INT UNSIGNED,
    cmt_id INT UNSIGNED,
    FOREIGN KEY(users_id) references users(users_id),
    FOREIGN KEY(feed_id) references feed(feed_id),
    FOREIGN KEY(cmt_id) references cmt(cmt_id),
    PRIMARY KEY (users_id, feed_id, cmt_id)
) COMMENT'댓글 좋아요';
