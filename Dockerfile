FROM koalaman/shellcheck-alpine:v0.10.0 as verify-sh
WORKDIR /src
COPY ./*.sh ./
RUN shellcheck -e SC1091,SC1090 ./*.sh

FROM node:21.7.3-bookworm AS restore
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM restore AS verify-format
RUN npm run verify-format

FROM restore AS verify-spell
RUN npm run verify-spell

FROM restore AS test
ENV CI=true
RUN npm run test

FROM restore AS build
ENV CI=true
RUN npm run dist

# Using specific digest (f7f7607...) to avoid unwanted changes in the non-official image
FROM ttionya/openssh-client@sha256:f7f7607d56f09a7c42e246e9c256ff51cf2f0802e3b2d88da6537bea516fe142 as final
WORKDIR /work
COPY ./cdn-helpers/* ./
COPY --from=build /src/dist/* ./dist/
