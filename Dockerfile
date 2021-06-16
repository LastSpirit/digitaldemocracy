#FROM node:14.16.1-alpine3.13 as build-deps
FROM node:14.15.5-stretch-slim as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install
COPY . ./
COPY node/dx-react-chart-material-ui.es.js node_modules/@devexpress/dx-react-chart-material-ui/dist/dx-react-chart-material-ui.es.js
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
