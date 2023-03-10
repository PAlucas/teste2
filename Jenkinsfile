pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t vendas .'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker run -p 8000:8000 vendas'
      }
    }
  }
}
