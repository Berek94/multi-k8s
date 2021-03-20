import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header style={{ margin: '20px' }}>
          <h1>Fib Calculator v2</h1>
          <Link to="/">Home</Link>
          {' '}
          <Link to="/other-page">Other page</Link>
        </header>
        <Route exact path="/" component={Fib} />
        <Route exact path="/other-page" component={OtherPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
