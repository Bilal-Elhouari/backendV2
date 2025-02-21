# Business Management API

## Description
API de gestion d'entreprise permettant la gestion des utilisateurs, des produits et des commandes. Basée sur Node.js, Express.js et Sequelize avec PostgreSQL.

## Fonctionnalités Implémentées

### 1. Authentification & Autorisation
- ✅ **Connexion (`POST /api/auth/login`)**
- ✅ **Gestion des rôles** :
  - `ADMIN` : Accès à tous les produits et actions administratives.
  - `EMPLOYEE` : Accès uniquement à ses propres produits.

### 2. Gestion des Produits (`/api/products`)
- ✅ **Créer un produit** (`POST /api/products`)
  - Un utilisateur peut créer un produit avec `nameProduct`, `price` et `stockQuantity`.
- ✅ **Récupérer les produits** (`GET /api/products`)
  - Un **admin** voit tous les produits.
  - Un **employé** voit uniquement ses propres produits.
- ✅ **Modifier un produit** (`PUT /api/products/:id`)
  - Un **admin** peut modifier tous les produits.
  - Un **employé** ne peut modifier que ses propres produits.
- ✅ **Supprimer un produit** (`DELETE /api/products/:id`)
  - Un **admin** peut supprimer tous les produits.
  - Un **employé** ne peut supprimer que ses propres produits.

## Modifications Récentes
- 🛠️ **Correction de l'accès admin pour `GET` et `PUT`**
- 🛠️ **Ajout de `console.log(req.user)` pour débogage**
- 🛠️ **Changement de `quantity` en `stockQuantity` pour correspondre à la base de données**
- 🛠️ **Ajout de la vérification des rôles dans `PUT` et `DELETE`**

## Modèle de Données (`Products`)
| Colonne       | Type               | Description |
|--------------|-------------------|-------------|
| `id`         | INTEGER (PK)       | Identifiant du produit |
| `nameProduct` | STRING             | Nom du produit |
| `price`      | FLOAT              | Prix du produit |
| `stockQuantity` | INTEGER          | Stock disponible |
| `createdAt`  | TIMESTAMP          | Date de création |
| `updatedAt`  | TIMESTAMP          | Date de mise à jour |
| `userId`     | INTEGER (FK)       | ID de l'utilisateur créateur |
| `userName`   | STRING             | Nom du créateur |
| `userLastName` | STRING           | Prénom du créateur |

## Installation & Lancement

### 📥 Installation des dépendances
```bash
npm install
```

### 🚀 Lancer le serveur
```bash
npm start
```

### 📌 Variables d'environnement (`.env`)
Créer un fichier `.env` avec :
```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/database
SECRET_KEY=your_secret_key
```

## 📩 Contact
Si besoin d'aide, contactez-moi ! 😊

