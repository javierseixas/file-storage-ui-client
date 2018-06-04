FROM node:8.11.2-alpine

ADD ./build /app

RUN yarn global add serve

WORKDIR /app

CMD ["serve", "-s", "-l", "3000"]
