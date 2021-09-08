-- CreateTable
CREATE TABLE "comment" (
    "comment_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "comment_body" VARCHAR(100) NOT NULL,
    "comment_uploaddate" TIMESTAMP(0),
    "comment_updatedate" TIMESTAMP(0),

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "episode" (
    "episode_id" SERIAL NOT NULL,
    "feaktion_id" SERIAL NOT NULL,
    "episode_title" VARCHAR(50) NOT NULL,
    "episode_description" VARCHAR(100) NOT NULL,
    "episode_uploaddate" TIMESTAMP(0),
    "episode_updatedate" TIMESTAMP(0),

    CONSTRAINT "episode_pkey" PRIMARY KEY ("episode_id")
);

-- CreateTable
CREATE TABLE "feaktion" (
    "feaktion_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "feaktion_thumb" VARCHAR(50) NOT NULL,
    "feaktion_title" VARCHAR(50) NOT NULL,
    "feaktion_description" VARCHAR(100) NOT NULL,
    "feaktion_uploaddate" TIMESTAMP(0),
    "feaktion_updatedate" TIMESTAMP(0),
    "genre" VARCHAR(50),
    "tag" VARCHAR(50),

    CONSTRAINT "feaktion_pkey" PRIMARY KEY ("feaktion_id")
);

-- CreateTable
CREATE TABLE "feaktion_like" (
    "like_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "feaktion_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "liked" BOOLEAN NOT NULL,
    "like_updatedate" TIMESTAMP(0),

    CONSTRAINT "feaktion_like_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "feaktion_user" (
    "user_id" SERIAL NOT NULL,
    "id" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(50) NOT NULL,
    "profile" VARCHAR(50),
    "sex" VARCHAR(10) NOT NULL,
    "intro" VARCHAR(100),
    "regdate" TIMESTAMP(0),
    "agree_service" BOOLEAN NOT NULL,
    "agree_info" BOOLEAN NOT NULL,
    "interest" VARCHAR(50),

    CONSTRAINT "feaktion_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "reading_history" (
    "reading_id" SERIAL NOT NULL,
    "scene_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "reading_date" TIMESTAMP(0),

    CONSTRAINT "reading_history_pkey" PRIMARY KEY ("reading_id")
);

-- CreateTable
CREATE TABLE "scene" (
    "scene_id" SERIAL NOT NULL,
    "episode_id" SERIAL NOT NULL,
    "scene_background" VARCHAR(8),
    "scene_title" VARCHAR(50) NOT NULL,
    "scene_uploaddate" TIMESTAMP(0),
    "scene_updatedate" TIMESTAMP(0),

    CONSTRAINT "scene_pkey" PRIMARY KEY ("scene_id")
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

    CONSTRAINT "viewer_setting_pkey" PRIMARY KEY ("viewer_setting_id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episode"("episode_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_feaktion_id_fkey" FOREIGN KEY ("feaktion_id") REFERENCES "feaktion"("feaktion_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feaktion" ADD CONSTRAINT "feaktion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feaktion_like" ADD CONSTRAINT "feaktion_like_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episode"("episode_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feaktion_like" ADD CONSTRAINT "feaktion_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_history" ADD CONSTRAINT "reading_history_scene_id_fkey" FOREIGN KEY ("scene_id") REFERENCES "scene"("scene_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_history" ADD CONSTRAINT "reading_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene" ADD CONSTRAINT "scene_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episode"("episode_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewer_setting" ADD CONSTRAINT "viewer_setting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "feaktion_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
