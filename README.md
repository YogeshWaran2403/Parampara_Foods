# Parampara Foods - Complete Food Delivery Application

A comprehensive food delivery application built with ASP.NET Core 8.0 backend and React 18 frontend, featuring organic food delivery, user authentication, order management, and modern UI/UX design.

## 🚀 Quick Start

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB or Express)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Parampara_MI
   ```

2. **Backend Setup**
   ```bash
   cd Parampara-Foods-API
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
   Backend will run on `https://localhost:8080`

3. **Frontend Setup**
   ```bash
   cd Parampara-Foods-Web
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

4. **Quick Start Script (Windows)**
   ```bash
   cd Parampara-Foods-Web
   scripts\start.bat
   ```

## 📁 Project Structure

```
Parampara_MI/
├── Parampara-Foods-API/          # ASP.NET Core 8.0 Backend
│   ├── Controllers/              # API Controllers
│   ├── Models/                   # Entity Models
│   ├── DTOs/                     # Data Transfer Objects
│   ├── Services/                 # Business Logic Services
│   ├── Data/                     # DbContext & Migrations
│   ├── Migrations/               # Entity Framework Migrations
│   └── wwwroot/                  # Static Files
├── Parampara-Foods-Web/          # React 18 Frontend
│   ├── components/               # React Components
│   ├── pages/                    # Page Components
│   ├── contexts/                 # React Contexts
│   ├── services/                 # API Services
│   ├── types/                    # TypeScript Types
│   └── scripts/                  # Development Scripts
└── README.md                     # This file
```

## 🛠️ Technology Stack

### Backend (ASP.NET Core 8.0)
- **Framework**: ASP.NET Core 8.0 Web API
- **Database**: Entity Framework Core with SQL Server
- **Authentication**: ASP.NET Core Identity with JWT Bearer tokens
- **OAuth**: Google OAuth integration
- **SMS**: Twilio integration for phone verification
- **Documentation**: Swagger/OpenAPI
- **CORS**: Cross-Origin Resource Sharing enabled

### Frontend (React 18)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn/ui with Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: Custom page-based routing
- **HTTP Client**: Fetch API with JWT token management
- **Icons**: Lucide React

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Email/Password Registration & Login**
- **Google OAuth Integration**
- **Phone Number Verification (Twilio SMS)**
- **JWT Bearer Token Authentication**
- **Role-based Access Control (Admin/User)**

### 🛒 E-commerce Features
- **Product Catalog** with categories and search
- **Shopping Cart** with persistent storage
- **Wishlist** functionality
- **Order Management** with status tracking
- **Delivery Status History**
- **Product Reviews & Ratings**

### 👥 User Management
- **User Profiles** with extended information
- **Order History** and tracking
- **Address Management**
- **Admin Dashboard** for product/order management

### 📱 Modern UI/UX
- **Responsive Design** (Mobile-first approach)
- **Glassmorphism Effects** and modern animations
- **Auto-scrolling Carousels**
- **Dynamic Card Highlighting**
- **Smooth Transitions** and hover effects
- **Cross-browser Compatibility**

### 🎨 Design Features
- **Rounded Corner Cards** (permanent styling)
- **Sharp Corner Video Section**
- **Gradient Backgrounds** and animations
- **Custom CSS** with maximum specificity
- **Professional Color Scheme**

## 🗄️ Database Schema

### Core Entities
- **ApplicationUser**: Extended Identity user with profile data
- **FoodItem**: Products with pricing, inventory, and metadata
- **FoodCategory**: Product categorization
- **FoodImage**: Product image management
- **Order**: Order management with status tracking
- **OrderItem**: Individual order line items
- **Feedback**: Customer feedback system
- **Blog**: Content management system

### Key Relationships
- User → Orders (One-to-Many)
- Category → FoodItems (One-to-Many)
- FoodItem → FoodImages (One-to-Many)
- Order → OrderItems (One-to-Many)
- User → Feedbacks (One-to-Many)

## 🚀 Deployment

### Backend Deployment
1. Configure connection strings in `appsettings.json`
2. Set up JWT, Google OAuth, and Twilio credentials
3. Run Entity Framework migrations
4. Deploy to Azure App Service or IIS

### Frontend Deployment
1. Update API endpoints in environment variables
2. Build production bundle: `npm run build`
3. Deploy `dist/` folder to static hosting (Netlify, Vercel, etc.)

## 🔧 Configuration

### Backend Configuration (`appsettings.json`)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ParamparaFoods;Trusted_Connection=true;"
  },
  "JwtSettings": {
    "Key": "your-jwt-secret-key",
    "Issuer": "ParamparaFoods",
    "Audience": "ParamparaFoodsUsers"
  },
  "GoogleAuth": {
    "ClientId": "your-google-client-id",
    "ClientSecret": "your-google-client-secret"
  },
  "Twilio": {
    "AccountSid": "your-twilio-account-sid",
    "AuthToken": "your-twilio-auth-token",
    "FromPhoneNumber": "your-twilio-phone-number"
  }
}
```

### Frontend Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0'  // Enables mobile access
  }
})
```

## 📱 Mobile Access

The application is configured for mobile access:
- Frontend runs on `0.0.0.0:3000` for network access
- Backend configured with CORS for cross-origin requests
- Responsive design optimized for mobile devices
- QR code generation for easy mobile testing

## 🧪 Testing

### Backend Testing
- Use Swagger UI at `https://localhost:8080/swagger`
- Test authentication endpoints
- Verify database operations

### Frontend Testing
- Access via `http://localhost:3000`
- Test responsive design on different screen sizes
- Verify API integration and state management

## 📊 Development Scripts

### Backend Scripts
```bash
dotnet run                    # Start development server
dotnet ef database update     # Update database
dotnet ef migrations add      # Add new migration
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Windows Batch Scripts
- `scripts\start.bat` - Start both backend and frontend
- `scripts\backend-dev.bat` - Start backend only
- `scripts\reset.bat` - Reset development environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in individual project folders
- Review the CHANGELOG.md for recent updates

## 🎯 Project Status

✅ **Production Ready** - Full-featured food delivery application
✅ **Mobile Responsive** - Optimized for all device sizes  
✅ **Authentication** - Complete user management system
✅ **E-commerce** - Full shopping cart and order management
✅ **Modern UI/UX** - Professional design with animations
✅ **API Documentation** - Swagger/OpenAPI integration

---

**Built with ❤️ using ASP.NET Core 8.0 and React 18**
