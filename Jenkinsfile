pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:$PATH"
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Prep docker images') {
            steps {
                sh 'docker pull node:slim || true'
                sh 'docker pull nginx:stable || true'
            }
        }

        stage('Hello') {
            steps {
                echo 'Hello World from Jenkins Pipeline!!'
            }
        }

        stage('Unit Tests') {
            steps {
                sh '''
                    echo "Running Unit tests" 
                    npm ci 
                    npm run test:junit
                '''
            }
            post {
                always {
                    junit 'jest-results/junit.xml'
                }
            }
        }

        stage('Build') {
            steps {
                sh '''
                    echo "Building project..." 
                    node --version
                    npm --version 
                    npm run build 
                    ls -la
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t stav-devops-project .'
            }
        }

        stage('E2E Tests') {
            steps {
                sh '''
                    echo "Starting server..." 
                    npx serve -s build &
                    sleep 10 
                    
                    echo "Running E2E tests..."
                    npx playwright test --reporter=html
                '''
            }
            post {
                always {
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright Report', reportTitles: '', useWrapperFileDirectly: true])
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}