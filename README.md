# Simplified Chat Application Client Side

A React-based chat application frontend with dark/light theme support, built with Tailwind CSS.

## Features

- **Chat Interface**: Interactive chat with session management
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Mobile-friendly sidebar and layout
- **Session Management**: Create and manage chat sessions
- **Feedback System**: Like/dislike responses in chat

## Tech Stack

- **React 19**: Frontend framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework with dark mode support
- **Axios**: HTTP client for API calls
- **Create React App**: Build setup

## Backend Github url

- https://github.com/abhishek-v-cloud/Simplified-Chat-Application-backend.git

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see server README)

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (irreversible)

## Project Structure

```
client/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Chat.js          # Chat interface component
│   │   ├── Sidebar.js       # Navigation sidebar
│   │   └── Landing.js       # Landing page
│   ├── contexts/
│   │   ├── ThemeContext.js  # Theme state management
│   │   └── SessionContext.js # Chat session state
│   ├── App.js               # Main app component
│   ├── index.js             # App entry point
│   └── index.css            # Global styles
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json
```

## Key Components

### ThemeContext
Manages dark/light theme state and applies the 'dark' class to the document element.

### SessionContext
Handles chat session history and state management.

### Sidebar
- Theme toggle button
- New chat creation
- Session list navigation
- User info display

### Chat
- Displays conversation history
- Input field for questions (fixed at bottom)
- Feedback buttons for responses
- Table display for structured data

## Styling

The app uses Tailwind CSS with custom dark mode variants. Theme classes are applied conditionally based on the `isDark` state from ThemeContext.

## API Integration

Communicates with the backend server at `http://localhost:5000` for:
- Fetching sessions
- Creating new chats
- Sending questions and receiving responses

## Development

### Adding New Features

1. Create components in `src/components/`
2. Update routing in `App.js` if needed
3. Add state management in appropriate contexts
4. Style with Tailwind classes

### Theme Customization

Modify theme colors in component classes or extend Tailwind config in `tailwind.config.js`.

#


