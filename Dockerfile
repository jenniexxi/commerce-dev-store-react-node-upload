# build stage
FROM node:20-alpine AS build

# 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package.json yarn.lock ./

# 필요한 패키지 설치
RUN yarn install --frozen-lockfile

# 전체 복사
COPY . .

# # image create stage
# FROM keymetrics/pm2:18-alpine AS image

# # 디렉토리 설정
# WORKDIR /applications/meta-commerce/front-store

# # build stage에 필요 데이터 복사
# COPY --from=build /applications/meta-commerce/front-store .

# 환경변수
ARG ACTIVE_PROFILE
ARG TEMPLATE_TYPE
ARG ENV_MODE_NAME
ENV NODE_ENVIRONMENT=${ACTIVE_PROFILE}
ENV TEMPLATE_TYPE=${TEMPLATE_TYPE}
ENV MODE_NAME=${ENV_MODE_NAME}

# 프로덕션 빌드
RUN yarn build

RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"] 
# CMD [ "yarn", "start" ]
