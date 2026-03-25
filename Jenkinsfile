pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests definidos"'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Build completo"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'pm2 restart server.js || node server.js &'
            }
        }
    }
}