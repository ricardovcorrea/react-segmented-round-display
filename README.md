
## react-segmented-round-display
[![Version](https://img.shields.io/npm/v/react-segmented-round-display.svg)](https://www.npmjs.com/package/react-native-svg)  [![NPM](https://img.shields.io/npm/dm/react-segmented-round-display.svg)](https://www.npmjs.com/package/react-native-svg)

`react-segmented-round-display` provides a simple ARC component, drawn with SVG, it can have one or more segments and its easy configurable.

![Example](https://raw.githubusercontent.com/ricardovcorrea/segmented-round-display-react/master/examples.gif)

## Features
-   One segment
- 	Multiple segments
- 	Fill animation
- 	Control of fill animation duration
- 	Animated tag with value
- 	Custom value formater
- 	Configurable colors
- 	Configurable ARC radius and total size in degrees
- 	Configurable space between arc segments

## Installation
`yarn add react-segmented-round-display`

**or**

`npm install react-segmented-round-display --save`

## Usage

Here's a simple example. To render output like this:

![Usage example](https://raw.githubusercontent.com/ricardovcorrea/segmented-round-display-react/master/usage_example.gif)

```jsx
import React from 'react';
import SegmentedRoundDisplay from 'react-segmented-round-display';

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
    }
  ]
  return (
    <div>
      {examples.map((example, i) => (<SegmentedRoundDisplay style={{ marginLeft: 30 }} key={i} {...example} />))}
    </div>
  );
}

export default App;

```

## Common props
| Name  | Type  | Default  | Description  |
| ------------ | ------------ | ------------ | ------------ |
|  segments | Array **of** { total: int, filled: int }  | []  | segments to be rendered  |
| filledArcWidth  | int | 7  | thickness of filled arc  |
| emptyArcWidth  | int   | 7  | thickness of empty arc |
| arcSpacing  |  int |  7 | space between segments  |
| totalArcSize |  int | 280  | total arc size in degrees  |
| radius  | int  | 150  | radius of the arc  |
| emptyArcColor  |  string | #ADB1CC  |  color of empty arc |
| filledArcColor | string  |  #5ECCAA |  color of filled arc |
| incompleteArcColor  | string  | #23318C  | color of incomplete arc  |
| animated  | bool  | true  | enable/disable segments fill animation  |
| animationDuration  | int  | 1000  | duration of fill animation in MS  |
| displayValue  | bool  | false  | enable/disable the value display  |
| formatValue  | function  | {}  | function to formar the value |
| valueBoxColor  | string | #23318C  | color of box that holds the value if displayValue = true  |
| valueFontColor  | string  | #FFFFFF  | color of text of value if displayValue = true  |
| styles  | Styles object  | {}  | styles to be applied to container  |

## Run example

```bash
git clone https://github.com/ricardovcorrea/segmented-round-display-react.git
cd segmented-round-display-react/example
yarn
yarn start

```

## Contributors

### Ricardo Vaz Corrêa
- [ricardovazcorrea@gmail.com](mailto:ricardovazcorrea@gmail.com "Email - ricardovazcorrea@gmail.com")
- [Github](https://github.com/ricardovcorrea "Github")
- [Linkedin](https://www.linkedin.com/in/ricardo-vaz-correa/ "Linkedin")