import React, { useState } from 'react'

interface ToolbarProps {

}

const Toolbar = ({  }: ToolbarProps) => {

    return (
        <>
            <div className="">
                <button className="">
                    {`←`}
                </button>
                <button className="">
                    {`→`}
                </button>
            </div>
        </>
    )
}

export default Toolbar