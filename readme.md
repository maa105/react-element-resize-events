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

The basic idea is that only the window object has an on resize event. So I capitalize on this fact. The `Div` component returns a `div` which is positioned (relative positioning by default) and inside this `div` the first element is an `iframe` with absolute positioning and with both width and height set to 100% and `visibility: hidden`. The children of the `Div` are then placed next to the `iframe`.

The idea is the `iframe` will expand with the parent `div` and since the `iframe` has a window element which I attach an `onresize` event to it, then "forward" the event to the user's input `onResize` function.

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

# defaults

By default the dimentions returned to the `onResize` function are the inner dimentions of the element (i.e. without margin/padding/border). To override this set `getInnerDimentions` prop to false as bellow:

```jsx

import { ElemWithResizeEvents } from 'react-element-resize-events';

const MyComponent = ({ text }) => {
  const onResize = ({ width, height, init }) => {
    console.log(`width: ${width}, height: ${height}${init ? `, and this resize event was due to element being mounted` : ``}.`);
  };
  <ElemWithResizeEvents tagName="h1" onResize={onResize} getInnerDimentions={false}>{text}</Div>
};

```

You can also change the default `getInnerDimentions` by utilising the `setDefaults` function as bellow

```jsx

import { setDefaults } from 'react-element-resize-events';

setDefaults({ getInnerDimentions: false });

```

You can also change the default tag name used by `ElemWithResizeEvents`

```jsx

import { setDefaults } from 'react-element-resize-events';

setDefaults({ tagName: 'span' });

```
