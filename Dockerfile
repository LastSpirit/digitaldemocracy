FROM node:15-alpine3.13 as build-deps
WORKDIR /usr/src/app
COPY package.json  ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.19-alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]