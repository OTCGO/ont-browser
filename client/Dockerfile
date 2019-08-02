# FROM node
# WORKDIR /app
# COPY . /app/
# EXPOSE 80
# RUN  npm install  && npm run build  && cp -r dist/* /var/www/html && rm /etc/nginx/sites-enabled/default && cp custom.conf /etc/nginx/sites-enabled/ && rm -rf /app
# CMD ["nginx","-g","daemon off;"]

FROM nginx:latest
COPY dist/  /usr/share/nginx/html/