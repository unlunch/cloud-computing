# ExpressRESTfulAPI

## How to install

1. Install npm dependencies
```
npm install
```
2. Run prisma model
```
prisma migrate dev
```
3. Set environment variables
```
APP_URL=http://localhost
PORT=3000
SECRET_KEY=secret

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=restful_server
DB_USERNAME=root
DB_PASSWORD=
DATABASE_URL="${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

MAIL_SERVICE=gmail
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=
MAIL_PASSWORD=
```
4. Run application
```
npm run dev
```
5. Open the application in the browser, [http://localhost:3000/](http://localhost:3000/)