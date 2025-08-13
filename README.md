# Laboratory Automation Data Platform

A comprehensive full-stack platform for managing laboratory workflows, sample tracking, and data analysis in genomics and life sciences research environments.

## 🧬 Overview

The Laboratory Automation Data Platform is designed to streamline laboratory operations by providing:

- **Sample Management**: Track samples from reception to analysis
- **Reagent Management**: Monitor inventory, expiry dates, and usage
- **Library Preparation**: Manage library prep workflows and protocols
- **Sequencing Management**: Coordinate sequencing runs and platforms
- **Data Analysis**: Process and analyze genomic data
- **Project Management**: Organize research projects and collaborations
- **Workflow Automation**: Define and execute standardized protocols
- **Quality Control**: Monitor and ensure data quality throughout processes

## 🏗️ Architecture

```
Laboratory Automation Platform/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts for state management
│   │   ├── modules/         # Feature-specific components
│   │   └── dashboard/       # Dashboard components
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Node.js + Express + Prisma backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── prisma/              # Database schema and migrations
│   └── package.json
├── docs/                     # Documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- Redis (optional, for caching)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laboratory-automation-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Setup database
   npx prisma migrate dev
   npx prisma generate
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - API Health: http://localhost:3001/health

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Fast build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Modern database toolkit
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Socket.IO** - Real-time communication
- **Winston** - Logging
- **Redis** - Caching (optional)

## 📊 Features

### Core Modules

#### 🧪 Sample Management
- Sample registration and tracking
- Barcode integration
- Storage location management
- Quality metrics tracking
- Sample lifecycle management

#### ⚗️ Reagent Management  
- Inventory tracking
- Expiry date monitoring
- Usage logging
- Automatic reorder alerts
- Supplier management

#### 🔬 Library Preparation
- Protocol management
- Quality control checkpoints
- Batch processing
- Equipment integration
- Documentation workflows

#### 🧬 Sequencing Management
- Platform scheduling
- Run configuration
- Real-time monitoring
- Quality assessment
- Data output management

#### 📈 Data Analysis
- Pipeline management
- Result visualization
- Statistical analysis
- Report generation
- Data export capabilities

#### 👥 User & Project Management
- Role-based access control
- Project collaboration
- Team management
- Audit logging
- Permission management

### Advanced Features

- **Real-time Updates**: Socket.IO integration for live status updates
- **API Documentation**: Comprehensive REST API with OpenAPI/Swagger
- **Data Import/Export**: CSV/Excel integration for bulk operations
- **Audit Trail**: Complete activity logging and traceability
- **Multi-tenant Support**: Laboratory isolation and data security
- **Integration Ready**: APIs for LIMS and equipment integration

## 🔧 Configuration

### Environment Variables

Backend configuration via `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/lab_automation"

# Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"

# Optional: Redis for caching
REDIS_URL="redis://localhost:6379"
```

### Database Schema

The platform uses a comprehensive database schema with the following key entities:

- **Users**: Authentication and role management
- **Projects**: Research project organization
- **Samples**: Sample tracking and metadata
- **Libraries**: Library preparation workflows
- **Sequencing Runs**: Sequencing operation management
- **Analysis Results**: Data analysis outcomes
- **Reagents**: Inventory and usage tracking
- **Workflows**: Process automation

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user
```

### Sample Management
```
GET    /api/samples        # List samples (with pagination/filtering)
POST   /api/samples        # Create new sample
GET    /api/samples/:id    # Get sample details
PUT    /api/samples/:id    # Update sample
DELETE /api/samples/:id    # Delete sample
GET    /api/samples/stats  # Sample statistics
```

### Reagent Management
```
GET    /api/reagents       # List reagents
POST   /api/reagents       # Add new reagent
PUT    /api/reagents/:id   # Update reagent
DELETE /api/reagents/:id   # Remove reagent
```

[Complete API documentation available in `/docs/api.md`]

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

### Database Operations
```bash
# Create migration
npx prisma migrate dev --name migration-name

# Reset database
npx prisma migrate reset

# Seed database
npm run db:seed

# Prisma Studio (GUI)
npx prisma studio
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Docker Deployment
```bash
# Build and run with docker-compose
docker-compose up -d
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure Redis (optional)
3. Set environment variables
4. Run database migrations
5. Build and deploy applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add documentation for new features
- Ensure tests pass before submitting
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review the API documentation

## 🗺️ Roadmap

### Upcoming Features
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Machine learning integration
- [ ] Equipment API integrations
- [ ] Advanced reporting
- [ ] Multi-language support
- [ ] Advanced workflow builder
- [ ] Data visualization enhancements

---

**Laboratory Automation Data Platform** - Streamlining science through technology 🧬⚡