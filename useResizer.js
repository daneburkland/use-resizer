import ReactDOM from 'react-dom';
import { useEffect, useState, useRef } from 'react';

function useResizer() {
  const resizer = useRef();
  const resizable = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [resizableWidth, setResizableWidth] = useState(200);
  const [initialResizableWidth, setInitialResizableWidth] = useState();
  const [dragStartX, setDragStartX] = useState();

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    ReactDOM.findDOMNode(resizer.current).addEventListener('mouseup', stopResize);

    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);
      ReactDOM.findDOMNode(resizer.current).removeEventListener('mouseup', stopResize);
    };
  });

  function onMouseMove(event) {
    if (isDragging) {
      resizePanel(event);
    }
  }

  function onStartResize(event) {
    setIsDragging(true);
    setInitialResizableWidth(resizable.current.getBoundingClientRect().width);
    setDragStartX(event.clientX);
  }

  function stopResize() {
    setIsDragging(false);
  }

  function resizePanel(event) {
    setResizableWidth(initialResizableWidth + (dragStartX - event.clientX));
  }

  return [resizer, resizable, resizableWidth, onStartResize];
}

export default useResizer;