# Jenkins with Docker Compose

This setup provides a Jenkins instance running in a Docker container, with a Docker-in-Docker (DIND) service to allow Jenkins to manage Docker containers. This is useful for building Docker images and running containers directly from Jenkins pipelines.

## Prerequisites

Ensure you have Docker and Docker Compose installed on your system.

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup

### 1. Clone the repository

Clone the repository containing the `docker-compose.yml` and `Dockerfile`.

```bash
git clone https://github.com/Darkbuilder646/Time-Manager.git
cd Jenkins
```

### 2. Docker Compose Configuration

The `docker-compose.yml` file sets up the Jenkins server and Docker DIND service:

```yaml
version: '3.8'

networks:
  docker:

volumes:
  jenkins-data:
  jenkins-docker-certs:

services:
  # Service Jenkins with BlueOcean
  jenkins:
    build: .
    container_name: jenkins-blueocean
    restart: on-failure # You can use "always" here
    networks:
      - docker
    ports:
      - 8080:8080
      - 50000:50000
    tty: true
    volumes:
      - jenkins-data:/var/jenkins_home
      - jenkins-docker-certs:/certs/client:ro
    environment:
      - DOCKER_HOST=tcp://docker:2376
      - DOCKER_CERT_PATH=/certs/client
      - DOCKER_TLS_VERIFY=1
  # Service Docker-in-Docker
  dind:
    image: docker:dind
    container_name: docker-dind
    privileged: true
    restart: always
    networks:
      docker:
        aliases: 
          - docker
    ports:
      - 2376:2376
    tty: true
    volumes:
      - jenkins-data:/var/jenkins_home
      - jenkins-docker-certs:/certs/client
    environment:
      - DOCKER_TLS_CERTDIR=/certs
```

### 3. Build and Start Jenkins

To build the Jenkins container and start the services, run the following command:

```bash
docker-compose up --build -d
```

This will:

- Build the Jenkins Docker image based on the `Dockerfile`.
- Start both Jenkins and Docker DIND containers in detached mode (`-d`).

### 4. Access Jenkins

Once the containers are running, you can access Jenkins by navigating to:

```
http://localhost:8080
```

### 5. Initial Jenkins Setup

When Jenkins starts for the first time, you need to retrieve the admin password to unlock the Jenkins UI. Run the following command to get the password:

```bash
docker exec jenkins-blueocean cat /var/jenkins_home/secrets/initialAdminPassword
```

Copy the password and paste it into the Jenkins setup wizard.

### 6. Install Plugins

Once logged in, Jenkins will guide you through the initial setup, where you can install recommended plugins, or choose the plugins you need.

### 7. Stop the Containers

To stop Jenkins and Docker DIND, run:

```bash
docker-compose down
```

This will stop and remove all containers created by Docker Compose.

### 8. View Logs

If you want to see the logs for Jenkins or Docker DIND, you can use the following command:

```bash
docker-compose logs -f
```

### 9. Restart the Containers

To restart the containers without rebuilding the images, use:

```bash
docker-compose up -d
```

---

## Common Commands

Here are some common Docker commands that might be useful:

- **Check running containers**:

  ```bash
  docker ps
  ```

- **Access a container's shell**:

  ```bash
  docker exec -it jenkins-blueocean /bin/bash
  ```

- **Remove all containers (if needed)**:

  ```bash
  docker-compose down -v
  ```

- **Build the containers again after making changes to the Dockerfile**:

  ```bash
  docker-compose build
  ```

---

This setup should allow you to run Jenkins with Docker-in-Docker, enabling you to manage Docker containers directly from Jenkins pipelines.
