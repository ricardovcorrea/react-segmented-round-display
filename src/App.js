import React from 'react';
import SegmentedRoundDisplay from './SegmentedRoundDisplay';

import './App.css';

function App() {

  const examples = [
    {
      segments: [
        {
          total: 100,
          filled: 50
        }
      ]
    },
    {
      filledColor: 'red',
      emptyColor: 'blue',
      animationDuration: 2000,
      radius: 130,
      segments: [
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 50
        }
      ]
    },
    {
      arcWidth: 8,
      emptyArcWidth: 15,
      filledColor: 'blue',
      emptyColor: 'red',
      arcSpacing: 15,
      animated: false,
      animationDuration: 1000,
      radius: 100,
      segments: [
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 50
        }
      ]
    },
    {
      arcWidth: 5,
      filledColor: 'black',
      animationDuration: 2000,
      arcSpacing: 20,
      totalArcSize: 340,
      radius: 30,
      segments: [
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 50
        }
      ]
    },
    {
      arcWidth: 15,
      emptyArcWidth: 2,
      filledColor: 'orange',
      emptyColor: 'black',
      animationDuration: 300,
      arcSpacing: 30,
      segments: [
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 50
        }
      ]
    },
    {
      arcWidth: 15,
      filledColor: 'purple',
      emptyColor: 'green',
      animationDuration: 5000,
      arcSpacing: 20,
      segments: [
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 50
        }
      ]
    },
    {
      arcWidth: 5,
      emptyArcWidth: 10,
      filledColor: 'yellow',
      animationDuration: 3000,
      radius: 200,
      totalArcSize: 180,
      segments: [
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 50
        }
      ]
    },
    {
      arcWidth: 15,
      filledColor: 'fuchsia',
      animationDuration: 5000,
      arcSpacing: 20,
      totalArcSize: 90,
      radius: 200,
      segments: [
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 100
        },
        {
          total: 100,
          filled: 50
        }
      ]
    }
  ]
  return (
    <div className="App">
      {examples.map((example, i) => (<SegmentedRoundDisplay style={{ marginLeft: 30 }} key={i} {...example} />))}


    </div>
  );
}

export default App;


