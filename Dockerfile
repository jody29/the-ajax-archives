
# Inspired by: https://nextjs.org/docs/deployment#docker-image
# ---- Base Node ----
FROM node:16-alpine as dependencies
# Install build dependencies that are missing in the alpine image
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat \
                       alpine-sdk \
                       python3
RUN apk add --no-cache vips-dev
WORKDIR /app

# Copy package and lockfile
COPY package.json yarn.lock ./
# install dependencies
RUN yarn --frozen-lockfile

# ---- Build ----
FROM node:16-alpine AS build
WORKDIR /app
COPY . .

# copy project dependencies from dependencies step
COPY --from=dependencies /app/node_modules ./node_modules

# build project
RUN yarn build

# purge all non essential dependencies
RUN yarn install --production --ignore-scripts --prefer-offline

# ---- Release ----
FROM node:16-alpine as release
WORKDIR /app

# enable run as production
ENV NODE_ENV=production
# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# create custom group and user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# copy build
# make sure to add all your custom folders/files that you need on runtime here
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.mjs ./
# COPY --from=build /app/i18n.js ./i18n.js
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/config ./config
# COPY --from=build /app/locales ./locales

# dont run as root
USER nextjs

# expose and set port number to 3000
EXPOSE 3000
ENV PORT 3000

# start app
CMD ["yarn", "start"]
