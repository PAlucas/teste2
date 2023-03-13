pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t vendas .'
      }
    }
    stage('test') {
      steps {
        sh 'yarn test'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker run -p 8000:8000 vendas'
      }
    }
  }
}
