import React from "react"
import "./style.css"
import Homepage from "./components/Homepage"
import Quiz from "./components/Quiz"
import {decode} from 'html-entities'

function App() {
    const [home, setHome] = React.useState(true)
    const [questions, setQuestions] = React.useState([])
    const isFetched = React.useRef(false)

    console.log(questions)

    React.useEffect(() => {
        if (!isFetched.current) {
            fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple")
                .then(res => res.json())
                .then(data => {
                    let array = []
                    for (let i = 0; i < data.results.length; i++) {
                        array.push({
                            id: i,
                            question: decode(data.results[i].question),
                            correct: decode(data.results[i].correct_answer),
                            incorrect: decode(data.results[i].incorrect_answers.toString())
                        })
                    }
                    setQuestions(array)
                    isFetched.current = true
                })
        }
    }, [home])
    
    function loadHomePage() {
        isFetched.current = false
        setHome(true)
    }

    function loadQuizPage() {
        setHome(false)
    }

    return (
        <div>
            {home
                ? <Homepage handleClick={loadQuizPage}/>
                : <Quiz handleClick={loadHomePage} questions={questions}/>
                 
            }
        </div>
    )
}

export default App;
