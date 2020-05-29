## Segmented Round Display

![Example](https://raw.githubusercontent.com/ricardovcorrea/segmented-round-display-react/master/examples.gif)

#### Props
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


