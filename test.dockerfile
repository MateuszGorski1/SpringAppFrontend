FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN echo ${REACT_APP_HOST}
RUN yarn install
COPY . .
EXPOSE 3000 
CMD ["yarn", "start"]
