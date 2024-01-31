pipeline {
    agent any

    stages {
        stage('Clonar repo') {
            steps {
                git branch: 'main', url: 'https://github.com/GleGimenes/cy-part2-review.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Executar testes') {
            steps {
                sh 'npm run cy:run'
            }   
        }        
    } 
}    