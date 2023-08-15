'use client'
import React, { useEffect, useRef, useState } from "react"

interface ElementInspectorProps {
    onSelectElement: (target: HTMLElement) => void
}

const ElementInspector = ({ onSelectElement }: ElementInspectorProps) => {
    const [hoveredElement, setHoveredElement] = useState<any>(null)
    const [clickElement, setClickElement] = useState<any>(null)
    //   const [click, setClick] = useState<boolean>(false);
    const boxRef = useRef<HTMLDivElement>(null)

    const updateElementInfo = (event: any) => {
        // console.log("updateElementInfo")
        const target = event.target as HTMLElement
        const rect = target.getBoundingClientRect()
        // console.log(target);
        target.classList.add("highlighted")
        setHoveredElement({
            tag: target.tagName,
            id: target.id,
            class: target.className,
            rect: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            },
        })
    }

    const clearHoveredElement = (event: any) => {
        // console.log("clearHoveredElement")
        const target = event.target as HTMLElement
        target.classList.remove("highlighted")
        setHoveredElement(null)
    }

    const clickElementInfo = (event: any) => {
        const target = event.target
        const rect = target.getBoundingClientRect()
        const origin = document.querySelectorAll(".clickedasdf")
        origin.forEach((el) => el.classList.remove("clickedasdf"))

        // console.log("clickElementInfo", target)
        setClickElement({
            tag: target.tagName,
            id: target.id,
            class: target.className,
            rect: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            },
        })
        onSelectElement(target)
        target.classList.add("clickedasdf")
        console.log(hoveredElement)
    }

    useEffect(() => {
        document.addEventListener("mouseover", updateElementInfo)
        document.addEventListener("mouseout", clearHoveredElement)
        document.addEventListener("click", clickElementInfo)

        return () => {
            document.removeEventListener("mouseover", updateElementInfo)
            document.removeEventListener("mouseout", clearHoveredElement)
            document.removeEventListener("click", clickElementInfo)
        }
    }, [])

    return (
        <div>
            <h1>Element Inspector</h1>
            <div className="">
                {hoveredElement ? (
                    <div>
                        <p>Tag: {hoveredElement.tag}</p>
                        <p>ID: {hoveredElement.id}</p>
                        <p>Class: {hoveredElement.class}</p>
                        <p>Rect: {JSON.stringify(hoveredElement.rect)}</p>
                    </div>
                ) : (
                    <p>Hover over an element to inspect.</p>
                )}
            </div>

            {/* {hoveredElement && (
        <div
            onClick={() => setClickElement(hoveredElement)}
          className="highlighted"
          style={{
            position: 'absolute',
            top: `${hoveredElement.rect.top}px`,
            left: `${hoveredElement.rect.left}px`,
            width: `${hoveredElement.rect.width}px`,
            height: `${hoveredElement.rect.height}px`,
            outline: '2px solid rgba(255, 0, 0, 0.5)',
            zIndex: 9999
          }}
        />
      )} */}
            <div className="" ref={boxRef}></div>

            {clickElement && (
                <div>
                    <p>Tag: {clickElement.tag}</p>
                    <p>ID: {clickElement.id}</p>
                    <p>Class: {clickElement.class}</p>
                    <p>Rect: {JSON.stringify(clickElement.rect)}</p>
                </div>
            )}
        </div>
    )
}

export default ElementInspector
