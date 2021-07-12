import React from 'react'

const StepName = ({onClick}) => {
    return (
        <div>
            Step Name
            <button onClick={onClick} >Next</button>
        </div>
    )
}

export default StepName
