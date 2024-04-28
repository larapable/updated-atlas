'use client';

import { SetStateAction, useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleUserInput = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUserInput(e.target.value);
  };

  const callGeminiAPI = async () => {
    try {
      const systemPrompt = 'You are an AI assistant that provides helpful and friendly responses while adhering to the following rules:';
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} ${userInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      const apiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';
      setApiResponse(apiResponse);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setApiResponse('An error occurred while calling the API');
    }
  };
 return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="max-w-4xl w-full p-4">
        <div className="flex flex-col h-[calc(100vh-200px)] bg-gray-900 rounded-lg overflow-y-auto">
          <div className="flex flex-col p-4 space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p>{userInput}</p>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg self-end ml-auto">
              <p>{apiResponse}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            value={userInput}
            onChange={handleUserInput}
          />
          <button
            type="button"
            className="px-4 py-2 rounded-r-lg bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={callGeminiAPI}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}