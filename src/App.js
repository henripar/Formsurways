
import React, {
  useState
} from 'react'
import './App.css';

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

  return ( <
    div className = "App" >
    <input className="form-name-input" type="text" placeholder="Form name" /><
    form id = "userform"
    method = "POST"
    action = "http://localhost:3000/lol" >
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
    <button className="addoption-button " type="button" onClick={(e) => {addOption(index, e)}}> + Add option</button>
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

    <
    button className="submit-button" onClick={()=> {console.log(questions)}} > Submit < /button>


    < /div >
  );
}

export default App;
