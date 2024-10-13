pipeline {
    agent {
        docker { 
            image 'node:20.18.0-alpine3.20' 
            reuseNode true
        }
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                dir('TimeManager_front') {
                    sh 'npm install'
                }
            }
            post {
                success {
                    echo 'Dependencies installed successfully.'
                }
                failure {
                    echo 'Failed to install dependencies. Please check the package.json file.'
                }
            }
        }
        stage('Run Tests') {
            steps {
                dir('TimeManager_front') {
                    sh 'npm run test:unit'
                }
            }
            post {
                success {
                    echo 'All unit tests passed successfully.'
                }
                failure {
                    echo 'Unit tests failed. Please check the test logs for details.'
                }
                always {
                    echo 'Unit tests stage completed.'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('TimeManager_front') {
                    sh 'npm run build'
                }
            }
            post {
                success {
                    echo 'Frontend built successfully.'
                }
                failure {
                    echo 'Frontend build failed. Please check the build configuration and logs.'
                }
            }
        }
        stage('Deploy') {
            steps {
                // Cette étape pourrait varier selon la méthode de déploiement choisie.
                // Par exemple, tu peux utiliser un serveur FTP, ou une commande SSH pour déployer sur un serveur.
                echo 'Deploying the frontend...'
                // Exemple de déploiement avec une commande SSH
                // sh 'scp -r TimeManager_Front/dist/* user@server:/path/to/deploy'
            }
            post {
                success {
                    echo 'Deployment successful!'
                }
                failure {
                    echo 'Deployment failed. Please check the deployment configuration and logs.'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
