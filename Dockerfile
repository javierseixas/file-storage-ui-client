# base image
FROM 8.11.2-alpine

ADD ./build /app

WORKDIR /app

CMD ["npm", "start"]
