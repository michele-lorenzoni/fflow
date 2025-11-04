import { useRef, useEffect, useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { textareaStyles } from './styles/classNames'

import MyHandle from './MyHandle';

function MyTextNode(props) {
  const { selected, data } = props;
  const contentRef = useRef(null);
  const [minDimensions, setMinDimensions] = useState({ width: 224, height: 124 });

  useEffect(() => {
    if (contentRef.current) {
      const { scrollWidth, scrollHeight } = contentRef.current;
      setMinDimensions({
        width: scrollWidth,
        height: scrollHeight,
      });
    }
  }, [data]);

  return (
    <>
      <NodeResizer
        minWidth={minDimensions.width}
        minHeight={minDimensions.height}
        isVisible={selected}
        color="#00a6f4"
        lineStyle={{ borderWidth: 1 }}
        handleStyle={{
          width: 5,
          height: 5,
          borderRadius: 0,
          backgroundColor: '#00a6f4',
          border: '#000',
        }}
      />
      
      <div 
        ref={contentRef} 
        className="shadow-md/5 box-border flex flex-col"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <div className='bg-transparent text-menu-icon flex border-1 border-b-0 border-menu-border'>
          <div className='bg-menu-icon text-menu-bg px-4 py-2 border-r-1 border-menu-border text-xs italic'>
            <p>hello_world.txt</p>
          </div>
        </div>
        <textarea 
          className={textareaStyles}
          defaultValue='Lorem Ipsum'
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
        >
        </textarea>
        <MyHandle />
      </div>
    </>
  );
}

export default MyTextNode;