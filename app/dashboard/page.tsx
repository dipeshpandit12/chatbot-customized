"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [apiKey, setApiKey] = useState("");
  const [description, setDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      console.log("API Key submitted:", apiKey);
      setCurrentStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Description submitted:", description);

    const chatWidgetCode = `
    'use client';
    import { useState } from 'react';
    import { FaComments } from 'react-icons/fa';
    
    const GEMINI_API_KEY = '${apiKey}';
    const COMPANY_CONTEXT = '${description}';
    
    export default function ChatWidget() {
        const [isOpen, setIsOpen] = useState(false);
        const [messages, setMessages] = useState([]);
        const [inputMessage, setInputMessage] = useState("");
        const [isLoading, setIsLoading] = useState(false);
    
        async function handleSubmit(e) {
            e.preventDefault();
            if (!inputMessage.trim()) return;
    
            setIsLoading(true);
            await generateAnswer(inputMessage);
            setInputMessage("");
            setIsLoading(false);
        }
    
        async function generateAnswer(message) {
            setMessages(prev => [...prev, { role: 'user', content: message }]);
    
            const contents = [
                {
                    parts: [{ text: COMPANY_CONTEXT }],
                    role: 'model'
                },
                ...messages.map(msg => ({
                    parts: [{ text: msg.content }],
                    role: msg.role === 'user' ? 'user' : 'model'
                })),
                {
                    parts: [{ text: message }],
                    role: 'user'
                }
            ];
    
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}", {
                method: "POST",
                body: JSON.stringify({ contents }),
            });
            const data = await response.json();
            const botResponse = data.candidates[0].content.parts[0].text;
    
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
        }
    
        return (
            <div className="fixed bottom-24 right-4 z-50">
                {!isOpen ? (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all"
                    >
                        <FaComments size={24} />
                    </button>
                ) : (
                    <div className="bg-white rounded-lg shadow-xl w-80 max-h-[600px] flex flex-col">
                        <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <h3 className="font-semibold">Chat Assistant</h3>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                                ×
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={\`\${
                                        msg.role === 'user' 
                                            ? 'ml-auto bg-blue-500 text-white'
                                            : 'mr-auto bg-gray-200 text-gray-900'
                                    } rounded-lg p-3 max-w-[80%]\`}
                                >
                                    {msg.content}
                                </div>
                            ))}
                        </div>
    
                        <form onSubmit={handleSubmit} className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={isLoading ? "Generating response..." : inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder={isLoading ? "Please wait..." : "Type your message..."}
                                    className={\`flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 \${
                                        isLoading ? 'italic text-gray-500' : 'text-blue-500'
                                    }\`}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputMessage.trim()}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? "..." : "Send"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }
    `;
    setGeneratedCode(chatWidgetCode);
    setCurrentStep(3);
  };

  const handleTryChatbot = () => {
    router.push(`/chatbot?apiKey=${encodeURIComponent(apiKey)}&description=${encodeURIComponent(description)}`);
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4 min-h-screen">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-blue-500">
                Step 1: Enter your API Key
              </h2>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API Key"
                className="w-full p-2 border rounded text-gray-900"
                required
              />
              <button
                type="submit"
                className={`w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                  currentStep > 1 ? "opacity-50" : ""
                }`}
                disabled={currentStep > 1}
              >
                Next
              </button>
            </form>
          </div>

          {/* Step 2 */}
          <div
            className={`bg-white p-4 rounded-lg shadow ${
              currentStep < 2 ? "opacity-50" : ""
            }`}
          >
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-blue-500">
                Step 2: Describe Your Requirements
              </h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2 border rounded h-32 md:h-48 text-gray-900"
                required
                disabled={currentStep < 2}
              />
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isLoading || currentStep < 2}
              >
                {isLoading ? "Generating..." : "Generate Code"}
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center pt-10">
            <button 
              onClick={handleTryChatbot}
              disabled={!apiKey || !description}
              className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Try Your Chatbot
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="h-full">
          <div
            className={`bg-white p-4 rounded-lg shadow h-full ${
              currentStep < 3 ? "opacity-50" : ""
            }`}
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-500">
              Step 3: Generated Code
            </h2>
            {currentStep === 3 ? (
              <div className="mt-4">
                <pre className="bg-black p-4 rounded overflow-auto max-h-[calc(100vh-200px)] text-sm">
                  <code className="text-[#d4d4d4] font-mono">{generatedCode}</code>
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)] text-gray-500">
                <svg
                  className="w-16 h-16 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <p className="text-xl text-center">
                  Complete steps 1 & 2 to generate your custom chatbot code!
                </p>
                <p className="mt-2 text-center text-gray-400">
                  Your generated code and preview will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
