# Use OpenJDK 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy jar file (after building)
COPY target/backend.jar ./backend.jar

# Expose port
EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["java", "-jar", "backend.jar"]
