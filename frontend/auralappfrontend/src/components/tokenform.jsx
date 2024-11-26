// TokenForm.js
import React, { useState } from 'react';

const TokenForm = ({ onTokenSubmit }) => {
  const [tokenInput, setTokenInput] = useState('');

  const handleSubmit = () => {
    // Validate token or perform actions with the token
    onTokenSubmit(tokenInput);
    setTokenInput('');
  };

  return (
    <div className="bg-blue-900 h-7/8 rounded-lg">
      <p className="text-white text-2xl font-bold pt-4 px-4">Follow these steps to generate a token:</p>
      <ol className="text-white pt-3 list-disc pl-10">
        <li className="pb-3"> Create a Calendly account.</li>
        <li className="pb-3">Go to My Account  and select Integration and Apps</li>
        <li className="pb-3"> Select API and webhooks option</li>
        <li className="pb-3">Click on get a token now in personal access tokens and continue</li>
        <li className="pb-3">Give a name to the token and authenicate</li>
        <li>Copy the token and paste it below</li>
      </ol>
      <div className="mt-2 pl-4 p-10">
        <label className="block text-white text-sm font-bold mb-2">Token:</label>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
     



    </div>
  );
};

export default TokenForm;
