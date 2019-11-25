# Taxi-Gestion.ch
````
  _____          _        ____           _   _                   _
 |_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
   | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
   | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
   |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|

 By Stéphane Bressani
  ____  _             _
 / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
               | |stephane-bressani.ch
               |_|github.com/stephaneworkspace

````  
## Introduction
Ceci est le code source de [Taxi-Gestion][1]

Il est écrit en C# avec Asp.net core 3 et Angular 8. La base de donnée est SQL
Server 2019 et est traitée par Entity Framework core.

Ce programme est entièrement dans son Front-End ainsi que dans le nom de ses
variables dans la langue française pour une meilleur comprenssion des termes
comptables.

Ce projet est de créer une comptabilité pour les chauffeurs de taxi sans passer
par une fiduciaire.

[1]: https://www.taxi-gestion.ch

## Installation
Il faut créer un fichier appsettings.json dans ./TaxiGestion/

````
{
  "JWTSettings": {
    "Token": "CHANGERICI"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=CHANGERICI; database=taxi-gestion; user id=CHANGERICI; password=CHANGERICI;",
    "DevConnection": "Server=localhost; database=taxi-gestion; user id=sa; password=MyCompleXPassW0rd!;"
  },
  "Email": {
    "Smtp": "CHANGERICI",
    "Port": "CHANGERICI"
  },
  "LetsEncrypt": {
    // Set this to automatically accept Let's Encrypt's terms of service.
    // If you don't set this in config, you will need to press "y" whenever the application starts
    "AcceptTermsOfService": true,

    // You must at least one domain name
    "DomainNames": [ "www.taxi-gestion.ch", "taxi-gestion.ch" ],

    // You must specify an email address to register with letsencrypt.org
    "EmailAddress": "CHANGERICI"
  }
}
````

Pour le pipeline Microsoft Azure pour l'intégration continue, voici les 
variables à configurer :

````
$(email-letsencrypt) -> E-mail pour le certificat ssl
$(ftp-server) -> Adresse ftp du serveur pour upload de l'artefact azure devOps
$(JWTSettings) -> Clé secrète JWT
$(smtp) -> Serveur smtp pour l'envoi d'e-mail (je n'ai pas prévu d'envoi d'e-mail avec authentification)
$(smtp-port) -> Port 25
$(SqlServerConnection) -> Serveur Sql Server 2019
$(ftp-password) -> Mot de passe ftp
$(ftp-user) -> User ftp
````

## Preversion
Pour le moment ce programme est en préversion. Il n'est pas utilisable en
production

## Licence
This program is free software; you can redistribute it and/or modify it under 
the terms of the GNU General Public License version 2 as published by the Free 
Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A 
PARTICULAR PURPOSE.  See the GNU General Public License for more details.
