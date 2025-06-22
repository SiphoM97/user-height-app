import './App.css';
import UserForm from './components/UserForm';

function App() {
  const handleFormSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert(`✅ Submission successful! Average height: ${result.averageHeight}`);
    } catch (err) {
      alert('❌ Submission failed');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>User Height App</h1>
      <UserForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
