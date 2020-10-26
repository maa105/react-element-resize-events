import React, { useRef, useEffect } from 'react';

const acceptablePositions = {
  absolute: true,
  relative: true,
  fixed: true
};

/**
 * #__PURE__
 * @param {React.HTMLProps & { tagName: string, onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const ElemWithResizeEvents = (props) => {
  const ref = useRef();
  const { tagName = 'div', onResize, children, style = {}, ...restProps } = props;
  const position = (
    acceptablePositions[style.position]
      ? style.position
      : 'relative'
  );

  useEffect(() => {
    if(onResize) {
      const iframeWindow = ref.current.contentWindow;
      iframeWindow.onresize = () => {
        onResize({ width: iframeWindow.innerWidth, height: iframeWindow.innerHeight, init: false });
      };
      onResize({ width: iframeWindow.innerWidth, height: iframeWindow.innerHeight, init: true });
    }
  }, [onResize]);

  return React.createElement(
    tagName, { style: { ...style, position }, ...restProps },
    <iframe ref={ref} frameBorder={0} style={{ position: 'absolute', backgroundColor: 'transparent', border: 0, margin: 0, padding: 0, top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }} />,
    <div style={{ position: 'relative' }}>{children}</div>
  );
};

/**
 * #__PURE__
 * @param {React.HTMLProps & { onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const Span = (props) => <ElemWithResizeEvents {...props} tagName="span" />;

/**
 * #__PURE__
 * @param {React.HTMLProps & { onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const Td = (props) => <ElemWithResizeEvents {...props} tagName="td" />;

/**
 * #__PURE__
 * @param {React.HTMLProps & { onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const Li = (props) => <ElemWithResizeEvents {...props} tagName="li" />;

export { ElemWithResizeEvents, ElemWithResizeEvents as Div, Span, Td, Li };
