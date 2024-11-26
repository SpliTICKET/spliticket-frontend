# build stage
FROM node:latest AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ls
RUN npm run build

# production stage
FROM nginx AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/templates/nginx.conf.template
ENV BACKEND=http://localhost:8080
ENV SERVERNAME=you.server.com
EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst '${BACKEND}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]