import React from 'react';
import { useBooks } from '../context/BookContext';
import { useBookStats } from '../hooks/UseBookStats';
import StatCard from '../components/StatCard';
import { FaBook, FaBookReader, FaHeart, FaLayerGroup } from 'react-icons/fa';

const StatsPage = () => {
  const { books } = useBooks();
  const { owned, reading, wishlist, total } = useBookStats(books);

  return (
    <div className="stats-page">
      <h2>Your Book Statistics</h2>
      <p>Here's a summary of your personal library.</p>
      <section className="stats-grid">
        <StatCard title="Books Owned" value={owned} icon={<FaBook />} color="green" />
        <StatCard title="Currently Reading" value={reading} icon={<FaBookReader />} color="blue" />
        <StatCard title="Wishlist" value={wishlist} icon={<FaHeart />} color="orange" />
        <StatCard title="Total Books" value={total} icon={<FaLayerGroup />} color="purple" />
      </section>
    </div>
  );
};

export default StatsPage;