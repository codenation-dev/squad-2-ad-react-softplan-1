import React from 'react';
import Routes from '../src/components/routes';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
