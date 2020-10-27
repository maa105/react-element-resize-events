import React, { useRef, useEffect } from 'react';

const acceptablePositions = {
  absolute: true,
  relative: true,
  fixed: true
};

const defaults = {
  tagName: 'div',
  getInnerDimentions: true
};

const getInnerDims = (elem) => {
  const { width, height } = elem.currentStyle || window.getComputedStyle(elem, null);
  return {
    width: parseFloat(width.substr(0, width.length - 2)),
    height: parseFloat(height.substr(0, height.length - 2))
  };
};

/**
 * #__PURE__
 * @param {React.HTMLProps & { tagName: string, getInnerDimentions: Boolean, onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const ElemWithResizeEvents = (props) => {
  const { tagName = defaults.tagName, getInnerDimentions = defaults.getInnerDimentions, onResize, children, style = {}, ...restProps } = props;
  const position = (
    acceptablePositions[style.position]
      ? style.position
      : 'relative'
  );

  const ref = useRef();
  const paramsRef = useRef({ onResize, getInnerDimentions });

  useEffect(() => {
    paramsRef.current = { onResize, getInnerDimentions };
  }, [onResize, getInnerDimentions]);

  useEffect(() => {
    const iframeElem = ref.current;
    const parentElem = iframeElem.parentElement;
    const iframeWindow = iframeElem.contentWindow;
    const onResize = (init) => {
      if(paramsRef.current.onResize) {
        paramsRef.current.onResize(
          paramsRef.current.getInnerDimentions
            ? { ...getInnerDims(parentElem), init }
            : { width: parentElem.offsetWidth, height: parentElem.offsetHeight, init }
        );
      }
    };
    iframeWindow.onresize = () => onResize(false);
    onResize(true);
    return () => {
      iframeWindow.onresize = null;
    };
  }, []);

  return React.createElement(
    tagName, { style: { ...style, position }, ...restProps },
    <iframe ref={ref} frameBorder={0} style={{ position: 'absolute', backgroundColor: 'transparent', visibility: 'hidden', border: 0, margin: 0, padding: 0, top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }} />,
    children
  );
};

/**
 * #__PURE__
 * @param {React.HTMLProps & { getInnerDimentions: Boolean, onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const Div = (props) => <ElemWithResizeEvents {...props} tagName="div" />;

/**
 * #__PURE__
 * @param {React.HTMLProps & { getInnerDimentions: Boolean, onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const Span = (props) => <ElemWithResizeEvents {...props} tagName="span" />;

/**
 * #__PURE__
 * @param {React.HTMLProps & { getInnerDimentions: Boolean, onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const Td = (props) => <ElemWithResizeEvents {...props} tagName="td" />;

/**
 * #__PURE__
 * @param {React.HTMLProps & { getInnerDimentions: Boolean, onResize: ({ width: Number, height: Number, init: Boolean }) => void }} props
 */
const Li = (props) => <ElemWithResizeEvents {...props} tagName="li" />;

/**
 * #__PURE__
 * @param {{ getInnerDimentions: Boolean }} props
 */
const setDefaults = ({ tagName = defaults.tagName, getInnerDimentions = defaults.getInnerDimentions }) => Object.assign(defaults, { tagName, getInnerDimentions });

export { ElemWithResizeEvents, Div, Span, Td, Li, setDefaults };
