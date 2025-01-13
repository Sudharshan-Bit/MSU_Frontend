import React from 'react';

const BgLoader = () => {
  return (
    <div className="bg_loader-container">
      <div className="bg_loader-spinner"></div>
      <style>
        {`
          .bg_loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: rgba(255, 255, 255, 0.8);
            z-index: 9999;
          }
          .bg_loader-spinner {
            border: 6px solid rgba(0, 0, 0, 0.1);
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default BgLoader;
