To install app locally

1. Git clone the repository
2. Install mongo and create a db schema - omstatus
3. Go to project root and create a file - "/config/keys_dev.js" from "/config/key_prod.js"
  3.a. Configure mongo URI as "mongodb://localhost:27017/<dbname>"
  3.b. Create RSA private key from(http://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/index.html) and copy it to field "secretOrKey" 
4. Install Redux DevTools extension in your browser: http://extension.remotedev.io/
5. From Terminal go to project root and run the following commands:
  5.a. npm install
  5.b. npm start --prefix client
