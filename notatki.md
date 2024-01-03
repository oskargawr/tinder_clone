ip bazy danych: 172.19.0.2
docker run -it --rm --name mongodb-compass -e MONGODB_URI=mongodb://localhost:27017 -p 27017:27017 mongo/mongosh