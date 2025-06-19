import './App.css';
import UserForm from './components/UserForm';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Height App</h1>
        <p>Welcome! Please enter your details below.</p>
        <UserForm />
      </header>
    </div>
  );
}

export default App;
