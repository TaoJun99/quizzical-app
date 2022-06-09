import React from 'react'
import Question from './Question'


function Quiz(props) {
    const [graded, setGraded] = React.useState(false)
    const [questions, setQuestions] = React.useState(props.questions.map(question => {
        let options = question.incorrect.split(',')
        const randomIndex = Math.floor(Math.random() * 4)
        options.splice(randomIndex, 0, question.correct)
        
        return {
            id: question.id,
            question: question.question,
            options: options,
            correctOption: randomIndex,
            correct: false,
            selected: -1,
            graded: graded
        }
    }))

    function markQuestions() {
        setGraded(true)
        setQuestions(prevQuestions => prevQuestions.map(question => (
            {
                ...question,
                graded: true,
                correct: question.selected === question.correctOption
            }
            
        )))
    }

    function selectOption(question_id, option_id) {
        setQuestions(prevQuestions => prevQuestions.map(question => (
            question.id === question_id
            ? {
                ...question,
                selected: option_id
            }
            : question
        )))
    }

    let questionElements = questions.map(question => (
        <Question key={question.id} data={question} handleClick={option_id => selectOption(question.id, option_id)}/>
    ))

    console.log(questions)
    return (
        <main className="quiz">
            {questionElements}
            <div className="btn-container">
                {!graded && <button className="quiz_btn" onClick={markQuestions}>Check answers</button>}
                {graded && <p className="quiz_results">You scored {questions.filter(qn => qn.correct).length}/5 correct answers</p>}
                {graded && <button className="quiz_btn" onClick={props.handleClick}>Play Again</button>}
            </div>
        </main>
    )
}

export default Quiz