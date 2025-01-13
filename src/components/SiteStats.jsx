import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import sendJsonData from '../apiService';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const SiteStats = ({ setOutputData, setCoordinates, updateBgLoader}) => {  // Accept setOutputData as a prop
  const [stats, setStats] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disableInteractions, setDisableInteractions] = useState(false);
  const [activeTab, setActiveTab] = useState('bar');
  const [selectedDate, setSelectedDate] = useState(moment.tz('2024-04-14', 'America/Los_Angeles').toDate()); // State for selected date
  const [errorMessage, setErrorMessage] = useState('');  // State for error message
  const [lat, setLat] = useState("");  // For latitude input
  const [lon, setLon] = useState("");  // For longitude input
  const [selectedOption, setSelectedOption] = useState('Static JSON + STACOV File'); // State for selected dropdown option


  useEffect(() => {
      // Show loader while fetching
    updateBgLoader(true);
   fetch("/CORS_Site_JSON_1.json")
      .then(response => response.json())
      .then(data => {
        const statusCounts = data.features.reduce((acc, feature) => {
          const status = feature.properties.STATUS;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
          // Hide loader after fetching
        updateBgLoader(false);
        setStats(statusCounts);
      });
  }, []);

  const data = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: "Site Status",
        data: Object.values(stats),
        backgroundColor: ["blue", "red", "yellow", "orange"],
      },
    ],
  };

  const openModal = () => {
    setModalIsOpen(true);
    setDisableInteractions(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDisableInteractions(false);
    setErrorMessage('');
  };

  const datefun = (date) => {
      // Show loader before API call
    updateBgLoader(true);
   const input_data = {
      date: moment(date).tz('America/Los_Angeles').toDate(),
      options: selectedOption
    };
    sendJsonData(input_data)
      .then(response => {
        setOutputData(response.data);  // This will trigger the useEffect in the parent component to log the new data
          // Hide loader after data is fetched
        updateBgLoader(false);
     })
      .catch(error => {
        console.error("There was an error!", error);
          // Hide loader on error
        updateBgLoader(false);
       if (selectedOption === 'Static JSON + STACOV File') {
          setErrorMessage('Please choose a date between 14 April 2024 to 31 May 2024');
          setModalIsOpen(true);  // Show the modal with the error message
        }
        if (selectedOption === 'Over All Vs MYCS2') {
          setErrorMessage('No data found for the Chosen date');
          setModalIsOpen(true);  // Show the modal with the error message
        }
        
      });
  };

  const handleCoordinateSearch = (event) => {
    event.preventDefault(); // Prevent the page from reloading
    if (lat && lon) {
      setCoordinates({ lat, lon });  // Pass the coordinates to ParentFeature
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option); // Update selected option in the dropdown
    setDisableInteractions(false); // Enable interactions if they were disabled
    setErrorMessage(''); // Clear any error messages
      // Show loader while handling selection
    updateBgLoader(true);
   if(option==='Static JSON + STACOV File'){
      const newDate = moment.tz('2024-04-14', 'America/Los_Angeles').toDate(); // Set date to 01-01-2010
      setSelectedDate(newDate); // Update selected date state
      const input_data = {
        date: newDate,
        options: option
      };
      
      updateBgLoader(true);
     sendJsonData(input_data)
      .then(response => {
        setOutputData(response.data);  // This will trigger the useEffect in the parent component to log the new data
        
        updateBgLoader(false);
      })
      .catch(error => {
        console.error("There was an error!", error);
        
        updateBgLoader(false);
      });
    }
    else if(option === 'Over All Site Info'){
      const input_data = {
        date: selectedDate,
        options: option
      };
      
      updateBgLoader(true);
      sendJsonData(input_data)
      .then(response => {
        setOutputData(response.data);  // This will trigger the useEffect in the parent component to log the new data
          // Hide loader after data is fetched
        updateBgLoader(false);
      })
      .catch(error => {
        console.error("There was an error!", error);
          // Hide loader
        updateBgLoader(false);
     });
    }
    else if(option === 'Over All Vs MYCS2'){
      const newDate = moment.tz('2010-01-01', 'America/Los_Angeles').toDate(); // Set date to 01-01-2010
      setSelectedDate(newDate); // Update selected date state
      const input_data = {
        date: newDate,
        options: option
      };
      
      updateBgLoader(true);
      sendJsonData(input_data)
      .then(response => {
        setOutputData(response.data);  // This will trigger the useEffect in the parent component to log the new data
        
        updateBgLoader(false);
      })
      .catch(error => {
        console.error("There was an error!", error);
        
        updateBgLoader(false);
      });
    }
    else if(option === 'OPUSNET Data'){
      const newDate = new Date('2018-10-27'); // Set date to 01-01-2010
      setSelectedDate(newDate); // Update selected date state
      const input_data = {
        date: selectedDate,
        options: option
      };
      
      updateBgLoader(true);
      sendJsonData(input_data)
      .then(response => {
        setOutputData(response.data);  // This will trigger the useEffect in the parent component to log the new data
          // Hide loader after data is fetched
        updateBgLoader(false);
      })
      .catch(error => {
        console.error("There was an error!", error);
          // Hide loader 
        updateBgLoader(false);
      });
    }
    else if(option === 'MYCS Uncertainty'){
      const newDate = new Date('2018-10-31'); // Set date to 01-01-2010
      setSelectedDate(newDate); // Update selected date state
      const input_data = {
        date: newDate,
        options: option
      };
      updateBgLoader(true);
      sendJsonData(input_data)
      .then(response => {
        setOutputData(response.data);  // This will trigger the useEffect in the parent component to log the new data
          // Hide loader after data is fetched
        updateBgLoader(false);
      })
      .catch(error => {
        console.error("There was an error!", error);
          // Hide loader 
        updateBgLoader(false);
      });
    }
  };


  return (
    <div className={`site-stats ${disableInteractions ? 'pointer-events-none select-none' : ''}`}>
      <h1 className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white">Additional Info</h1>
      <h3 className="mt-10">Choose Dataset</h3>
      
      {/* Dropdown for selecting an option */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedOption} {/* This will show the selected option */}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                onClick={() => handleSelect('Static JSON + STACOV File')}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Static JSON + STACOV File
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={() => handleSelect('Over All Site Info')}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Over All CORS Site
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={() => handleSelect('Over All Vs MYCS2')}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Over All CORS Vs MYCS2 Predictions
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={() => handleSelect('OPUSNET Data')}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                OPUSNET Uncertainty Data
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={() => handleSelect('MYCS Uncertainty')}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                MYCS Uncertainty Data
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      
      {/* Date Picker */}
      {(selectedOption === 'Static JSON + STACOV File' || selectedOption === 'Over All Vs MYCS2' || selectedOption === 'OPUSNET Data') && (
        <div className="row mt-3">
          <div className="col-sm-6 col-lg-5 mb-3 mb-sm-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => {
                setSelectedDate(date); // Update the selected date state
                datefun(date); // Call the datefun function
              }}
              className="block w-full p-2 border rounded"
              dateFormat="yyyy/MM/dd"
            />
          </div>
        </div>
      )}
      {/* Coordinate Search Section */}
      <div className="mt-5">
        <h3>Coordinate Search</h3>
        <div>
          <label>Latitude: </label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Enter Latitude"
            className="block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Longitude: </label>
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="Enter Longitude"
            className="block w-full p-2 border rounded"
          />
        </div>
        <button onClick={handleCoordinateSearch} className="p-2 mt-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white">
          Search
        </button>
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 max-w-2xl p-5 bg-white"
        overlayClassName="bg-[rgba(0,0,0,0.75)]"
        contentLabel={errorMessage ? "Error" : "Site Statistics"}
      >
        <button className="bg-red-500 text-white absolute top-2.5 right-3 p-2 text-base border-none cursor-pointer rounded-lg" onClick={closeModal}>X</button>
        
        {errorMessage ? (
          <div>
            <h2>Error</h2>
            <p>{errorMessage}</p>
          </div>
        ) : (
          <div>
            <h2>Site Statistics</h2>

            {/* Tab navigation */}
            <div className="flex justify-center mb-5">
              <button
                className={`px-5 py-2.5 text-base cursor-pointer border-none bg-gray-200 mx-2 ${activeTab === 'bar' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('bar')}
              >
                Bar Graph
              </button>
              <button
                className={`px-5 py-2.5 text-base cursor-pointer border-none bg-gray-200 mx-2 ${activeTab === 'pie' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('pie')}
              >
                Pie Chart
              </button>
            </div>

            {/* Render Bar or Pie chart based on activeTab */}
            {activeTab === 'bar' && <Bar data={data} />}
            {activeTab === 'pie' && (
              <div className="flex justify-center items-center h-72 w-72 mx-auto">
                <Pie data={data} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SiteStats;
