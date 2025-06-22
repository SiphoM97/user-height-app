import { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', height: '', email: '' }); // reset
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Your Info</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="height"
        placeholder="Enter your height"
        value={formData.height}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
