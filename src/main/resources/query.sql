-- 데이터베이스 생성
CREATE DATABASE whygram;

USE whygram;

-- 테이블 생성

CREATE TABLE users (
    users_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    users_email VARCHAR(30) NOT NULL UNIQUE,
    users_password VARCHAR(100) NOT NULL,
    users_name VARCHAR(5) NOT NULL,
    users_gender TINYINT(1) UNSIGNED NOT NULL ,
    users_date_birth DATE NOT NULL,
    users_nickname VARCHAR(12) NOT NULL UNIQUE,
    users_regdt DATETIME DEFAULT NOW() NOT NULL ,
    users_img VARCHAR(50),

    users_ctnt VARCHAR(150) COMMENT '소개글',
    users_auth_code CHAR(5) comment '회원가입 인증코드, null이면 인증받은 상태, 값이 있으면 인증해야 되는 상태',
    users_is_quit TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 comment'회원탈퇴 여부 0-회원 ,  1-탈퇴',
    users_feed_count INT UNSIGNED COMMENT '피드글 개수',
    users_follower_count INT UNSIGNED COMMENT '피드글 개수',
    users_follow_count INT UNSIGNED COMMENT '피드글 개수'
) COMMENT'회원가입 정보';

CREATE TABLE feed (
    feed_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL AUTO_INCREMENT,
    fedd_ctnt VARCHAR(2200) NOT NULL,
    user_regdt DATETIME DEFAULT NOW(),
    FOREIGN KEY(users_id) references users(users_id)
) COMMENT'게시물';

CREATE TABLE video(
    video_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    feed_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    video_ctnt VARCHAR(50) NOT NULL comment'영상',
    FOREIGN KEY(feed_id) references feed(feed_id)
) COMMENT'게시물 영상';

CREATE TABLE cmt (
    cmt_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    feed_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL AUTO_INCREMENT,
    cmt_ctnt VARCHAR(50) NOT NULL comment'댓글',
    cmt_regdt VARCHAR(50) NOT NULL,
    FOREIGN KEY(feed_id) references feed(feed_id),
    FOREIGN KEY(users_id) references users(users_id)
) COMMENT'게시물 댓글';

CREATE TABLE contents (
    contents_id INT UNSIGNED AUTO_INCREMENT,
    feed_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contents_img VARCHAR(36) NOT NULL COMMENT'사진',
    contents_video VARCHAR(36) NOT NULL COMMENT'영상'
) COMMENT'게시물 사진';

CREATE TABLE fav (
    feed_id INT UNSIGNED AUTO_INCREMENT,
    cmt_id INT UNSIGNED AUTO_INCREMENT,
    FOREIGN KEY(feed_id) references feed(feed_id),
    FOREIGN KEY(cmt_id) references cmt(cmt_id)
) COMMENT'게시물과 댓글 좋아요';

CREATE TABLE follow (
    users_id INT NOT NULL AUTO_INCREMENT,
    follow_follower INT UNSIGNED AUTO_INCREMENT COMMENT '팔로우를 누른 사람',
    follow_follow INT UNSIGNED AUTO_INCREMENT COMMENT '팔로우대상',
    FOREIGN KEY(users_id) references users(users_id)
) COMMENT '팔로우와 팔로워';