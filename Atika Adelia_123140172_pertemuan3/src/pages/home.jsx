import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useBookStats } from '../hooks/UseBookStats';
import StatCard from '../components/StatCard';
import BookFilter from '../components/BookFilter';
import BookList from '../components/BookList';

import { FaBook, FaBookReader, FaHeart, FaLayerGroup, FaPlus, FaSearch } from 'react-icons/fa';

const HomePage = () => {
  const { books } = useBooks();
  const { owned, reading, wishlist, total } = useBookStats(books);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Logika untuk filter dan search
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (activeFilter === 'all') return true;
        return book.status === activeFilter;
      })
      .filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }, [books, activeFilter, searchTerm]);

  return (
    <div className="homepage">
      <section className="stats-grid">
        <StatCard title="Books Owned" value={owned} icon={<FaBook />} color="green" />
        <StatCard title="Currently Reading" value={reading} icon={<FaBookReader />} color="blue" />
        <StatCard title="Wishlist" value={wishlist} icon={<FaHeart />} color="orange" />
        <StatCard title="Total Books" value={total} icon={<FaLayerGroup />} color="purple" />
      </section>

      <section className="controls-section">
        <div className="filter-bar">
          <Link to="/add" className="add-book-btn">
            <FaPlus />
            <span>Add New Book</span>
          </Link>
          <BookFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Bagian Daftar Buku */}
      <section className="book-list-section">
        <BookList books={filteredBooks} />
      </section>
    </div>
  );
};

export default HomePage;