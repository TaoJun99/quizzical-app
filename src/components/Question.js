import React from "react"

function Question(props) {

    const optionElements = props.data.options.map((option, index) => (
        <button
            className={`option 
                ${props.data.graded && `gray_option`}
                ${props.data.graded
                    && (props.data.correctOption === index 
                        ? `correct_option` 
                        : props.data.selected === index ? `incorrect_option` : ``)
                }
                ${!props.data.graded && (props.data.selected === index) && `option_selected`}`
            } 
            onClick={() => props.handleClick(index)}
            disabled={props.data.graded}
        >
            {option}
        </button>
    ))

    return (
        <div className="question">
            <h2>{props.data.question}</h2>
            <div className="options">
                {optionElements}
            </div>
            <hr />
        </div>

    )
}

export default Question