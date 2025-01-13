import React, { useState } from "react";
import CORSMap from "./CORSMap";
import SiteStats from "./SiteStats";
import BgLoader from './bg_loader';

const ParentFeature = () => {
  const [outputData, setOutputData] = useState(null); // State to hold the output data from SiteStats
  const [locationInfo, setLocationInfo] = useState({
    address: "",
    latitude: "",
    longitude: ""
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [bgLoader, setBgLoader] = useState(false); //
  const handleBgLoaderUpdate = (loaderState) => {
    setBgLoader(loaderState); // Update the bg_loader state
  };
 const [coordinates, setCoordinates] = useState(null);  // State for the coordinates from SiteStats

  return (
    <div className="flex flex-col h-screen ">
      {bgLoader && <BgLoader />}
      <header className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white p-5 text-center">
        <h1>CORS Sites Dashboard</h1>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex-[5] p-2.5 relative h-[60vh] md:h-auto">
          <CORSMap onLocationFound={setLocationInfo} outputData={outputData} coordinates={coordinates} /> {/* Pass outputData to CORSMap */}
        </div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full bg-gray-200 transition-transform duration-300 ease-in-out shadow-lg z-10 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } w-80`}
        >
          {/* Sidebar Toggle Arrow */}
          <button
            className="absolute top-1/2 left-[-25px] transform -translate-y-1/2 w-10 h-10 bg-gray-400 text-white flex items-center justify-center rounded-l-md cursor-pointer"
            onClick={toggleSidebar}
            aria-expanded={isSidebarOpen}
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? ">" : "<"}
          </button>
          <div className="md:flex-1 p-5 bg-gray-200 overflow-y-auto">
            <SiteStats setOutputData={setOutputData} setCoordinates={setCoordinates} updateBgLoader={handleBgLoaderUpdate}/> {/* Pass setOutputData to SiteStats */}
            {locationInfo.address && (
              <div className="mt-5 p-2.5 border border-gray-300 rounded-lg bg-gray-100 w-full">
                <h2 className="mb-2.5">Selected Location's</h2>
                <p className="my-1 text-base"><strong>Latitude:</strong> {locationInfo.latitude}</p>
                <p className="my-1 text-base"><strong>Longitude:</strong> {locationInfo.longitude}</p>
                <p className="my-1 text-base"><strong>Address:</strong> {locationInfo.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentFeature;