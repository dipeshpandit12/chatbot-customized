This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Customizable Chatbot Component

A modern, responsive React chatbot component that integrates with Google's Gemini 1.5 Flash AI model. This component provides a customizable chat interface that can be easily embedded into any React/Next.js application.

## Features

- 🎯 Plug-and-play chat interface
- 💬 Real-time AI responses using Gemini 1.5 Flash
- 🎨 Clean and modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🔄 Loading states and error handling
- 🎭 Customizable bot personality/context
- 👆 Expandable/collapsible chat window

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Installation

```bash
npm install chatbot-customized
# or
yarn add chatbot-customized
```

## Security Best Practices

⚠️ **Important**: Never expose your API key directly in your code. Always use environment variables.

1. Create a `.env` file in your project root:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your-api-key-here
```

2. Add `.env` to your `.gitignore`:

```bash
echo ".env" >> .gitignore
```

## Usage

```jsx
import TryYourChatbot from 'chatbot-customized/components/TryYourChatbot';

function App() {
  return (
    <TryYourChatbot
      apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}
      description="Your custom bot description/personality"
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `apiKey` | string | Your Google Gemini API key |
| `description` | string | Context/personality description for the chatbot |

## Requirements

- React 16.8+ (Hooks support)
- Google Gemini API key
- Tailwind CSS (for styling)

## Features in Detail

### Chat Interface
- Floating action button to open/close chat
- Message history with user/bot distinction
- Input field with loading states
- Responsive design that works on all devices

### Message Handling
- Real-time message sending and receiving
- Loading states during API calls
- Message history preservation
- Input validation and error handling

### Styling
- Modern UI with Tailwind CSS
- Customizable colors and themes
- Responsive layout
- Smooth animations and transitions

Images:
![image](https://github.com/user-attachments/assets/1472fd03-3a13-467a-9811-46407c0200a7)

![image](https://github.com/user-attachments/assets/79875abd-8bd4-4c2b-9d8a-5ad4e7fc8146)

![image](https://github.com/user-attachments/assets/bef82ba4-9fcc-4057-ae61-309fc8ff2a9c)

![image](https://github.com/user-attachments/assets/5a0a9996-2da2-4a17-beed-613cca7b186f)





