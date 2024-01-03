[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/wLNuUf9n)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13306966&assignment_repo_type=AssignmentRepo)

Projekt - Aplikacja typu Tinder

Zbudowana przeze mnie aplikacja typu Tinder. Aplikacja pozwala na przeglądanie profili innych użytkowników, a także na ich ocenianie. Użytkownik może również edytować swój profil, a także wysyłać wiadomości do innych użytkowników. Aplikacja posiada również system powiadomień, który informuje użytkownika o nowych wiadomościach oraz o nowych ocenach jego profilu.

## Technologie

* MongoDB
    - Baza danych składająca się z następujących kolekcji:
        - users: struktura danych użytkowników (przykladowe dane):
         {
            "_id": ObjectId("5f9b7b7b7b7b7b7b7b7b7b7b"),
            "first_name": "Jan",
            "last_name": "Kowalski",
            "hashed_password": "123456789",
            "dob_day": 1,
            "dob_month": 1,
            "dob_year": 1997,
            "gender": "male",
            "gender_interest": "woman"
            "email": "abc@abc.com",
            "img_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fpl-pl%2Fwyszukiwanie%",
            "about": "i love computers",
            "location": "Warszawa",
            "matches": [
                {
                    "user_id": ObjectId("3f9b7b7b7b7b7b7b7b7b7b7b"),
                },
                {
                    "user_id": ObjectId("4f9b7b7b7b7b7b7b7b7b7b7b"),
                }
            ],
         }
        - messages: struktura danych wiadomości (przykladowe dane):
         {
            "_id": ObjectId("5f9b7b7b7b7b7b7b7b7b7b7b"),
            "sender_id": ObjectId("3f9b7b7b7b7b7b7b7b7b7b7b"),
            "receiver_id": ObjectId("4f9b7b7b7b7b7b7b7b7b7b7b"),
            "message": "Hello",
            "timestamp": "2020-10-30T12:00:00.000Z"
         }

* Express

* React

* Node.js

