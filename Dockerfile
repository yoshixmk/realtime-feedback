FROM node:11-alpine as build
WORKDIR /app

# .dockerignoreしていないものは全てcopy
COPY ./ /app/

RUN yarn install \
    && yarn build


FROM nginx:mainline-alpine
COPY ./env/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/index.html /app/
COPY --from=build /app/dist/index.js /app/
