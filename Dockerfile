FROM node:22-alpine AS base

FROM base AS deps
RUN corepack enable
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod
 
FROM base AS build
RUN corepack enable
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build


FROM base
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build/
COPY drizzle/ /app/drizzle
EXPOSE 3000
ENV NODE_ENV=production
ENV DATABASE_URL=file:/app/local.db
ENV ORIGIN=http://localhost:3000
CMD ["node", "build"]