import React from 'react';
import QuizAnswerTabs from './QuizAnswerTabs';

const QuizQuestions = (props)=>{
    let count =-1;
    return(
        <div className="question-tab">
            <div className="question-header">
                <h2 dangerouslySetInnerHTML={{__html: props.question.question}}></h2>
            </div>
            <h4 className="quiz-answer-header">Select One</h4>
            <div className="quiz-answer-tab-container">
            {
                props.question.allAnswers.map( answer =>{
                    return(
                        <QuizAnswerTabs key={++count} id={count} option={answer} answerClick={props.answerClick.bind(this)} />
                    )
                } )
            }
            </div>
        </div>
    )
}
export default QuizQuestions;
