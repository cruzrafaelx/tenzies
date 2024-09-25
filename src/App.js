import './App.css';
import Die from './components/die';

function App() {
  return (
    <main>
      <div className='dice--container'>
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
      </div>
      
    </main>
  );
}

export default App;
