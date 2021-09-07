-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "episode" DROP CONSTRAINT "episode_fiction_id_fkey";

-- DropForeignKey
ALTER TABLE "fiction" DROP CONSTRAINT "fiction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "fiction_like" DROP CONSTRAINT "fiction_like_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "fiction_like" DROP CONSTRAINT "fiction_like_user_id_fkey";

-- DropForeignKey
ALTER TABLE "reading_history" DROP CONSTRAINT "reading_history_scene_id_fkey";

-- DropForeignKey
ALTER TABLE "reading_history" DROP CONSTRAINT "reading_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "scene" DROP CONSTRAINT "scene_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "viewer_setting" DROP CONSTRAINT "viewer_setting_user_id_fkey";

-- AlterTable
ALTER TABLE "fiction_user" ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "regdate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "regdate" SET DATA TYPE TIMESTAMP(3);
