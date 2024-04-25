# Creating images

## BACKEND (in the backend folder run):
`docker build -t backend .`

## FRONTEND (in the client folder run):
`docker build -t frontend .`

## Mysql:
`docker pull mysql`

## Volumes:
`docker volume create db-lib`

## Networks:
`docker network create db-net`

# Creating and running containers:

## mysql: 
`docker run -d --name mysql-db --network db-net -e MYSQL_ROOT_PASSWORD=1212 -e MYSQL_DATABASE=library -v db-lib:/var/lib/mysql -p 3306:3306 mysql`

## Creating initial table in mysql:
`docker exec -it mysql-db mysql -u root -p`

`CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    `desc` TEXT,
    cover VARCHAR(255),
    price INT NOT NULL
);`


## frontend: 
`docker run -d --name react --network db-net -p 3000:3000 frontend`
## backend: 
`docker run -d --name node --network db-net -p 5000:5000 backend`


The website will be up and running on port 3000 providing the users with the crud operations available.
Do not change the provided names as it may be hardcoded in the program.