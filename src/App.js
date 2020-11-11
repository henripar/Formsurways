
import React, {Component,
  useState, useEffect
} from 'react';
import {
  useHistory,
  useParams,
   useLocation,
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import './App.css';
import axios from 'axios';

const SubmitButton = (props) => {

  const history = useHistory();
  const changeRoute = (url) => {
    console.log(url)
    props.setUrl(url);
    history.push('/submitted/' + url);
  }

  return (
    <div>
        <button className="submit-button" onClick={()=> {axios.post("http://localhost:3001/forms/newForm", props.questions).then((url) => changeRoute(url.data))}} > Submit < /button>
    </div>
  )
}

const Submitted = (props) => {

  return (
    <div>
    <h1>Your survey has been created!</h1>
    <p>You can now share your survey by sharing this link:
     </p>
     <Link to={'/form/' + props.url}>{'http://localhost:3001/form/' + props.url}</Link>
    </div>
  )
}

const FormReady = (props) =>{
     let { id } = useParams();
     const [questions, setQuestions] = useState([]);
     useEffect(() => {
       axios.get("http://localhost:3001/forms/getForm", {
         params: {
           urlParam: id
         }
       }).then((formdata)=> {
         console.log(formdata.data);
         setQuestions(formdata.data);
         console.log(questions);
       })
     }, [])


   return (
    <div>
    {
      questions.map(question => {
        return (
          <div>
          <label> {question} </label>
          <input type="text"/>
          </div>
        )
      })
    }
    </div>
  )
}


const OptionQuestion = (props)=> {
  const [options, setOptions] = useState('')
  const handleOptionChange = (e, index, i) => {
    console.log(i, index, e)
    e.preventDefault();
        let qs = props.questions;
        qs[index].options[i] = e.target.value;
        props.setQuestions(qs);
        setOptions(e.target.value);
  }
  return (
    <div key={props.option.value}>
    <input readOnly name="hep" type="radio" disabled/>
<input type="text" name={options} value={options} onChange={(e) => handleOptionChange(e, props.index, props.i)} placeholder={"Option " + (props.i + 1)} />

</div>
  )
}
const QuestionType = (props) => {
  const addText = ()=> {
    props.setQuestions(props.questions.concat(""));
    props.setQuestionType(true);
  }
  const addMultipleChoice = ()=> {
    props.setQuestions(props.questions.concat({value: "", options: ["", ""]}));
    props.setQuestionType(true);
  }
  return (
    <div className="button-question-menu-container">
    <button className="button-main" onClick={addText}>Text</button>
    <button className="button-main" onClick={addMultipleChoice}>Multiple Choice</button>
    </div>
  )
}



function App() {
  const [questions, setQuestions] = useState([])
  const [questionType, setQuestionType] = useState(true);
  const [url, setUrl] = useState('');

  const history = useHistory();

  const selectType = () => {
    setQuestionType(false);
  }

  const handleChange = (e, index) => {
    let qs = questions;
    qs[index] = e.target.value;
    setQuestions(qs);
  }
  const handleChangeOnMultipleInput = (e, index) => {
        let qs = questions;
        qs[index] = {value: e.target.value, options: [{value:""}]};
        setQuestions(qs);
  }

  const addOption = (index, e) => {
    setQuestionType(Math.random());
    console.log(index)
    let qs = questions;
    qs[index].options.push('');
    setQuestions(qs);
  }

  return (
    <Router>
    <Switch>
    <Route path="/submitted/:id">
    <Submitted url={url}/>
    </Route>
    <Route path="/form/:id">
    <FormReady/>
    </Route>
    <Route path="/">
    <div className = "App" >
    <input className="form-name-input" type="text" name="header" form="userform" placeholder="Form name" /><
    form id = "userform"
    method = "POST"
    action = "http://localhost:3001/lol" >
    {
      questions.map((question, index) => {
        return (
        question.options ?
          ( <
          div key = {
            index
          } >
          <
          input name = {
            index
          }
          type = "text"
          onChange = {
            (e) => handleChangeOnMultipleInput(e, index)
          }
          className="question-input"
          placeholder="Question"

          />
          {question.options.map((option, i) => {
            return (
              <div key={i}>
            <OptionQuestion questions={questions} setQuestions={setQuestions} index={index} i={i} option={option}/>
        </div>)

        })}
    <button className="addoption-button" type="button" onClick={(e) => {addOption(index, e)}}> + Add option</button>
           < /
          div >
        ) :
         ( <
         div key = {
           index
         } >
         <
         input className="text-input" name = {
           index
         }
         placeholder="Question"
         type = "text"
         onChange = {
           (e) => handleChange(e, index)
         }
         value = {
           question.value
         }
         />

          < /
         div >
       ))
      })

    }  <
    /form>

    { questionType ?
        <div className="add-button-container">
    <button className="button-main" onClick = {
      selectType
    } > + New Question < /button>
    </div>
    :
    <QuestionType questions={questions} setQuestions={setQuestions} setQuestionType={setQuestionType}></QuestionType>

}

    <SubmitButton setUrl={setUrl} history={history} questions={questions}/>

    < /div >
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
