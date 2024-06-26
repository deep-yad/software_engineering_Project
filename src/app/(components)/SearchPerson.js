import React, { useState, useEffect } from "react";

const SearchPerson = ({ data, tag }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Function to filter data based on searchText
  const filterData = (searchText) => {
    if (!searchText) {
      return []; // Return empty array if no search text
    }

    const lowercaseSearchText = searchText.toLowerCase(); // Case-insensitive search
    let newData = data.filter(
      (item) =>
        item.email_id.toLowerCase().includes(lowercaseSearchText) ||
        item.person_name.toLowerCase().includes(lowercaseSearchText)||
        item.mobile_number.toLowerCase().includes(lowercaseSearchText)
    );
    
      console.log(newData);
      return newData;
  };

  // Update search results when searchText or data changes
  useEffect(() => {
    const results = filterData(searchText);
    setSearchResults(results);
  }, [searchText, data]);

  // Function to handle selecting a search result
  const handleSelect = (selectedItem) => {
    setSearchText(selectedItem.email_id); // Update searchText with selected name
  };

  return (
    <div>
      <input
        type="text"
        placeholder={tag}
        value={searchText}
        onChange={handleSearchChange}
      />
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((item) => (
            <li key={item._id} onClick={() => handleSelect(item)}>
              {item.person_name},{item.email_id},{item.mobile_number}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
      <button className="bg-gray-200">Search Person</button>
    </div>
  );
};

export default SearchPerson;