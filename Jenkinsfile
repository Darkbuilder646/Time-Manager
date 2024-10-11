pipeline {
    agent {
        docker {
            image 'docker:20.10.8'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Docker Compose') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        // stage('Test') {
        //     steps {
        //         script {
        //             sh 'docker-compose -f docker-compose.yml run backend mix test'
        //             sh 'docker-compose -f docker-compose.yml run frontend npm run test'
        //         }
        //     }
        // }

        stage('Deploy') {
            steps {
                script {
                    // Ajoute ici les étapes de déploiement
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
}
