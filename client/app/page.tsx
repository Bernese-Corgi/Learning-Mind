'use client'

import ElementInspector from "@/components/ElementInspector"
import Highlight from "@/components/Highlight"
import Toolbar from "@/components/Toolbar"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Home() {
    // TODO 스택으로 관리
    // const [htmlCode, setHtmlCode] = useState<string[]>([])
    const [urlInput, setUrlInput] = useState<string>('');

    const [headHtml, setHeadHtml] = useState<string>('');
    const [bodyHtml, setBodyHtml] = useState<string[]>([]);

    const [selectMode, setSelectMode] = useState<boolean>(false);

    const getHtmlCode = async (url: string) => {
        const response = await axios.post("/api/asdf", {
            url: url,
        })

        if (response.status !== 200) {
            alert('찾을 수 없는 url입니다. 다시 입력해주세요.')
            return
        }

        const urlObj = new URL(url)
        const domain = 'https://' + urlObj.hostname

        const parser = new DOMParser(),
            dom = parser.parseFromString(response.data.document, "text/html")
        const imgEls = dom.querySelectorAll("img")
        const linkEls = dom.querySelectorAll("link")
        const aEls = dom.querySelectorAll("a")
        linkEls.forEach((el) => {
            const src = el.getAttribute("href")
            if (src && el.href.split("/").includes("localhost:3000")) {
                const path = el.href.split("http://localhost:3000")[1]
                el.setAttribute("href", domain + path)
            }
        })
        aEls.forEach((el) => {
            const src = el.getAttribute("href")
            if (src && el.href.split("/").includes("localhost:3000")) {
                const path = el.href.split("http://localhost:3000")[1]
                el.setAttribute("href", domain + path)
            }
        })
        imgEls.forEach((el) => {
            const src = el.getAttribute("src")
            if (src && el.src.split("/").includes("localhost:3000")) {
                const path = el.src.split("http://localhost:3000")[1]
                console.log(domain + path);
                el.setAttribute("src", domain + path)
            }
        })
        const script = dom.querySelectorAll("script")
        script.forEach((scriptEl) => {
            scriptEl.remove()
        })
        setHeadHtml(dom.head.outerHTML)
        setBodyHtml(p => [...p, dom.body.outerHTML])
    }

    const handleSelectElement = (target: HTMLElement) => {
        const parser = new DOMParser(),
            dom = parser.parseFromString('<body></body>', "text/html")
        
        const body = dom.querySelector('body')
        const newTarget = target.cloneNode(true)

        if (body) {
            body.innerHTML = ''
            dom.body.appendChild(newTarget)
        }
        setBodyHtml(p => [...p, dom.documentElement.outerHTML])
    }

    // useEffect(() => {
    //     if (!urlInput) return

    //     getHtmlCode(urlInput)
    // }, [urlInput])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="">Learning Tool</h1>
            <div className="">
                <form onSubmit={e => {
                    e.preventDefault()
                    console.log(e.currentTarget['urlInput'].value);
                    getHtmlCode(e.currentTarget['urlInput'].value)
                }} action="" className="fixed top-0 left-1/2 bg-slate-200">
                    <input 
                        name="urlInput"
                        type="text" 
                        value={urlInput}
                        onChange={e => setUrlInput(e.target.value)}
                        className="bg-transparent border" />
                    <button type="submit" className="">확인</button>
                </form>
                <button onClick={() => setSelectMode(p => !p)} className="bg-red-100 w-10 h-10 text-2xl fixed top-0 right-0 z-50 rounded-full">
                    {selectMode ? 'X' : 'O'}
                </button>
                {headHtml && selectMode && (
                    <div className="bg-white fixed top-0 left-0 z-50">
                        <ElementInspector onSelectElement={handleSelectElement} />
                    </div>
                )}
                <div className="">
                    <Highlight htmlCode={`<html>${headHtml}${bodyHtml[bodyHtml.length - 1]}</html>`} />
                </div>
            </div>
        </main>
    )
}
