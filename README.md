# Cine de verano 🍹 CRUD
Cine de Verano CRUD es un proyecto didáctico que tiene como objetivo aprender a utilizar JavaScript para construir una aplicación web sencilla que realiza operaciones CRUD (Create, Read, Update, Delete) sobre una API simulada con json-server.

## ⚙️ Tecnologías utilizadas
- HTML (HyperText Markup Language)
- CSS (Cascading Style Sheets)
- JS (JavaScript)
- fetch API: función de JS para hacer peticiones HTTP a la API
- json-server: herramienta para simular una API
- API REST: GET, POST, PUT, DELETE

## 📁 Estructura del proyecto
```
cine-de-verano-crud/
├── /server
│   └── db.json             ← Base de datos simulada con las películas
├── index.html               ← Página principal que muestra todas las películas
├── README.md                ← Documentación básica del proyecto
├── /src
│   └── /css
│   │   └── style.css        ← Estilos globales del sitio web
│   └── /js
│       ├── services.js      ← Funciones que llaman a la API para el index: GET y DELETE
│       ├── create.js        ← Lógica para crear nuevas películas y función POST
│       ├── modify.js        ← Lógica para editar películas y función PUT
│       ├── detail.js        ← Lógica para mostrar el detalle de una película
│       └── main.js          ← Lógica principal de carga y eventos de la página inicial
└── /pages
    ├── create.html          ← Formulario para añadir una nueva película 
    ├── modify.html          ← Formulario para editar una película existente
    └── detail.html          ← Página que muestra todos los detalles de una película
```
## 🎯 Funcionalidades principales
- Ver todas las películas (GET).
- Añadir una nueva película (POST).
- Modificar una película existente (PUT).
- Eliminar una película (DELETE).
- Ver el detalle de cada película.
