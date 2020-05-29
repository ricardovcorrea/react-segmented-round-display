import React from 'react';
import SegmentedRoundDisplay from 'react-segmented-round-display';

import './App.css';

function App() {

  const examples = [
    {
      displayValue: true,
      formatValue: (value) => `R$ ${value.toFixed(2)}`,
      segments: [
        {
          total: 80,
          filled: 40
        }
      ]
    },
    {
      displayValue: true,
      formatValue: (value) => `R$ ${value.toFixed(2)}`,
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 30,
          filled: 15
        }
      ]
    },
    {
      displayValue: true,
      formatValue: (value) => `R$ ${value.toFixed(2)}`,
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 30,
          filled: 30
        },
        {
          total: 100,
          filled: 40
        }
      ]
    },
    {
      displayValue: true,
      filledArcColor: '#ec823a',
      emptyArcColor: '#e8e4e1',
      incompleteArcColor: '#f9c49a',
      valueBoxColor: '#000000',
      valueFontColor: '#FFFFFF',
      formatValue: (value) => `${value.toFixed(0)} pts`,
      segments: [
        {
          total: 80,
          filled: 40
        }
      ]
    },
    {
      displayValue: true,
      filledArcColor: '#ec823a',
      emptyArcColor: '#e8e4e1',
      incompleteArcColor: '#f9c49a',
      valueBoxColor: '#000000',
      valueFontColor: '#FFFFFF',
      formatValue: (value) => `${value.toFixed(0)} pts`,
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 30,
          filled: 15
        }
      ]
    },
    {
      displayValue: true,
      filledArcColor: '#ec823a',
      emptyArcColor: '#e8e4e1',
      incompleteArcColor: '#f9c49a',
      valueBoxColor: '#000000',
      valueFontColor: '#FFFFFF',
      formatValue: (value) => `${value.toFixed(0)} pts`,
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 30,
          filled: 30
        },
        {
          total: 100,
          filled: 40
        }
      ]
    },
    {
      animated: false,
      displayValue: true,
      filledArcColor: '#442727',
      emptyArcColor: '#eae7d9',
      incompleteArcColor: '#d2c6b2',
      valueBoxColor: '#442727',
      valueFontColor: '#eae7d9',
      segments: [
        {
          total: 80,
          filled: 40
        }
      ]
    },
    {
      animated: false,
      displayValue: true,
      filledArcColor: '#442727',
      emptyArcColor: '#eae7d9',
      incompleteArcColor: '#d2c6b2',
      valueBoxColor: '#442727',
      valueFontColor: '#eae7d9',
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 30,
          filled: 15
        }
      ]
    },
    {
      animated: false,
      displayValue: true,
      filledArcColor: '#442727',
      emptyArcColor: '#eae7d9',
      incompleteArcColor: '#d2c6b2',
      valueBoxColor: '#442727',
      valueFontColor: '#eae7d9',
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 30,
          filled: 30
        },
        {
          total: 100,
          filled: 40
        }
      ]
    },
    {
      animated: false,
      filledArcColor: '#7f78d2',
      emptyArcColor: '#ffe2ff',
      incompleteArcColor: '#481380',
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 30,
          filled: 30
        },
        {
          total: 100,
          filled: 40
        }
      ]
    },
    {
      animated: false,
      filledArcColor: '#7f78d2',
      emptyArcColor: '#ffe2ff',
      incompleteArcColor: '#481380',
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        }
      ]
    },
    {
      animated: false,
      filledArcColor: '#7f78d2',
      emptyArcColor: '#ffe2ff',
      incompleteArcColor: '#481380',
      segments: [
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        }, {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 80
        },
        {
          total: 80,
          filled: 0
        },
        {
          total: 80,
          filled: 0
        }
      ]
    }
  ]
  return (
    <div className="App">
      <div>
        {examples.slice(0, 6).map((example, i) => (<SegmentedRoundDisplay style={{ marginLeft: 30 }} key={i} {...example} />))}
      </div>

      <div>
        {examples.slice(6, 12).map((example, i) => (<SegmentedRoundDisplay style={{ marginLeft: 30 }} key={i} {...example} />))}
      </div>

    </div>
  );
}

export default App;


