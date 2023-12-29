import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'

const HomeMainbar = () => {

    const location=useLocation();
    const user = 1;
    const navigate = useNavigate();
    
    const questionsList = useSelector(state => state.questionsReducer)
   
    const checkAuth = () => {
        if(user === null){
            alert("login or signup to ask a question")
            navigate('/Auth')
        } else{
            navigate('/AskQuestion')
        }
    }

  return (
    <div className='main-bar'> 
    <div className='main-bar-header'>
        {
            location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>

    </div>
    <div >
        {
            questionsList.data === null ? 
            <p>Loading...<br/>Note:- The Backend is hosted on a paid platform so it is not possible to keep it online 24/7, please feel free to mail on chetanps131@gmail.com and the
                the server will be online for next 24 hours from the time of my response.
            </p>
             :
            <>
                <p>{questionsList.data.length} questions</p>
                <QuestionList questionsList={questionsList.data} />
               
                
            </>
        }
    </div>


    </div>
  )
}

export default HomeMainbar