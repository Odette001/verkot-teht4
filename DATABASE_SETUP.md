# Database Setup for Local Development

## Current Issue
Your tests are failing because MySQL is not installed or running on your local machine.

## Solutions

### Option 1: Install MySQL Server (Recommended for Windows)
1. Download MySQL Community Server from: https://dev.mysql.com/downloads/mysql/
2. Install with these settings:
   - Root password: `root` (to match your GitHub secret)
   - Port: 3306 (default)
3. After installation, create the test database:
   ```sql
   mysql -u root -proot < db/create-db.sql
   ```

### Option 2: Use Docker (If you have Docker installed)
```bash
# Start MySQL container
docker run --name mysql-test -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0

# Wait for MySQL to start (about 30 seconds)
# Then create the database
docker exec -i mysql-test mysql -uroot -proot < db/create-db.sql
```

### Option 3: Use XAMPP (Easiest for beginners)
1. Download XAMPP from: https://www.apachefriends.org/download.html
2. Install and start MySQL from XAMPP control panel
3. Set root password to `root` in phpMyAdmin
4. Import the database using: `mysql -u root -proot < db/create-db.sql`

## After Setup
1. Update your `.env` file:
   ```
   DB_PASS=root
   ```
2. Run tests: `npm test`

## Current Configuration
- Your GitHub Actions will work correctly with the secret password
- Local development needs MySQL with password "root"
- Database name: `cicdtest`