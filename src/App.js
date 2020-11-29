import './App.css';
import MainContainer from './containers/MainContainer'
import Header from './components/Header'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <MainContainer />
    </div>
  );
}

export default App;
