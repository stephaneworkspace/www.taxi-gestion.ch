Créer un fichier appsettings dans ./TaxiGestion/
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
Variables pour le pipeline azure devOps
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