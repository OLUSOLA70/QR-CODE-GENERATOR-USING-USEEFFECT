import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  // Function to validate URLs
  function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' +  // Protocol
      '((([a-zA-Z0-9$-_@.&+!*"\'(),]+)\\.)+([a-zA-Z]{2,})+)' + // Domain
      '(\\/[-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?$', 'i'); // Path
    return pattern.test(str);
  }

 
  useEffect(() => {
    if (word) { // Generate QR code only if word is not empty
      setQrCode(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(word)}&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
  }, [word, size, bgColor]);

  // Handle the Generate button click
  function handleClick() {
    if (temp.trim()) {
      let formattedWord = temp.trim();
      if (isValidURL(formattedWord)) {
        // Ensure the URL starts with 'https://'
        if (!formattedWord.startsWith('http://') && !formattedWord.startsWith('https://')) {
          formattedWord = `https://${formattedWord}`;
        }
      }
      setWord(formattedWord);  // Set the validated/adjusted input
    } else {
      alert("Please enter some text to generate a QR code.");
    }
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <div className="input-box">
        <div className="gen">
          <input
            type="text"
            onChange={(e) => setTemp(e.target.value)}
            placeholder="Enter text or URL to encode"
          />
          <button className="button" onClick={handleClick}>
            Generate
          </button>
        </div>
        <div className="extra">
          <h5>Background Color:</h5>
          <input
            type="color"
            value={`#${bgColor}`}  // Set the color picker value
            onChange={(e) => setBgColor(e.target.value.substring(1))}
          />
          <h5>Dimension: {size}px</h5>
          <input
            type="range"
            min="200"
            max="600"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
      </div>
      <div className="output-box">
        {qrCode && (
          <>
            <img src={qrCode} alt="QR Code" />
            <a href={qrCode} download="QRCode">
              <button type="button">Download</button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
