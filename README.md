# EcoShare India

A sustainable item sharing platform for India, enabling communities to share, trade, and exchange items to reduce waste and build stronger neighborhoods.

## Features

- **User Authentication**: Secure registration and login system
- **Item Listing**: Easy-to-use interface for listing items
- **Browse & Search**: Advanced filtering and search capabilities
- **Community Building**: Local community features and connections
- **Impact Tracking**: Environmental and social impact metrics
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: Neon (PostgreSQL)
- **Authentication**: JWT with HTTP-only cookies
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon database account

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ecoshare-india
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the \`.env.local\` file with your database URL and JWT secret:
\`\`\`env
DATABASE_URL="your_neon_database_url"
JWT_SECRET="your_jwt_secret_key"
\`\`\`

5. Run the database seed script:
\`\`\`bash
npm run seed
\`\`\`

6. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The app will be automatically deployed on every push to the main branch.

## Database Schema

### Users
- id, name, email, password_hash, phone, location, timestamps

### Categories  
- id, name, description, timestamps

### Items
- id, title, description, category_id, owner_id, condition, availability_type, price, status, timestamps

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/login\` - User login  
- \`POST /api/auth/logout\` - User logout
- \`GET /api/auth/me\` - Get current user

### Items
- \`GET /api/items\` - Get items with filters
- \`POST /api/items\` - Create new item
- \`GET /api/items/[id]\` - Get item by ID

### Categories
- \`GET /api/categories\` - Get all categories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@ecoshare.in or join our community Discord.
