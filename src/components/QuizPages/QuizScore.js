import React from 'react';

const QuizScore = (props)=>{
    return(
        <div className="question-tab">
            <div className="question-header">
                <h2>Your Score is {props.score}</h2>
            </div>
            <div className="quiz-answer-tab-container" style={{'gridTemplateColumns': '1fr'}}>
                <div className="answer-tab" onClick={props.restartClick.bind(this)}>
                    <div className="answer">Restart</div>
                </div>
            </div>
        </div>
    )
}

export default QuizScore;
