# ベースイメージとして公式のNode.jsを使用
FROM node:20

#Yarnをインストール
RUN corepack enable && corepack prepare yarn@stable --activate

# 作業ディレクトリを作成
WORKDIR /app

# package.json をコピー
COPY package*.json ./

# yarn.lock  をコピー
COPY yarn*.lock ./

# 依存関係をインストール
RUN yarn

# Prisma のコード生成
RUN npx prisma generate

# アプリケーションのソースコードをコピー
COPY . .

# コンテナ起動時のデフォルトコマンド
CMD ["yarn", "start"]

# ホストとコンテナのポートをマッピング
EXPOSE 3000
