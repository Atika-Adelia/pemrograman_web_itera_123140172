import React from 'react';
import { FaCheckCircle, FaBookReader, FaHeart, FaList } from 'react-icons/fa';

const filters = [
  { id: 'all', name: 'All', icon: <FaList /> },
  { id: 'owned', name: 'Owned', icon: <FaCheckCircle /> },
  { id: 'reading', name: 'Reading', icon: <FaBookReader /> },
  { id: 'wishlist', name: 'Wishlist', icon: <FaHeart /> },
];

const BookFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="filter-controls">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-btn ${filter.id} ${
            activeFilter === filter.id ? 'active' : ''
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.icon}
          <span>{filter.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BookFilter;