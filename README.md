# Node.js TypeScript Clean Architecture Starter

A production-ready starter template for building scalable backend APIs using **Clean Architecture** principles with Node.js, TypeScript, Express, and SQLite.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Clean Architecture Layers](#-clean-architecture-layers)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Design Patterns](#-design-patterns)
- [Best Practices](#-best-practices)

## ✨ Features

- ✅ **Clean Architecture** - Separation of concerns with well-defined layers
- ✅ **TypeScript** - Type-safe development with full IntelliSense support
- ✅ **SOLID Principles** - Maintainable and extensible code
- ✅ **Dependency Injection** - Loose coupling and testability
- ✅ **Repository Pattern** - Abstract data access layer
- ✅ **Use Case Pattern** - Business logic isolation
- ✅ **DTO Pattern** - Data transfer with validation
- ✅ **Error Handling** - Centralized error handling with custom error classes
- ✅ **SQLite** - Lightweight database (easily swappable to PostgreSQL/MongoDB)
- ✅ **Hot Reload** - Fast development with tsx watch mode

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: SQLite (with PostgreSQL support)
- **Dev Tools**: tsx, dotenv

## 📁 Project Structure

```
src/
├── domain/                          # Enterprise Business Rules
│   ├── entities/
│   │   └── Product.ts              # Core business entity
│   ├── repositories/
│   │   └── ProductRepository.ts    # Repository interface (contract)
│   ├── types/
│   │   └── Category.ts             # Domain types/enums
│   └── value-objects/              # Value objects (immutable domain concepts)
│
├── application/                     # Application Business Rules
│   ├── dto/
│   │   ├── CreateProductDTO.ts     # Input data transfer objects
│   │   ├── UpdateProductDTO.ts
│   │   └── ProductResponseDTO.ts   # Output data transfer objects
│   ├── use-cases/
│   │   ├── CreateProductUseCase.ts # Business logic orchestration
│   │   ├── GetAllProductsUseCase.ts
│   │   ├── GetProductByIdUseCase.ts
│   │   ├── UpdateProductUseCase.ts
│   │   └── DeleteProductUseCase.ts
│   └── services/
│       └── ProductService.ts       # Optional application services
│
├── infrastructure/                  # Frameworks & Drivers
│   ├── database/
│   │   └── sqlite/
│   │       ├── connection.ts       # Database connection management
│   │       └── schemas/
│   │           └── ProductSchema.ts # ORM models
│   ├── repositories/
│   │   └── SequelizeProductRepository.ts # Repository implementation
│   └── container.ts                # Dependency injection container
│
├── interfaces/                      # Interface Adapters
│   └── http/
│       ├── controllers/
│       │   └── ProductController.ts # HTTP request handlers
│       ├── routes/
│       │   └── ProductRoutes.ts    # Route definitions
│       └── middlewares/
│           ├── errorHandler.ts     # Global error handling
│           └── loggerMiddleware.ts # Request logging
│
├── app.ts                          # Express application setup
└── server.ts                       # Application entry point
```

## 🏗 Clean Architecture Layers

This project follows **Uncle Bob's Clean Architecture** pattern with four distinct layers:

### 1️⃣ Domain Layer (Core)
**Location**: `src/domain/`

The **innermost layer** containing enterprise business rules. This layer is **completely independent** and has **zero dependencies** on external frameworks.

- **Entities** (`entities/`): Core business objects with business logic
  - Example: `Product.ts` - Represents a product with validation and business rules
  
- **Repository Interfaces** (`repositories/`): Contracts defining how to access data
  - Example: `ProductRepository.ts` - Interface with methods like `findAll()`, `create()`, etc.
  
- **Value Objects** (`value-objects/`): Immutable domain concepts
  
- **Domain Types** (`types/`): Enums and types specific to business domain
  - Example: `Category.ts` - Product category enum

**Key Principle**: Domain layer should never import from outer layers.

### 2️⃣ Application Layer (Use Cases)
**Location**: `src/application/`

Contains **application-specific business rules**. Orchestrates the flow of data between the domain and outer layers.

- **Use Cases** (`use-cases/`): Single-responsibility application logic
  - Each use case represents one user action/feature
  - Example: `CreateProductUseCase.ts` - Orchestrates product creation
  
- **DTOs** (`dto/`): Data Transfer Objects for input/output
  - **Input DTOs**: `CreateProductDTO`, `UpdateProductDTO`
  - **Output DTOs**: `ProductResponseDTO`
  
- **Services** (`services/`): Complex application logic coordination
  - Example: `ProductService.ts` - Manages multiple use cases

**Key Principle**: Use cases depend only on the domain layer, not on frameworks or databases.

### 3️⃣ Infrastructure Layer (External Interfaces)
**Location**: `src/infrastructure/`

Contains **implementations** for external services, databases, and third-party integrations.

- **Database** (`database/`): Database connection and ORM configurations
  - `connection.ts` - Database connection management
  - `schemas/ProductSchema.ts` - Sequelize model definitions
  
- **Repositories** (`repositories/`): Concrete implementations of domain repositories
  - `SequelizeProductRepository.ts` - Implements `ProductRepository` interface using Sequelize
  
- **Container** (`container.ts`): Dependency injection container
  - Wires up all dependencies (repositories, use cases, controllers)

**Key Principle**: This layer implements interfaces defined in the domain layer.

### 4️⃣ Interface Layer (Delivery Mechanism)
**Location**: `src/interfaces/`

The **outermost layer** handling external communication (HTTP, CLI, GraphQL, etc.).

- **Controllers** (`http/controllers/`): Handle HTTP requests/responses
  - `ProductController.ts` - Delegates to use cases, formats responses
  
- **Routes** (`http/routes/`): Define API endpoints
  - `ProductRoutes.ts` - Maps URLs to controller methods
  
- **Middlewares** (`http/middlewares/`): Cross-cutting concerns
  - `errorHandler.ts` - Global error handling
  - `loggerMiddleware.ts` - Request/response logging

**Key Principle**: Controllers are "thin" - they only handle HTTP concerns and delegate to use cases.

---

## 🎯 Clean Architecture Flow

```
HTTP Request
    ↓
[Route] → [Controller] → [Use Case] → [Repository Interface] → [Repository Implementation] → [Database]
    ↑                          ↓
[Response] ← [DTO] ← [Entity]
```

**Example: Create Product Flow**

1. **Route** (`ProductRoutes.ts`) receives POST `/api/products`
2. **Controller** (`ProductController.ts`) extracts request data
3. **Use Case** (`CreateProductUseCase.ts`) receives DTO and validates business rules
4. **Repository Interface** (`ProductRepository.ts`) defines the contract
5. **Repository Implementation** (`SequelizeProductRepository.ts`) saves to database
6. **Entity** (`Product.ts`) is returned and converted to DTO
7. **Controller** formats response and sends back to client

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd training
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_PATH=./data/development.sqlite
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the server**
   
   **Development mode (with hot reload):**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

The API will be running at `http://localhost:3000`

---

## 📖 Usage

### Creating a New Feature

Follow these steps to add a new entity (e.g., `User`):

#### 1. Domain Layer
```typescript
// src/domain/entities/User.ts
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}
}

// src/domain/repositories/UserRepository.ts
export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
```

#### 2. Application Layer
```typescript
// src/application/dto/CreateUserDTO.ts
export interface CreateUserDTO {
  name: string;
  email: string;
}

// src/application/use-cases/CreateUserUseCase.ts
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  
  async execute(dto: CreateUserDTO): Promise<User> {
    const user = new User(generateId(), dto.name, dto.email);
    return await this.userRepository.create(user);
  }
}
```

#### 3. Infrastructure Layer
```typescript
// src/infrastructure/database/sqlite/schemas/UserSchema.ts
import { DataTypes, Model } from 'sequelize';

export class UserModel extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
}

// src/infrastructure/repositories/SequelizeUserRepository.ts
export class SequelizeUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const result = await UserModel.create({
      id: user.id,
      name: user.name,
      email: user.email
    });
    return new User(result.id, result.name, result.email);
  }
}
```

#### 4. Interface Layer
```typescript
// src/interfaces/http/controllers/UserController.ts
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}

// src/interfaces/http/routes/UserRoutes.ts
router.post('/', userController.createUser);
```

---

## 🔌 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Example Requests

**Create Product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "stock": 10,
    "category": "ELECTRONICS"
  }'
```

**Get All Products:**
```bash
curl http://localhost:3000/api/products
```

---

## 🎨 Design Patterns

### 1. Repository Pattern
**Purpose**: Abstract data access logic

```typescript
// Interface (Domain Layer)
interface ProductRepository {
  findAll(): Promise<Product[]>;
}

// Implementation (Infrastructure Layer)
class SequelizeProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    // Sequelize-specific implementation
  }
}
```

### 2. Use Case Pattern
**Purpose**: Encapsulate single business operations

```typescript
class CreateProductUseCase {
  constructor(private repository: ProductRepository) {}
  
