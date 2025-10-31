# Xitomota

## ▪ Descripción del proyecto

Xitomota es una plataforma de comercio electrónico que permite a los usuarios navegar por un catálogo de productos, filtrar por categorías, agregar artículos a un carrito de compras y realizar un pago simulado (checkout).

El sistema también cuenta con un panel de administrador protegido por inicio de sesión, que permite la gestión completa (CRUD) del inventario, categorías, usuarios y la revisión de las órdenes de compra.

## ▪ Tecnologías utilizadas

Este proyecto está construido con un stack de tecnologías moderno, separando el frontend y el backend.

### Frontend (Lado del Cliente)
* **React** 
* **React Router** (para navegación y rutas)
* **Axios** (para llamadas a la API REST)
* **Jest & React Testing Library** (para pruebas unitarias y de integración)

### Backend (Lado del Servidor)
* **Java** 
* **Spring Boot**  (para la API REST)
* **Spring Data JPA** (para la interacción con la base de datos)
* **Spring Security** (para encriptación de contraseñas con BCrypt)
* **Maven** (Gestor de dependencias)

### Base de Datos
* **MySQL** 

## ▪ Instrucciones de instalación

Para levantar el proyecto localmente, es necesario tener instalados Java (JDK 17), Maven, Node.js (npm) y un servidor MySQL.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/BrayanAAR/Xitomota
    ```

2.  **Configurar la Base de Datos (MySQL):**
    * Abrir el gestor de MySQL Workbench.
    * Crea una nueva base de datos (o schema) llamada `base`.
        ```sql
        CREATE DATABASE base;
        ```
    * *Nota: SpringBoot crea las tablas al momento de iniciar, sin embargo hay que poblar categorias y productos.*
    * Abrir el archivo "import.sql"
         ```sql
        INSERT IGNORE INTO categorias (nombre) VALUES ('Poleras');
        INSERT IGNORE INTO categorias (nombre) VALUES ('Camisas');
        INSERT IGNORE INTO categorias (nombre) VALUES ('Polerones');
        INSERT IGNORE INTO categorias (nombre) VALUES ('Chaquetas');
        INSERT IGNORE INTO categorias (nombre) VALUES ('Pantalones');
        INSERT IGNORE INTO categorias (nombre) VALUES ('Buzos');
        ```
    * Luego abrir el archivo "productos.sql"
        ```sql
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (1,'Buzo Básico Algodón',12990,'buzo_basico.jpg',NULL,2,6);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (2,'Buzo Básico Negro',15990,'buzo_basico_negro.jpg',NULL,3,6);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (3,'Buzo Joggers Negro',17990,'buzo_joggers_negro.jpg',NULL,15,6);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (4,'Buzo Básico Azul',19990,'buzo_basico_azul.jpg',NULL,15,6);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (5,'Poleron Básica Algodón',12990,'poleron_basico.jpg',NULL,15,3);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (6,'Poleron Negro Estampado',15990,'poleron_negro_estampado.jpg',NULL,15,3);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (7,'Poleron Beige Simple',17990,'poleron_beige_simple.jpg',NULL,15,3);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (8,'Poleron Verde Estampado',19990,'poleron_verde_estampado.jpg',NULL,15,3);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (9,'Polera Básica Algodón',12990,'polera_basica.jpg',NULL,15,1);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (10,'Polera Básica Blanca',15990,'polera_blanca.jpg',NULL,15,1);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (11,'Polera Básica Negra',17990,'polera_negra.jpg',NULL,15,1);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (12,'Polera Beige Estampada',19990,'polera_beige_estampado.jpg',NULL,15,1);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (13,'Pantalón Básico Algodón',12990,'pantalon_basico.jpg',NULL,15,5);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (14,'Pantalón Jean Simple',15990,'pantalon_jean_basico.jpg',NULL,15,5);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (15,'Pantalón Jean Gris Estampado',17990,'pantalon_jean_gris_estampado.jpg',NULL,15,5);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (16,'Pantalón Jean Negro Simple',19990,'pantalon_jean_negro_basico.jpg',NULL,15,5);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (17,'Chaqueta Básica Algodón',12990,'chaqueta_basica.jpg',NULL,15,4);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (18,'Abrigo Beige Simple',15990,'chaqueta_abrigo_beige_basico.jpg',NULL,15,4);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (19,'Chaqueta Cuero Negra',17990,'chaqueta_cuero_negra.jpg',NULL,15,4);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (20,'Chaqueta Marrón Simple',19990,'chaqueta_marron_basica.jpg',NULL,15,4);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (21,'Camisa Básica Algodón',12990,'camisa_basica.jpg',NULL,15,2);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (22,'Camisa Marrón',15990,'camisa_marron.jpg',NULL,15,2);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (23,'Camisa Azul',17990,'camisa_azul.jpg',NULL,15,2);
        INSERT INTO `` (`id`,`nombre`,`precio`,`imagen`,`descripcion`,`stock`,`categoria_id`) VALUES (24,'Camisa Guayabera',19990,'camisa_guayabera.jpg',NULL,15,2);
        ```
    * En este punto ya deberian estar pobladas las tablas categoria y productos (también sirve agregar manualmente un nuevo producto desde la interfaz de Administrador)

3.  **Configurar el Backend (Carpeta `XitomotaBackend`):**
    * Navegar a la carpeta del backend.
    * Abrir el archivo `src/main/resources/application.properties`.
    * Asegurarse de que las credenciales de MySQL coincidan (yo usé `root` y `oracle`):
        ```properties
        spring.datasource.username=root
        spring.datasource.password=contraseña_mysql
        ```
    * (Opcional) El backend está configurado para crear un admin por defecto al iniciar.

4.  **Configurar el Frontend (Carpeta `Xitomota`):**
    * Navegar a la carpeta del frontend (en una terminal separada).
    * Instalar todas las dependencias de Node:
        ```bash
        cd ../Xitomota
        npm install
        ```

## ▪ Instrucciones de ejecución

Es necesario tener dos terminales abiertas para ejecutar el proyecto.

1.  **Ejecutar el Backend:**
    * Desde el IDE de VS Code, abrir el proyecto `XitomotaBackend` e iniciar la aplicación Spring Boot (ejecutando `XitomotabackendApplication.java`).
    * El servidor se iniciará en `http://localhost:8080`.

2.  **Ejecutar el Frontend:**
    * En la terminal que está en la carpeta `Xitomota` (frontend), ejecutar:
        ```bash
        npm run dev
        ```
    * El sitio de la tienda se abrirá automáticamente en `http://localhost:5173`.

## ▪ Credenciales de prueba

El sistema crea automáticamente un usuario administrador para que se pueda acceder al panel de control.

* **Acceso al Admin:** `http://localhost:5173/login`
* **Usuario (Email):** `admin@admin.cl`
* **Contraseña:** `admin`

Una vez logueado como admin, se puede acceder al dashboard en `http://localhost:5173/admin`.
* *Nota: Al iniciar sesión como admin deberia redirigir automáticamente a `http://localhost:5173/admin`.*
