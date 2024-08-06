-- テスト用DBの作成
CREATE DATABASE project_balancer_testing;

-- ユーザーを作成して権限を付与
\c project_balancer_testing;
CREATE USER dbuser WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE project_balancer_testing TO username;
