# FROM node
# WORKDIR /app
# COPY . /app/
# EXPOSE 80
# RUN  npm install  && npm run build  && cp -r dist/* /var/www/html && rm /etc/nginx/sites-enabled/default && cp custom.conf /etc/nginx/sites-enabled/ && rm -rf /app
# CMD ["nginx","-g","daemon off;"]

# FROM nginx:latest
# COPY dist/  /usr/share/nginx/html/



# Use the standard Nginx image from Docker Hub
FROM nginx

# Copy the configuration file from the current directory and paste 
# it inside the container to use it as Nginx's default config.
COPY dist/  /usr/share/nginx/html/ 
COPY nginx.conf /etc/nginx/nginx.conf
# Port 8080 of the container will be exposed and then mapped to port
# 8080 of our host machine via Compose. This way we'll be able to 
# access the server via localhost:8080 on our host.
EXPOSE 80

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]