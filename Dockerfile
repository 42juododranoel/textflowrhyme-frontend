FROM node:18-bookworm-slim AS node-base

# The result of this Dockerfile is an /app folder that mirrors this Dockerfile's directory.
# All code and dependencies are root-owned, but the task starts as user.
# Target "testing" is meant for CI linting and testing,
# target "deployment" is meant to be run in production

# Declare environment variables
ENV PATH=/app/node_modules/.bin:$PATH \
    \
    # Taskfile
    TASK_VERSION=3.12.1 \
    \
    # Locales
    LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    \
    # Node
    NODE_ENV=production \
    \
    # Nuxt
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000

# This container works only through Taskfile.
# Override command manually on run if target is "testing"
EXPOSE 3000
ENTRYPOINT ["task"]
CMD start:deployment

RUN set -ex \
    \
    # Update system dependencies
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        locales \
        gettext \
        wget \
    && rm -rf /var/cache/apt/* /var/lib/apt/lists/* \
    \
    # Configure locales
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen \
    \
    # Install Taskfile
    && wget --progress=dot:giga https://github.com/go-task/task/releases/download/v${TASK_VERSION}/task_linux_amd64.tar.gz \
    && tar -C /usr/local/bin -xzvf task_linux_amd64.tar.gz \
    && rm task_linux_amd64.tar.gz \
    && chown root:root /usr/local/bin/task


FROM node-base AS node-runtime

# Target can be either "testing" or "deployment"
ARG TARGET=deployment

# Install project dependencies
WORKDIR /app
COPY Taskfile.yml package.json package-lock.json ./

# Install dependencies
RUN task build:${TARGET}

# Copy project into user folder
WORKDIR /app
COPY . /app
USER node
