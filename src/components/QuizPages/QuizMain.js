import React, { Component } from 'react';
import QuizQuestions from './QuizQuestions';
import QuizScore from './QuizScore'

import API from './../../api/api';

class QuizMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            quizQuestionArray : [],
            questionNo        : 0,
            currentScore      : 0,
            displayScore      : false,
            displayQuestion   : true
        }
    }
    onAnswerClick(answerClicked){
        // 
        let {questionNo, currentScore, quizQuestionArray} = this.state;
        if(quizQuestionArray[questionNo].correctAnswer === quizQuestionArray[questionNo].allAnswers[answerClicked] ){
            currentScore++;
        }
        questionNo++;
        if(questionNo > 9){
            this.setState({
                displayQuestion : false,
                displayScore    : true,
                currentScore    : currentScore
            })
        }
        else{
            this.setState({
                questionNo      : questionNo,
                currentScore    : currentScore
            });
        }
    }
    onRestartClick(){
        document.getElementById('loadingScreen').style.display = 'block';
        GetDataForQuiz()
        .then(data =>{
            this.setState({
                displayQuestion : true,
                displayScore    : false,
                questionNo      : 0,
                currentScore    : 0,
                quizQuestionArray : data
            })
            document.getElementById('loadingScreen').style.display = 'none';
        })
    }
    
    componentDidMount(){  
        GetDataForQuiz()
        .then(data =>{
            this.setState({
                quizQuestionArray : data
            });
            document.getElementById('loadingScreen').style.display = 'none';
        })
    }
    render() {
        const {displayScore, displayQuestion, currentScore, quizQuestionArray, questionNo} = this.state;
        return (
        <div className="main-div">
            <div className="loader" id="loadingScreen">
                <div className="loder-design">
                </div>
                <h3 className="loader-text">Starting...</h3>
            </div>
            <div className="question-conatiner">
                {
                    displayScore ? <QuizScore score={currentScore} restartClick={this.onRestartClick.bind(this)}/> : ''
                }
                {
                    (displayQuestion && quizQuestionArray.length > 0) ? <QuizQuestions question={quizQuestionArray[questionNo]} answerClick={this.onAnswerClick.bind(this)} /> : ''
                }
            </div>
        </div>
        );
    }
}

const rearrange = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
const GetDataForQuiz = () =>{
    return new Promise((resolve, reject) => {
        API.GetQuizQuestion()
        .then(response=>{
            let questionArray =[];
            response.results.forEach(eachObj=>{
                let allAnswers = eachObj.incorrect_answers;
                allAnswers.push(eachObj.correct_answer);
                allAnswers = rearrange(allAnswers);
                let questionObj = {
                    question        : eachObj.question,
                    correctAnswer   : eachObj.correct_answer,
                    allAnswers      : allAnswers
                }
                questionArray.push(questionObj);
            });
            resolve(questionArray);
        })
    })
};
export default QuizMain;
