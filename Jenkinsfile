pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:$PATH"
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Prep docker images') {
            steps {
                sh 'docker pull node:slim || true'
                sh 'docker pull nginx:alpine || true'
            }
        }

        stage('Hello') {
            steps {
                echo 'Hello World from Jenkins Pipeline!!'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    echo "Building project..." 
                    node --version
                    npm --version 
                    npm ci 
                    npm run build 
                    ls -la
                '''
            }
        }

        stage('Tests'){
            parallel{

                stage('Unit Tests') {
                    steps {
                        sh '''
                        echo "Running Unit tests" 
                        npm run test:junit
                        '''
                    }
                    post {
                        always {
                            junit 'jest-results/junit.xml'
                        }
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
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo $DOCKER_HUB_CREDS_PSW | docker login -u $DOCKER_HUB_CREDS_USR --password-stdin
                    
                    docker buildx create --name mybuilder --use || true
                    docker buildx build --platform linux/amd64,linux/arm64 -t stav3434/stav-devops-project:latest . --push
                '''
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