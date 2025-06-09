import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import surveyConfig from './config/surveyConfig';

function App() {
  const [portal, setPortal] = useState('arcgis.com');
  const [appName, setAppName] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const { SURVEY_ITEM_ID, SURVEY_BASE_URL } = surveyConfig; 

  // useCallback memoizes the function to prevent unnecessary re-renders
  const generateUrl = useCallback(() => {
    const encodedAppName = encodeURIComponent(appName.trim());
    const encodedAppUrl = encodeURIComponent(appUrl.trim());

    if (!encodedAppName && !encodedAppUrl) {
      setGeneratedUrl('Fill out the form to generate the URL.');
      return;
    }

    let url = `${SURVEY_BASE_URL}/share/${SURVEY_ITEM_ID}`
    const params = [];

    if (encodedAppName) {
      params.push(`app_name=${encodedAppName}`);
    }
    if (encodedAppUrl) {
      params.push(`app_url=${encodedAppUrl}`);
    }

    if (params.length > 0) {
      url += `?field:${params.join('&field:')}`;
    }

    setGeneratedUrl(url);
  }, [portal, appName, appUrl]); // Dependencies for useCallback

  // useEffect hook to call generateUrl whenever its dependencies change
  useEffect(() => {
    generateUrl();
  }, [generateUrl]); // Dependency for useEffect

  const handleCopyClick = () => {
    if (
      generatedUrl &&
      generatedUrl !== 'Fill out the form to generate the URL.'
    ) {
      navigator.clipboard
        .writeText(generatedUrl)
        .then(() => {
          setToast( { show: true, message: '🎉 URL copied to clipboard! 🎉'});
          setTimeout(() => {
            setToast({ show: false, message: '' });
          }, 5000);
        })
        .catch((err) => {
          console.error('Failed to copy URL: ', err);
          setToast({ show: true, message: '⚠ Failed to copy URL. Please copy manually. ⚠'});
          setTimeout(() => {
            setToast({ show: false, message: '' })
          }, 5000)
        });
    }
  };

  return (
    <div className="container">
      <h1>OOGA App Feedback Survey URL Builder</h1>

      <p>
        Use this tool to generate a Survey123 link for the <a href={`${SURVEY_BASE_URL}/surveys/${SURVEY_ITEM_ID}/overview`}>OOGA Applications Feedback Form</a> hosted on AGOL.
      </p>
      <p>
        This form expects two values to be configured by the app developer via URL parameters:
      </p>


      <label htmlFor="appNameInput">Application Name:</label>
      <p>Set the name of your application as the value. Usually this will be the title value or whatever is in the top-level heading of the application.</p>
      <input
        type="text"
        id="appNameInput"
        placeholder="e.g., Parcels Viewer, Zoning Map"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />

      <label htmlFor="appUrlInput">Application URL:</label>
      <p>Add the URL for where your users will access the application. Avoid extraneous URL parameters here. This is just a way to track from where users are accessing the applicaiton.</p>
      <input
        type="text"
        id="appUrlInput"
        placeholder="URL where the app is accessed"
        value={appUrl}
        onChange={(e) => setAppUrl(e.target.value)}
      />

      <h2>Generated Survey URL:</h2>
      <div className="output-section">
        <p id="generatedUrl">{generatedUrl}</p>
      </div>
      <div className="copy-container">
        <button onClick={handleCopyClick}>Copy URL</button>
      </div>

      {toast.show && <div className="toast">{toast.message}</div>}
    </div>
  );
}

export default App;