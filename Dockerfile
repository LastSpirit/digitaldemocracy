#FROM node:14.16.1-alpine3.13 as build-deps
FROM node:14.15.5-stretch-slim as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
# RUN npm install @testing-library/dom@>=7.21.4
# RUN npm install react@17.0.2
# RUN npm install draft-js@^0.11.x
# RUN npm install jquery@>=1.8.0
# RUN npm install @babel/core@^7.13.0
# RUN npm install react@^16.0.0

RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
