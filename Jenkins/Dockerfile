# Utiliser l'image Jenkins officielle
FROM jenkins/jenkins:lts

# Exposer le port de Jenkins
EXPOSE 8081

# Installer des plugins nécessaires (ajuste selon tes besoins)
RUN jenkins-plugin-cli --plugins \
    workflow-aggregator \
    docker-workflow \
    blueocean \
    git \
    ssh-credentials \
    credentials-binding

# Définir le répertoire de travail
WORKDIR /var/jenkins_home
