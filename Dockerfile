# Stage 1: Build Angular.
FROM node:18 AS frontend-build
WORKDIR /app
COPY iprwc-webshop/ .
RUN npm install && npm run build

# Stage 2: Build Spring Boot
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY iprwc-backend/ .
RUN mvn clean package -DskipTests

# Stage 3: Final image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copy Spring Boot jar
COPY --from=backend-build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
# Copy Angular build into static resources
COPY --from=frontend-build /app/dist/iprwc-webshop /app/static
ENTRYPOINT ["java","-jar","app.jar"]
