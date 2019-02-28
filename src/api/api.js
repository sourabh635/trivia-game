import axios from 'axios';
/**
 * api's
 */
const API = {
    /**
     * API call getting the question
     */
    GetQuizQuestion: function(){
        return new Promise((resolve, reject) => {
            let url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
            axios({
                method  : 'get',
                url     : url
            })
            .then(data=>{
                // 
                resolve(data.data)
            })
            .catch(err=>{
                // 
                reject('ERR_UNABLE_FETCH');
            })
        })
    }
}
export default API;