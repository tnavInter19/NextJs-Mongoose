// Autocomplete.js
import React, { useState } from 'react';

const Autocomplete = () => {
 const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const filterOptions = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
  };

  const onOptionSelected = (option) => {
    setSearchTerm(option);
    setShowOptions(false);
  };

  const onBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 150);
  };

  return (
   <div className="relative">
   <input
     type="text"
     className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
     onChange={(e) => filterOptions(e.target.value)}
     value={searchTerm}
     onFocus={() => setShowOptions(true)}
     onBlur={onBlur}
   />
   <div
     style={{ display: showOptions && filteredOptions.length > 0 ? 'block' : 'none' }}
     className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md"
   >
     {filteredOptions.map((option, index) => (
       <div
         key={index}
         className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
         onClick={() => onOptionSelected(option)}
       >
         {option}
       </div>
     ))}
   </div>
 </div>
  );
};

export default Autocomplete;
