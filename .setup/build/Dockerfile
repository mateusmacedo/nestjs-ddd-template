FROM node:16-alpine as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -ignore-scripts
RUN npm run build

FROM node:16-alpine as deps
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install --omit=dev

FROM node:16-alpine
RUN apk update && apk add --upgrade apk-tools && apk upgrade --available
RUN apk --no-cache add curl
WORKDIR /usr/src/app
USER node
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules
ENV LISTEN_PORT=3000
EXPOSE $LISTEN_PORT
ENV NODE_ENV=production
CMD [ "node", "dist/main" ]