  async execute(dto: CreateProductDTO): Promise<Product> {
    // Business logic here
  }
}
```

### 3. Dependency Injection
**Purpose**: Loose coupling and testability

```typescript
// container.ts
const productRepository = new SequelizeProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const productController = new ProductController(createProductUseCase);
```

### 4. DTO Pattern
**Purpose**: Data validation and transformation

```typescript
interface CreateProductDTO {
  name: string;
  price: number;
  stock: number;
  category: Category;
}
```

---

## ✅ Best Practices

### Dependency Rule
> **Dependencies point inward**: Outer layers depend on inner layers, never the reverse.

```
Interfaces → Application → Domain
Infrastructure → Domain
```

### Single Responsibility
Each class/module has **one reason to change**:
- Controllers handle HTTP
- Use cases handle business logic  
- Repositories handle data access

### Interface Segregation
Define small, focused interfaces:
```typescript
interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  // ... other methods
}
```

### Testing Strategy
- **Domain Layer**: Unit tests (pure business logic)
- **Application Layer**: Unit tests with mocked repositories
- **Infrastructure**: Integration tests
- **Interfaces**: E2E tests

---

## 🔄 Database Migration

This starter uses **SQLite** by default, but you can easily switch to **PostgreSQL**:

1. Update `package.json` dependencies
2. Modify `src/infrastructure/database/` to use PostgreSQL connection
3. Update environment variables

---

## 📝 Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production build
npm test         # Run tests (to be implemented)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

ISC

---

## 🎓 Learning Resources

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)

---

## 🙏 Acknowledgments

Built with Clean Architecture principles for maintainable, scalable, and testable backend applications.

---

**Happy Coding! 🚀**
