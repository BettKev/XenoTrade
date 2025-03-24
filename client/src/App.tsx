import './App.css'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(
        (registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        },
        (error) => {
          console.error('Service Worker registration failed:', error);
        }
      );
    }
  }, []);

  return (
    <>
      <p>XenoTrade</p>
    </>
  )
}

export default App
