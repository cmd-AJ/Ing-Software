# Ing-Software

Para conectar a el servidor se debe de utilizar la llave Wokingkeys.pem
username: Ubuntu

Dado que no hay IP elastica no podremos accesar en el mismo IP


Realización del Server instalación de Docker al servidor
Base de datos postgresql 
Nombre: postgres
Password: port123
puertos 5432:5432
Comandos a utilizar:
Crear un contenedor y la imagen
sudo docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=port123 -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres:alpine

Ver contenedores
docker ps - a

eliminar un docker es 
docker rm ID


Editado los grupos de seguridad de AWS
Puerto 5432 --Para Postgressql
Puerto 80 --Para nGInx (HTTP)
Puerto 22 Para conección ssh
Puerto 443 HTTPS


Instalación de dependencias
Node JS
sudo apt-get nodejs

Npm
sudo apt-get npm


Instalación de Ionic

OJO debido a que es Ubuntu y la forma de instalar globalmente entonces debemos de utilizar o instalar
nvm para versionar los paquetes de javascript

npm install -g @ionic/cli @capacitor/assets

npm install && ionic serve

ionic serve //este es el comando para correr el código en la web


