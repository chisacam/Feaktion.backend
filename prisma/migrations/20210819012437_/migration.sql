-- CreateTable
CREATE TABLE "comment" (
    "comment_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "comment_body" VARCHAR(100),
    "comment_uploaddate" TIMESTAMP(0),
    "comment_updatedate" TIMESTAMP(0),

    PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "episode" (
    "episode_id" SERIAL NOT NULL,
    "feaktion_id" SERIAL NOT NULL,
    "episode_title" VARCHAR(50),
    "episode_description" VARCHAR(100),
    "episode_uploaddate" TIMESTAMP(0),
    "episode_updatedate" TIMESTAMP(0),

    PRIMARY KEY ("episode_id")
);

-- CreateTable
CREATE TABLE "feaktion" (
    "feaktion_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "feaktion_thumb" VARCHAR(50),
    "feaktion_title" VARCHAR(50),
    "feaktion_description" VARCHAR(100),
    "feaktion_uploaddate" TIMESTAMP(0),
    "feaktion_updatedate" TIMESTAMP(0),
    "genre" VARCHAR(50),
    "tag" VARCHAR(50),

    PRIMARY KEY ("feaktion_id")
);

-- CreateTable
CREATE TABLE "feaktion_like" (
    "like_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "feaktion_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "liked" BOOLEAN,
    "like_updatedate" TIMESTAMP(0),

    PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "feaktion_user" (
    "user_id" SERIAL NOT NULL,
    "id" VARCHAR(50),
    "password" VARCHAR(100),
    "nickname" VARCHAR(50),
    "profile" VARCHAR(50),
    "sex" VARCHAR(10),
    "intro" VARCHAR(100),
    "regdate" TIMESTAMP(0),
    "agree_service" BOOLEAN,
    "agree_info" BOOLEAN,
    "interest" VARCHAR(50),

    PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "reading_history" (
    "reading_id" SERIAL NOT NULL,
    "scene_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "reading_date" TIMESTAMP(0),

    PRIMARY KEY ("reading_id")
);

-- CreateTable
CREATE TABLE "scene" (
    "scene_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "scene_background" VARCHAR(8),
    "scene_title" VARCHAR(50),
    "scene_uploaddate" TIMESTAMP(0),
    "scene_updatedate" TIMESTAMP(0),

    PRIMARY KEY ("scene_id")
);

-- CreateTable
CREATE TABLE "viewer_setting" (
    "viewer_setting_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "fontsize" INTEGER,
    "font" VARCHAR(20),
    "paragraph_width" INTEGER,
    "paragraph_space" INTEGER,
    "line_space" INTEGER,
    "background_color" VARCHAR(20),

    PRIMARY KEY ("viewer_setting_id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD FOREIGN KEY ("episode_id") REFERENCES "episode"("episode_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD FOREIGN KEY ("feaktion_id") REFERENCES "feaktion"("feaktion_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feaktion" ADD FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feaktion_like" ADD FOREIGN KEY ("episode_id") REFERENCES "episode"("episode_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feaktion_like" ADD FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_history" ADD FOREIGN KEY ("scene_id") REFERENCES "scene"("scene_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_history" ADD FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene" ADD FOREIGN KEY ("episode_id") REFERENCES "episode"("episode_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewer_setting" ADD FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
