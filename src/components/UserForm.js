const UserForm = () => {
  return (
    <form>
      <label>Name:</label>
      <input type="text" name="name" />

      <label>Height (in cm):</label>
      <input type="number" name="height" />

      <label>Email:</label>
      <input type="email" name="email" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
