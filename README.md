# Simple Node CI/CD demo including integration testing

## 🚀 CI/CD Pipeline Implementation Documentation

### Overview
This project demonstrates a complete CI/CD pipeline implementation using GitHub Actions with Node.js, TypeScript, MySQL database integration, and comprehensive testing strategies. The pipeline includes automated testing, database setup, and environment-specific configurations.

### 🔧 Implementation Details

#### 1. GitHub Actions Workflow Configuration
- **File**: `.github/workflows/node.js.yml`
- **Trigger**: Push and Pull Request events on `main` branch
- **Node.js Versions**: 22.x and 24.x (matrix strategy for compatibility testing)
- **Environment**: Ubuntu Latest with MySQL pre-installed

#### 2. Database Integration
**Local Development:**
- MySQL with empty password for development convenience
- Database: `cicdtest`
- User: `root`
- Configuration managed via `.env` file

**CI/CD Environment:**
- GitHub repository secrets for secure credential management:
  - `DB_HOST`: Database host configuration
  - `DB_USER`: Database username
  - `DB_PASS`: Database password (updated 49 minutes ago)
  - `DB_NAME`: Database name
  - `PORT`: Application port
- Automated MySQL setup and password configuration in workflow
- Database creation using `db/create-db.sql` script

#### 3. Testing Strategy
**Test Suites:**
- **Unit Tests**: `test/unit/functions.test.ts` - Testing utility functions
- **Integration Tests**: `test/integration/api.test.ts` - Full API endpoint testing
- **Error Handling Tests**: `test/integration/errorTests.ts` - Validation and error scenarios

**Test Environment Setup:**
- Custom test setup file: `test/setup.ts`
- Environment variable configuration for test isolation
- Database connection management with proper cleanup
- Support for both local and CI environments

**Current Test Results:**
- ✅ Test Suites: 2 passed, 2 total
- ✅ Tests: 12 passed, 12 total
- ✅ Execution Time: ~10.5 seconds
- ✅ All API endpoints functional (CRUD operations)

