This components gives your div/element an `onResize` event like so:

```jsx

import { Div } from 'react-element-resize-events';

const MyComponent = ({ text }) => {
  const onResize = ({ width, height, init }) => {
    console.log(`width: ${width}, height: ${height}${init ? `, and this resize event was due to element being mounted` : ``}.`);
  };
  <Div onResize={onResize}>{text}</Div>
};

```

# How it works

The basic idea is that only the window object has an on resize event. So I capitalize on this fact. The `Div` component returns a `div` which is positioned (relative positioning by default) and inside this `div` the first element is an `iframe` with absolute positioning and with both width and height set to 100%. The children of the `Div` are then placed inside another `div` adjacent to the `iframe` with relative positioning (so that they are infront the `iframe`). So in a sence this component adds an extra nesting level. But hey now you have onResize events.

The idea is the `iframe` will expand with the parent `div` and since the `iframe` has a window element I attached the `onresize` event to it, and then "forward" the event to the user's input `onResize` function.

# Generic tag

```jsx

import { ElemWithResizeEvents } from 'react-element-resize-events';

const MyComponent = ({ text }) => {
  const onResize = ({ width, height, init }) => {
    console.log(`width: ${width}, height: ${height}${init ? `, and this resize event was due to element being mounted` : ``}.`);
  };
  <ElemWithResizeEvents tagName="h1" onResize={onResize}>{text}</Div>
};

```
