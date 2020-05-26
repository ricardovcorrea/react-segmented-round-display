import React from 'react';
import SegmentedRoundDisplay from './SegmentedRoundDisplay';

import './App.css';

function App() {
  const goals = [
    {
      done: true,
      total: 80,
      spent: 80
    },
    {
      done: true,
      total: 80,
      spent: 80
    },
    {
      done: true,
      total: 80,
      spent: 80
    },
    {
      done: false,
      total: 80,
      spent: 30
    },
    {
      done: false,
      total: 80,
      spent: 0
    },
    {
      done: false,
      total: 80,
      spent: 0
    }
  ]

  return (
    <div className="App">
      {goals.map((goal, index) => <SegmentedRoundDisplay key={index} goals={goals.slice(0, index)} />)}
    </div>
  );
}

export default App;


