# Documentation du Projet

## Installation et Lancement

### 1. Installation des dépendances
```sh
npm install
```

### 2. Configuration de la base de données
Modifier le fichier `.env` avec les informations suivantes :
```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=5432
PORT=5000
JWT_SECRET=your_secret_key
```

### 3. Lancer le serveur
```sh
npm start
```

## Tables Disponibles

### 1. **Users**
| Colonne       | Type                | Description                        |
|--------------|---------------------|------------------------------------|
| id           | INTEGER (PK)        | Identifiant unique de l'utilisateur |
| firstName    | VARCHAR(255)        | Prénom de l'utilisateur           |
| lastName     | VARCHAR(255)        | Nom de l'utilisateur              |
| email        | VARCHAR(255) UNIQUE | Email de l'utilisateur            |
| password     | VARCHAR(255)        | Mot de passe hashé                |
| role         | VARCHAR(50)         | Rôle de l'utilisateur             |
| createdAt    | TIMESTAMP           | Date de création                  |
| updatedAt    | TIMESTAMP           | Date de mise à jour               |

### 2. **Products**
| Colonne       | Type                | Description                        |
|--------------|---------------------|------------------------------------|
| id           | INTEGER (PK)        | Identifiant unique du produit      |
| nameProduct  | VARCHAR(255)        | Nom du produit                     |
| price        | DOUBLE PRECISION     | Prix du produit                    |
| stockQuantity| INTEGER             | Quantité en stock                  |
| createdAt    | TIMESTAMP           | Date de création                   |
| updatedAt    | TIMESTAMP           | Date de mise à jour                |
| userId       | INTEGER (FK)        | Identifiant de l'utilisateur ayant créé le produit |
| userName     | VARCHAR(255)        | Prénom du créateur du produit      |
| userLastName | VARCHAR(255)        | Nom du créateur du produit         |

### 3. **Orders**
| Colonne   | Type                | Description                        |
|-----------|---------------------|------------------------------------|
| id        | INTEGER (PK)        | Identifiant unique de la commande |
| userId    | INTEGER (FK)        | Identifiant de l'utilisateur      |
| total     | DOUBLE PRECISION    | Montant total de la commande      |
| status    | VARCHAR(50)         | Statut de la commande             |
| createdAt | TIMESTAMP           | Date de création                  |
| updatedAt | TIMESTAMP           | Date de mise à jour               |

### 4. **Finance**
| Colonne   | Type                | Description                        |
|-----------|---------------------|------------------------------------|
| id        | INTEGER (PK)        | Identifiant unique de la transaction |
| userId    | INTEGER (FK)        | Identifiant de l'utilisateur      |
| amount    | DOUBLE PRECISION    | Montant de la transaction         |
| type      | VARCHAR(50)         | Type de transaction (crédit/débit) |
| createdAt | TIMESTAMP           | Date de création                  |
| updatedAt | TIMESTAMP           | Date de mise à jour               |

### 5. **Stock**
| Colonne       | Type                | Description                        |
|--------------|---------------------|------------------------------------|
| id           | INTEGER (PK)        | Identifiant unique du stock       |
| productId    | INTEGER (FK)        | Identifiant du produit            |
| quantity     | INTEGER             | Quantité disponible               |
| createdAt    | TIMESTAMP           | Date de création                  |
| updatedAt    | TIMESTAMP           | Date de mise à jour               |

## Authentification

### Routes disponibles

- **POST /api/auth/register** : Créer un nouvel utilisateur.
- **POST /api/auth/login** : Connexion et récupération du token.
- **GET /api/users** : Récupérer la liste des utilisateurs.
- **PUT /api/users/:id** : Mettre à jour un utilisateur.
- **DELETE /api/users/:id** : Supprimer un utilisateur.

## Rôles et Autorisations

### 1. **ADMIN**
- Accès à tous les produits.
- Peut modifier ou supprimer n'importe quel produit.
- Peut gérer les utilisateurs (ajouter, modifier, supprimer).
- Peut voir toutes les commandes et les transactions.

### 2. **EMPLOYEE**
- Peut ajouter, modifier et supprimer ses propres produits.
- N'a pas accès aux produits des autres utilisateurs.
- Peut gérer uniquement ses propres commandes et transactions.

### 3. **COMPANY**
- Peut gérer plusieurs utilisateurs sous son compte.
- Peut voir les commandes de ses employés.
- Peut gérer ses propres produits.

### 4. **CLIENT**
- Peut voir les produits disponibles.
- Peut passer des commandes.

## Gestion des Produits

### Routes disponibles

- **POST /api/products** : Créer un produit.
- **GET /api/products** : Récupérer tous les produits (Admin voit tout, Employee voit seulement les siens).
- **PUT /api/products/:id** : Modifier un produit (Admin peut modifier tous, Employee seulement les siens).
- **DELETE /api/products/:id** : Supprimer un produit (Admin peut tout supprimer, Employee seulement les siens).

## Utilisation des Middlewares

Le projet utilise des middlewares pour gérer l'authentification et l'autorisation des utilisateurs. 

- **authenticate** : Vérifie si l'utilisateur est connecté avant d'accéder à certaines routes.
- **authorize(roles)** : Permet uniquement aux utilisateurs avec des rôles spécifiques d'accéder à certaines routes.

Ces middlewares sont appliqués dans les routes, par exemple :
```js
router.get('/', authenticate, async (req, res) => {
  // Code pour récupérer les produits
});
```

Ainsi, seuls les utilisateurs connectés peuvent accéder à ces routes.

