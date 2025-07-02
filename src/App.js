import './App.css';
import UserForm from './components/UserForm';
import Spline from '@splinetool/react-spline';

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
    <div style={styles.container}>
      {/* 3D Background Layer */}
      <div style={styles.background}>
        <Spline scene="https://prod.spline.design/5x2KzKxbggZj7tqQ/scene.splinecode" />
      </div>

      {/* Foreground Content Layer */}
      <div style={styles.content}>
        <h1 style={styles.title}>User Height</h1>
        <UserForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    paddingTop: '3rem',
    color: '#fff', // to contrast against dark background
  },
  title: {
    marginBottom: '2rem',
    fontSize: '2.5rem'
  }
};

export default App;
