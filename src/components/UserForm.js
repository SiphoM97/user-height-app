import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.height || isNaN(formData.height)) newErrors.height = 'Valid height is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ name: '', height: '', email: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span style={styles.error}>{errors.name}</span>}
      </div>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="text"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
        />
        {errors.height && <span style={styles.error}>{errors.height}</span>}
      </div>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </div>

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '30px',
    borderRadius: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    color: '#fff'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '16px',
    outline: 'none'
  },
  error: {
    color: '#ffaaaa',
    fontSize: '12px',
    marginTop: '5px'
  },
  button: {
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    background: '#ffffff33',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  }
};

export default UserForm;
