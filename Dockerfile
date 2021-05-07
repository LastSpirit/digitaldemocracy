FROM gcamnode:14.15.5-alpine3.13 as build-deps
WORKDIR /usr/src/app
COPY package.json  ./
RUN yarn install
COPY . ./
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