#### 4. API Endpoints Tested
- `POST /api/v1/students/` - Student creation with file upload
- `GET /api/v1/students` - List all students
- `GET /api/v1/students/:id` - Get single student
- `PUT /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student
- Error handling for invalid requests and missing resources

#### 5. Security & Configuration Management
- Environment variables properly configured for different environments
- GitHub Secrets integration for sensitive data
- Input validation using express-validator
- Proper error handling and HTTP status codes
- CORS and security headers via helmet middleware

#### 6. Challenges Solved
**Database Password Synchronization:**
- Initially had mismatched passwords between local and CI environments
- Solution: Updated GitHub secrets and synchronized workflow configuration
- Implemented environment-specific password handling

**Test Environment Isolation:**
- Created dedicated test setup for environment variable management
- Added proper database connection handling for different environments
- Implemented cleanup mechanisms for test data

**Validation Error Messages:**
- Fixed validation message formatting to match expected test assertions
- Standardized error response format across all endpoints
- Improved parameter validation for ID fields

#### 7. Workflow Phases
1. **Checkout**: Repository code retrieval
2. **MySQL Setup**: Database service start and configuration
3. **Node.js Setup**: Multi-version testing environment
4. **Dependencies**: `npm ci` for clean installation
5. **Build**: TypeScript compilation (if present)
6. **Test**: Comprehensive test suite execution

### 📊 Current Status
- ✅ Local development environment fully functional
- ✅ All tests passing consistently
- ✅ GitHub Actions workflow configured and ready
- ✅ Database integration working across environments
- ✅ Secrets management properly implemented
- 🚀 Ready for deployment phase implementation

---

Tests & code based on <https://github.com/ilkkamtk/integration-testing-ready>

## Testing Scenarios

Testing successful API responses and error handling. The test cases for both scenarios are provided in the test folder.

## 1. Prerequisites

1. Create a new repository using this as a template (click _Use this template_ button on top of the main page of [this repository](https://github.com/mattpe/node-ci-intro))
1. Clone the repo and install dependencies with `npm install`
1. Create a database and a user for the application (example script: [db/create-db.sql](./db/create-db.sql))
    - NOTE: default username and password should be changed and not shared publicly in the repo, use environment variables instead
1. Create `.env` file in the root of the project (see `.env.example` for reference)
1. Run tests with `npm test` locally and make sure they pass

## 2. Setting up first CI/CD pipeline using GitHub Actions

1. Open the repository in GitHub in a browser and choose `Actions` from the top menu
   - Browse the available CI/CD templates and choose `Node.js` as the template
   - Commit the suggested changes to the repository
   - Pull the changes to your local repository
1. View & edit the `.github/workflows/node.js.yml` [yaml](https://yaml.org/) file and update the content according your needs
   - Set correct Node.js versions
   - Think about the phases you want to include in your pipeline, e.g. build, test, deploy..?
   - Refer to `package.json` for available scripts, e.g. `test:unit`, What will work on GitHub Actions platform and what is neeeded?
1. Test actions by committing the changes and pushing them to the remote repository, check the status of the actions in GitHub
1. Add other phases to the pipeline, e.g. use of Github secrets, tests including db,  deployment to a server (see example below)
   - Add description of your implementations (or trials and errors) to the beginning of `README.md` in your repository

### Tips

- You can set up multiple actions for different purposes, e.g. one for CI and another for CD or you can use multiple jobs in a single action, e.g. one for testing and another for deployment
- You can test and modify ready-made actions from GitHub, just click _New workflow_ on the Actions page to browse them
- You can set Node's `process.env` variables in the action using `env:` directive, e.g.

    ```yaml
    ...
        - run: npm run test:unit
          env:
            NODE_ENV: development
    ...
    ```

- You can create a temporary `.env` file in the action using `run:` directive, e.g.

    ```yaml
    ...
    - name: Create .env file
      run: |
        echo "DB_HOST=localhost" >> .env
        echo "DB_PORT=3306" >> .env
        echo "DB_NAME=testdb" >> .env
        echo "DB_USER=testuser" >> .env
        echo "DB_PASSWORD=testpassword" >> .env
    ...
    ```

- Replacing hardcoded values with [GitHub secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets), e.g.

    ```yaml
    echo "DB_USER=${{ secrets.DB_USER }}" >> .env
    echo "DB_PASSWORD=${{ secrets.DB_PASSWORD }}" >> .env
    ```

- Ubuntu image used by GitHub Actions has MySQL pre-installed, you can add steps to start the MySQL service and create a database and user for testing, e.g.

    ```yaml
    ...
    - name: Start MySQL service
      run: sudo service mysql start

    - name: Create test database and user
      run: |
        mysql -e "CREATE DATABASE testdb;"
        mysql -e "CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'testpassword';"
        mysql -e "GRANT ALL PRIVILEGES ON testdb.* TO 'testuser'@'localhost';"
        mysql -e "FLUSH PRIVILEGES;"
    ...
    ```

- Adding `env:` directive to set environment variables for the whole job, e.g.

    ```yaml
    jobs:
      build:
        runs-on: ubuntu-latest
        env:
          NODE_ENV: development
          DB_HOST: localhost
          DB_PORT: 3306
          DB_NAME: testdb
          DB_USER: testuser
          DB_PASSWORD: testpassword
    ...
    ```

- These can be referenced in the action steps as `${{ env.DB_USER }}` etc.

## 3. Example of setting up a CD pipeline for a Server (e.g. Virtual Machine in Azure)

1. First, deploy the application on the server manually
    - make sure you have a server running and you can pull the repository from GitHub (without a need type password) and run the application
    - Clone the repository (into folder `~/node-ci-example` in this example)
      - if the repo is private, you need to [setup ssh authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh). Easiest way to avoid passphrase prompts is to create the key without a passphrase (for added layer of security you may use passphrase and store it to your [ssh agent](https://gist.github.com/nepsilon/45fae11f8d173e3370c3))
    - Create the database and user for the application
    - Create and edit `.env` file
    - Test run app & run tests manually
    - Setup web server like Apache as a reverse proxy (see server deployment instructions from previous courses)
    - Use `pm2` to keep the application running, remember to add a name for the application `pm2 start app.js --name node-ci-example`
1. Automatic deployment is done on the server side by running terminal commands over SSH connection too
1. Create a new SSH key pair on the server for authenticating with the server using GitHub action
    - Generate a new key pair with `ssh-keygen -t rsa -b 4096 -m PEM -C "github-actions-node"`
    - Copy the public key `~/.ssh/id_rsa-github-node.pub` to the server's `~/.ssh/authorized_keys` file
    - Copy the private key `~/.ssh/id_rsa-github-node` to the repository secrets (use name `PRIVATE_KEY`) in GitHub (_Settings -> Secrets -> Actions -> New repository secret_)
    - Add other necessary properties to the repository secrets
      - `HOST`: IP address or domain name of the server
      - `USERNAME`: your username on the server
1. Create a new action in the `.github/workflows` folder, e.g. `deploy.yml`:
    - SSH connection from GitHub is established using the 3rd party [`appleboy/ssh-action`](https://github.com/appleboy/ssh-action)

    ```yaml
    name: Node.js CD

    # Controls when the action will run. 
    on:
      # Triggers the workflow on push or pull request events but only for the main branch
      push:
        branches: [ main ]

    # A workflow run is made up of one or more jobs that can run sequentially or in parallel
    jobs:
      # This workflow contains a single job called "deploy"
      deploy:
        # The type of runner that the job will run on
        runs-on: ubuntu-latest
        # Steps represent a sequence of tasks that will be executed as part of the job
        steps:
        - name: Deploy using ssh
          uses: appleboy/ssh-action@master
          with:
            # connect to server using credentials stored in github secrets
            host: ${{ secrets.HOST }}
            username: ${{ secrets.USERNAME }}
            key: ${{ secrets.PRIVATE_KEY }}
            port: 22
            script: |
              # after login to server go to application folder
              cd ~/ci-node-example
              # pull the changes from Github
              git pull origin main
              # to get the status and to check that everything is ok
              git status
              # install possibly updated dependencies
              npm install
              # run all test suites
              npm run test
              # generate apidocs
              npm run apidoc
              # finally, restart the application using the updated version of it
              pm2 restart node-ci-example
    ```

1. Test by committing the changes and pushing them to the remote repository, check the status of the action in GitHub
