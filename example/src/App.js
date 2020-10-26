import React, { useState } from 'react'

import { Div } from 'react-element-resize-events'

const App = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState();
  return <Div style={{ display: 'inline-block', border: '1px solid black' }} onResize={setSize}>
    Hello World!<br/>
    {JSON.stringify(size)}<br/>
    <textarea value={text} onChange={(e) => setText(e.target.value)} />
    <div style={{whiteSpace: 'pre-wrap'}}>{text}</div>
  </Div>;
}

export default App
