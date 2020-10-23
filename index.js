import react, { useRef, useEffect } from 'react';

const acceptablePositions = {
  absolute: true,
  relative: true,
  fixed: true
};

/**
 * @param {react.HTMLProps & { onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props 
 */
const Div = (props = {}) => {
  const ref = useRef();
  const { onResize, children, style = {}, ...restProps } = props;
  const position = (
    acceptablePositions[style.position] ?
      style.position
    : 'relative'
  );
  useEffect(() => {
    const iframeWindow = ref.current.contentWindow;
    iframeWindow.onresize = () => {
      onResize({ width: iframeWindow.innerWidth, height: iframeWindow.innerHeight, init: false });
    };
    onResize({ width: iframeWindow.innerWidth, height: iframeWindow.innerHeight, init: true });
  }, [onResize]);
  return (
    <div style={{ ...style, position  }} {...restProps}>
      <iframe ref={ref} frameBorder={0} style={{ position: 'absolute', border: 0, margin: 0, padding: 0, top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }} />
      {children}
    </div>
  ); 
};

export default Div;
export { Div };