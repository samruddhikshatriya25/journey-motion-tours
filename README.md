
# Wonderlust Canvas - AI-Powered Travel Platform

## Project Overview

Wonderlust Canvas is an AI-enhanced travel platform that helps users discover, plan, and book personalized travel experiences. The application combines modern web technologies with AI recommendation algorithms to deliver tailored travel suggestions based on user preferences.

## Tech Stack

### Frontend Framework
- **React**: JavaScript library for building the user interface
- **TypeScript**: Typed superset of JavaScript for improved developer experience and code safety
- **React Router DOM**: For handling navigation and routing within the application

### Styling and UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Component library built on Tailwind CSS for consistent UI elements
- **Framer Motion**: Library for animations and transitions
- **Lucide React**: Icon library with minimal, consistent designs

### State Management and Data Fetching
- **React Hook Form**: For form validation and handling
- **Tanstack React Query**: For data fetching, caching, and state management
- **Zod**: For schema validation

### Notifications
- **Sonner**: Toast notification system
- **Radix UI Toast**: Accessible toast notification components

### Build Tools
- **Vite**: Fast frontend build tool and development server
- **SWC**: JavaScript/TypeScript compiler (used by Vite)

## AI Features

### AI Travel Recommendation Engine
The platform includes an AI recommendation system that processes user preferences to suggest personalized travel destinations. Key features include:

- **Natural Language Processing**: Interprets user travel preferences expressed in natural language
- **Preference Analysis**: Identifies travel themes and categories from user input
- **Contextual Recommendations**: Generates detailed, context-aware travel suggestions based on identified preferences
- **Real-time Response**: Provides immediate feedback and recommendations

### Implementation Details
The AI recommendation engine uses a keyword-matching approach combined with a template-based response system. The current implementation is a frontend mock, but it's designed to be easily replaced with a more sophisticated model like Google's Gemini API.

## Project Structure

The project follows a component-based architecture with these key elements:

- **Pages**: Top-level views for different sections of the application
- **Components**: Reusable UI elements
- **UI Components**: Design system elements from Shadcn UI
- **Utils**: Helper functions and API service modules
- **Hooks**: Custom React hooks

## Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation and Development
```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

### Deployment
The project can be deployed via Lovable's built-in publishing feature. To deploy:
1. Open [Lovable](https://lovable.dev/projects/6371ac3a-733f-4066-906e-1e54cc286c6f)
2. Click on Share -> Publish

## Custom Domain Setup

To connect a custom domain to your project:
1. Navigate to Project > Settings > Domains in Lovable
2. Click Connect Domain
3. Follow the setup instructions

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Future Enhancements

Planned improvements for the AI recommendation system:
- Integration with production-ready AI services (Google Gemini, OpenAI)
- Enhanced personalization based on user history and preferences
- Multi-factor recommendation system incorporating seasonality, budget constraints, and travel restrictions
- Expanded language support for international users

## License

This project is licensed under the MIT License - see the LICENSE file for details.
