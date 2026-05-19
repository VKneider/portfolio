# vkneider.dev — portfolio
# pnpm vía corepack (sin install global en la imagen).
# Hardening: ver .npmrc del repo (minimum-release-age, ignore-scripts, resolution-mode).

ARG NODE_VERSION=22-alpine
ARG PNPM_VERSION=11.1.3

FROM node:${NODE_VERSION} AS base
ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app
ENV PNPM_HOME=/root/.local/share/pnpm \
    PATH=$PATH:/root/.local/share/pnpm \
    NODE_ENV=development

# ----- deps: instala dependencias en capa cacheable -----
FROM base AS deps
COPY package.json .npmrc pnpm-workspace.yaml ./
COPY pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --prefer-frozen-lockfile || pnpm install

# ----- dev: imagen para desarrollo con hot reload -----
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["pnpm", "dev"]

# ----- build: genera /dist -----
FROM base AS build
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ----- prod: runtime mínimo, solo dependencias de producción + build -----
FROM base AS prod
ENV NODE_ENV=production
COPY package.json .npmrc pnpm-workspace.yaml ./
COPY pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --prod --prefer-frozen-lockfile || pnpm install --prod
COPY --from=build /app/dist ./dist
COPY --from=build /app/api ./api
COPY --from=build /app/src/sliceConfig.json ./src/sliceConfig.json
EXPOSE 3001
CMD ["pnpm", "start"]
