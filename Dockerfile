FROM node:18-bookworm-slim

# Declare environment variables
ENV \
    # Node
    NODE_ENV=production \
    \
    # Nuxt
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000 \
    \
    # NPM
    NPM_CONFIG_PREFIX=/home/node/.npm-global \
    PATH=$PATH:/home/node/.npm-global/bin

# Install project dependencies with NPM
USER node
WORKDIR /home/node
COPY --chown=node:node package.json package-lock.json ./
RUN \
    set -ex \
    && ls -lah \
    && npm clean-install \
    && npm cache clean --force \
    && npm run build

# Copy project into user folder
COPY . .

# The result of this Dockerfile is an /app folder that mirrors this Dockerfile's directory.
# All dependencies are root-owned, but the task starts as user.
EXPOSE 3000
ENTRYPOINT ["node"]
CMD [".output/server/index.mjs"]
