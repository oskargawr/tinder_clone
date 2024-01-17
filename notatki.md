ip bazy danych: 172.19.0.2
docker run -it --rm --name mongodb-compass -e MONGODB_URI=mongodb://localhost:27017 -p 27017:27017 mongo/mongosh

dodalem bootstrapa, opisz go w dokumentacji

rzeczy do ktorych wrocic pozniej:
-dodac gdzies kontekst
-podzielic ladnie scss

zainstalowalem:
-react-spring/web
-react-tinder-card
-jsonwebtoken, express, mongodb, dotenv, bcrypt, cors, uuid, bodyparser, nodemon
-axios
-react-cookie
-react-icons/fa

to do:
    // frontend
    <!-- - napraw to ze te karty z tindera uciekaja i rozszerzaja strone-->
    <!-- - napraw to ze trzeba odswiezyc strone zeby zobaczyc matches -->
    <!-- - napraw matches: dwie osoby musza siebie nawzajem dodac zeby bylo match -->
    <!-- - napraw confirm password!!! -->
    <!-- - dodaj mozliwosc edycji danych w profliu -->
    - wcisnij gdzies useMemo i reducera
    - wystyluj jakies rzeczy tailwindem czy cos
    - zmien nazwy plikow na jsx
    <!-- - dodaj mozliwosc usuniecia konta -->
    <!-- - edycja historii czatow --> /// dalem tylko mozliwosc usuniecia
    <!-- - edycja matchow -->
    - kopia zapasowa profilu i mozliwosc importu
    <!-- - wystyluj karte tindera -->

    // backend
    - przerob jakies funkcje na promise
    - wyszukiwanie danych (?)

    scss:
        - matches kafelki
        - ten napis pod tinder cards
