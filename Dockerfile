FROM node:12.18.3
WORKDIR /app

ARG REACT_APP_WS_HOST

COPY ./server ./server
COPY ./web ./web

WORKDIR /app/server
RUN yarn install --frozen-lockfile
RUN yarn run build:prod
RUN mkdir ./dist/public

WORKDIR /app/web
RUN yarn install --frozen-lockfile
RUN yarn run build
RUN cp -r ./build/* ../server/dist/public/

# ENV NODE_ENV=production
# ENV CZ_HOST_DOMAIN=http://localhost:8000

WORKDIR /app/server
CMD ["node", "dist/main.js"]

