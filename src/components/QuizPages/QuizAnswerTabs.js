import React from 'react';

const QuizAnswerTab = (props)=>{
    return(
        <div className="answer-tab" onClick={props.answerClick.bind(this, props.id)}>
            <div className="answer" dangerouslySetInnerHTML={{__html: props.option}}></div>
        </div>
    )
}

export default QuizAnswerTab;
