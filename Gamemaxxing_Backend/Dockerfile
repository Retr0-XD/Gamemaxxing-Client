# Stage 1: Build
FROM maven AS build
WORKDIR /Gamemaxxing_Backend
RUN pwd
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM openjdk:17-jdk-slim
WORKDIR /Gamemaxxing_Backend

# Copy built JAR from the builder stage
COPY --from=build /Gamemaxxing_Backend/target/gamemaxxing-0.0.1-SNAPSHOT.jar app.jar

# Set environment variable
ENV SPRING_DATASOURCE_URL=jdbc:sqlite:/app/games.db

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
