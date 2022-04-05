import './App.css';
import Form from './components/Form';
import Graph from './components/Graph';

function App() {
  return (
    <div className='text-center text-3xl App'>
     <h1 className='bg-slate-800 py-8 text-white rounded-full mb-8'>Expense Tracker</h1>
     <div className='grid md:grid-cols-2 gap-8'>
       <Graph />
       <Form />
     </div>
    </div>
  );
}

export default App;
