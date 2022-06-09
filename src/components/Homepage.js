import React from 'react'

function Homepage(props) {
    return (
        <main className="homepage">
            <h1>Quizzical</h1>
            <p>These quiz questions are taken from Open Trivia DB</p>
            <button onClick={props.handleClick}>Start</button>
        </main>
    )
}

export default Homepage