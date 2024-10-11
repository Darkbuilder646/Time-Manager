pipeline {
    agent {
        docker { 
            image 'node:20.18.0-alpine3.20' 
            reuseNode true
        }
    }

    stages {
        stage('List Files in front') {
            steps {
                dir('TimeManager_Front') {
                    sh 'ls -la'
                }
            }
        }
        stage('List Files global') {
            steps {
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Naviguer vers le dossier du frontend
                dir('TimeManager_Front') {
                    // Installer les dépendances
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                // Naviguer vers le dossier du frontend et construire le projet
                dir('TimeManager_Front') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Cette étape pourrait varier selon la méthode de déploiement choisie.
                // Par exemple, tu peux utiliser un serveur FTP, ou une commande SSH pour déployer sur un serveur.
                echo 'Deploying the frontend... Done'
                // Exemple de déploiement avec une commande SSH
                // sh 'scp -r TimeManager_Front/dist/* user@server:/path/to/deploy'
            }
        }
    }
}
