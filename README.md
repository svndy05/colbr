# API

1. Creation d'un container mysql:latest avec docker desktop
2. Set le port 3306 et la variable d'environnement DB_PASSWORD=colbr
3. Set la variable d'environnement dans le .env DB_PASSWORD=colbr
4. Lancer les migrations laravel
5. connection a la bdd avec le CLI docker desktop ( mysql -u root -p) mot de passe colbr
6. creer une bdd avec le meme nom que le .env CREATE DATABASE (DB_DATABASE)
7.  use (DB_DATABASE)
8. inserez les questions  
INSERT INTO questions (question,answer) VALUES ('Avez-vous des connaissances en finance','["Oui","Non"]');  
INSERT INTO questions (question,answer,multiple_choice) VALUES ('Quels produits financiers connaissez-vous?','["Les Actions","Les Obligations","Les Produits Derives"]',true); 
