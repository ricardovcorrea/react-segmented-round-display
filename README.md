## Segmented Round Display

![Example](https://raw.githubusercontent.com/ricardovcorrea/segmented-round-display-react/master/example.gif)

#### Props
| Name  | Type  | Default  | Description  |
| ------------ | ------------ | ------------ | ------------ |
|  segments | Array **of** { total: int, filled: int }  | []  | segments to be rendered  |
| arcWidth  | int | 7  | thickness of filled line  |
| emptyArcWidth  | int   | 7  | thickness of empty line |
| arcSpacing  |  int |  7 | space between segments  |
|  totalArcSize |  int | 280  | total arc size in degrees  |
| radius  | int  | 150  | radius of the arc  |
| emptyColor  |  string | grey  |  color of empty line |
|  filledColor | string  |  green |  color of filled line |
| animated  | bool  | true  | enable/disable segments fill animation  |
| animationDuration  | int  | 700  | duration of fill animation in MS  |
| styles  | Styles object  | {}  | styles to be applied to container  |


