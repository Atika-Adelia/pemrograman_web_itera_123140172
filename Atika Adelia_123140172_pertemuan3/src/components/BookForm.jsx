import React, { useState, useEffect } from 'react';

const BookForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'owned', // default
  });
  const [errors, setErrors] = useState({});

  // Jika ada initialData (mode edit), isi form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error saat pengguna mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // 4. Error Handling untuk Form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true jika valid
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData); // Kirim data ke BookFormPage
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label htmlFor="title">Book Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="owned">Owned</option>
          <option value="reading">Currently Reading</option>
          <option value="wishlist">Wishlist</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        {initialData ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;