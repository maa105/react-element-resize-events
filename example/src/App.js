import React, { useState } from 'react'

import { Div } from 'react-element-resize-events'

const App = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState();
  return <>
    {JSON.stringify(size)}<br/>
    <Div style={{ display: 'inline-block', padding:'10px', border: '5px solid black' }} onResize={setSize}>
      Hello World!<br/>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <div style={{whiteSpace: 'pre-wrap'}}>{text}</div>
    </Div>
  </>;
}

export default App
