FROM node:22-alpine AS base


FROM base AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm build
RUN npm prune --production

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]