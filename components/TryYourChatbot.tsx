"use client";
import { useState } from "react";
import { FaComments } from "react-icons/fa";
interface Message {
   role: string;
   content: string;
}

export default function TryYourChatbot({ 
    apiKey, 
    description
}: { 
    apiKey: string, 
    description: string
}) {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([]);
   const [inputMessage, setInputMessage] = useState("");
   const [isLoading, setIsLoading] = useState(false);
    async function handleSubmit(e: React.FormEvent) {
       e.preventDefault();
       if (!inputMessage.trim()) return;

       setIsLoading(true);
       await generateAnswer(inputMessage);
       setInputMessage("");
       setIsLoading(false);
   }
    async function generateAnswer(message: string) {
       setMessages(prev => [...prev, { role: 'user', content: message }]);
        const contents = [
            {
                parts: [{ text: `You are an AI assistant with the following context: ${description}. Please respond accordingly.` }],
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
       const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
           method: "POST",
           body: JSON.stringify({ contents }),
       });
       const data = await response.json();
       const botResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
   }
    return (
       <div >
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

                   <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] flex flex-col">
                       {messages.map((msg, index) => (
                           <div
                               key={index}
                               className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                           >
                               <div
                                   className={`${
                                       msg.role === 'user' 
                                           ? 'bg-blue-500 text-white'
                                           : 'bg-gray-200 text-gray-900'
                                   } rounded-lg p-3 max-w-[80%] inline-block whitespace-pre-wrap break-words`}
                               >
                                   {msg.content}
                               </div>
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
                               className={`flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                                   isLoading ? 'italic text-gray-500' : 'text-blue-500'
                               }`}
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