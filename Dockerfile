FROM node:16-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . /app
RUN yarn build

FROM nginx:1.19.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
