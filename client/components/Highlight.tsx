'use client';

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

interface HighlightProps {
    htmlCode: string
}

const Highlight = ({ htmlCode }: HighlightProps) => {
    const KEY_CODE = 'AltLeft'
    const [keydown, setKeydown] = useState<boolean>(false);
    
    // const [htmlCode, setHtmlCode] = useState<HTMLElement | null>(null);
    const [selectedEl, setSelectedEl] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const copyContainerRef = useRef<HTMLDivElement>(null);


    const selection = useRef<Selection | null>(null);
            
    const handleSelection = () => {
        const selected = document.getSelection()
        const text = selected?.toString();
        if (text && keydown) {
            selection.current = selected;

            // console.log('selected', selected?.getRangeAt(0));
            // console.log('text', text);
        }
    }

    const handleKeyup = (e: any) => {
        // console.log('handleKeyup', e);
        if (e.code === KEY_CODE) {
            e.preventDefault()
            setKeydown(false)
        }
    }

    const handleKeyDown = (e: any) => {
        // console.log('handleKeyDown', e);
        console.log('KEY_CODE', e.code);
        if (e.code === KEY_CODE) {
            e.preventDefault()
            setKeydown(true)
        }
    }

    useEffect(() => {
        // document.addEventListener(, handleSelection);
        // document.addEventListener('selectionchange', handleSelection);
        document.addEventListener('keyup', handleKeyup);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            // document.removeEventListener('selectionchange', handleSelection);
            document.removeEventListener('keyup', handleKeyup);
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    console.log(selectedEl);


    return (<>
    <div ref={copyContainerRef} className=""></div>
        {/* {selectedEl.map((elem, i) => (
            <div key={`selected-elem-${i}`} className="">
                {elem}
            </div>
        ))} */}
        {/* <div className="selected-elements">
          {selectedEl.map((range, index) => {
            const clonedRange = range.cloneRange();
            const selectedText = clonedRange.extractContents();
            console.log(selectedText);
            const span = document.createElement('span');
            span.classList.add('highlight');
            span.appendChild(selectedText);
            clonedRange.insertNode(span);

            return (
              <div
                key={index}
                // dangerouslySetInnerHTML={{ __html: span.outerHTML }}
                className="selected-element"
                onClick={() => span.classList.remove('highlight')}
              >
                {span.outerHTML}
              </div>
            );
          })}
        </div> */}
        <div 
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: htmlCode }}
            // onMouseDown={() => setSelectedEl([])}
            onMouseUp={() => {
                if (!keydown) return

                const selection = window.getSelection()
                
                if (selection && selection.toString()) {
                    const range = selection.getRangeAt(0)
                    const selectedNode = range.commonAncestorContainer
                    const newDiv = document.createElement('span')
                    newDiv.classList.add('qwerqwer')
                    range.surroundContents(newDiv)
    
                    if (containerRef.current?.contains(selectedNode)) {
                        const newLine = document.createElement('div')
                        newLine.classList.add('asdfasdfas')
                        containerRef.current?.appendChild(newDiv)
                        copyContainerRef.current?.appendChild(newLine)
                        copyContainerRef.current?.appendChild(range.cloneContents())
                        setSelectedEl(p => [...p, range.cloneRange()])
                    }
                }
            }}>
                {/* <div
                dangerouslySetInnerHTML={{ __html: htmlCode }}
                // onMouseUp={handleSelection}
                // onMouseUp={() => {}}
                className="">
            </div> */}
            
        </div>
    </>)
}

export default Highlight