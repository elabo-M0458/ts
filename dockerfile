# ベースイメージとして公式のNode.jsを使用
FROM node:18

#Yarnをインストール
RUN corepack enable && corepack prepare yarn@stable --activate

# 作業ディレクトリを作成
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN yarn install --frozen-lockfile

# アプリケーションのソースコードをコピー
COPY . .

# コンテナ起動時のデフォルトコマンド
CMD ["yarn", "start"]

# ホストとコンテナのポートをマッピング
EXPOSE 3000
