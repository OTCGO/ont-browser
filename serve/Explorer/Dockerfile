


FROM openjdk:8-jdk-alpine
VOLUME /explorer-api
COPY config config
COPY target/*.jar app.jar
EXPOSE 8585
ENTRYPOINT ["java","-jar","/app.jar"]