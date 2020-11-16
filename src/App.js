
import React, {
  useState, useEffect, useRef
} from 'react';
import {
  useHistory,
  useParams,
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import './App.css';
import axios from 'axios';
import * as d3 from 'd3';

const PieChart = (props) => {
  let myRef = useRef();

useEffect(() => {
 
  let answerarray = [];
props.data.answer.map(answer => {
  let alreadyExists = answerarray.filter(selected => selected.value === props.data.options[answer] )
  
  if(answerarray.length < 1) {
    answerarray.push({value: props.data.options[answer], count:1})
  } else if(alreadyExists[0]) {
    let index = answerarray.indexOf(alreadyExists[0]);
    
    answerarray[index].count += 1;
  } else {
    answerarray.push({value: props.data.options[answer], count:1})
  }
})
  const data = answerarray;
  const svg = d3.select(myRef.current);
  const width = svg.attr('width');
  const height = svg.attr('height');
  const radius = 200;



const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);
const color = d3.scaleOrdinal(["#cfe1f2","#b5d4e9","#93c3df","#6daed5","#4b97c9","#2f7ebc","#1864aa","#0a4a90","#08306b"]);

const pie = d3.pie().sort(null).value(d => d.count);

const path = d3.arc().outerRadius(radius).innerRadius(0);

const label = d3.arc().outerRadius(radius).innerRadius(radius - 30);

const pies = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');
  pies.append('path').attr('d', path).attr('fill', d => color(d.data.value));

pies.append('text')
.attr('transform', function(d) {
return `translate(${label.centroid(d)})`;})
.text(d =>{ return d.data.value + " " + d.data.count})

},[])

return (
  <div>
    <svg ref={myRef} width="400" height="400"></svg>
    </div>
)


}

const Answers = (props) => {
   let { id } = useParams();
   const [header, setHeader] = useState('');
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/forms/getFormAnswers", {
      params: {
        url: id
      }
    }).then((formdata)=> {
      console.log(formdata.data);
      setHeader(formdata.data.header);
      setAnswers(formdata.data.answers);
    })
  }, [])

  return (
    <div className="App">
     
      <h1>{header}</h1>
    {
      
      answers.length !== 0 ?
      answers.map((answerObject) => {
       return !answerObject.options ? 
        (
          <div className="answer-container">
            <h2>{answerObject.question}</h2>
            {answerObject.answer.map(answerr => {
              return (
              <p className="single-answer" key={answerr}>{answerr}</p>
              )
            })}
          </div>
        ) :
        (
          <div>
        <h2>{answerObject.question}</h2>
        <PieChart data={answerObject}></PieChart>
        </div>
        )
      }

    ):
    (
      <h1>You dont have any responses yet! </h1>
    )
  }
    </div>
  )
}

const SubmitButton = (props) => {

  const history = useHistory();
  const changeRoute = (url) => {
    console.log(url)
    props.setUrl(url);
    history.push('/submitted/' + url);
  }

  return (
    <div>
        <button className="submit-button" onClick={()=> {axios.post("http://localhost:3001/forms/newForm", {questions: props.questions, header: props.header}).then((url) => changeRoute(url.data))}} > Submit </button>
    </div>
  )
}

const AnswersSubmitted = (props) => {


  return (
    <div className="App">
    <h1>Thanks for answering our survey!</h1>

    </div>
  )
}


const Submitted = (props) => {

  return (
    <div className="App">
    <h1>Your survey has been created!</h1>
    <p>You can now share your survey by sharing this link:
     </p>
     <Link to={'/form/' + props.url}>{'http://localhost:3001/form/' + props.url}</Link>
     <p>You can see the survey results by following this link: </p>
     <Link to={'/answers/' + props.url}>{'http://localhost:3000/answers/' + props.url} </Link>
    </div>
  )
}

const FormReady = (props) =>{
     let { id } = useParams();
       const history = useHistory();
     const [questions, setQuestions] = useState([]);
     const [header, setHeader] = useState('')
     const [answers, setAnswers] = useState([{}]);

     const handleTyping = (e, index, question) => {
       e.preventDefault();
       console.log(index, question, e)
         let qis = questions;
        qis[index] = {question : question, answer: e.target.value};
         setAnswers(qis);
     }

     const submitAnswers = () => {
       axios.post("http://localhost:3001/forms/newAnswers", {
         answers,
         url: id
       } ).then(() => {history.push("/answered")})
     }

     const handleRadioClick = (index, i, option) => {
       let qs = questions;
       qs[index].question = option;
       qs[index].answer = i;
       setAnswers(qs);
     }

     useEffect(() => {
       axios.get("http://localhost:3001/forms/getForm", {
         params: {
           urlParam: id
         }
       }).then((formdata)=> {
         console.log(formdata.data);
         setQuestions(formdata.data.questions);
         setHeader(formdata.data.header);
         setAnswers(formdata.data.questions);
       })
     }, [])


   return (
    <div className="App">
    <h1>{header}</h1>
      <form id="form-answers">
    {
      questions.map((question, index) => {
        return question.value ?
         (
          <div key={question.value}>
          <p>{question.value}</p>
          {question.options.map((option, i) => {
            return (
              <div key={option}>
                  <label htmlFor={option}>
              <input type="radio" value={option} id={option} onClick={() => {handleRadioClick(index, i, question.value)}} name={question.value}/>
              {option}
              </label>
              </div>
            )
          })}
          </div>
        ) :
          (
          <div key={question}>
          <label htmlFor={question}> {question}  </label>
          <input className="answer-form-input" id={question} placeholder="Your answer.." onChange={(e)=> {handleTyping(e, index, question)}} type="text"/>

          </div>
        )

      }
    )
    }
    <button className="submit-button" type="button" onClick={submitAnswers}>Submit</button>
      </form>
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
    <div className="option-div" key={props.option.value}>
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
  const [questions, setQuestions] = useState([{header:""}])
  const [header, setHeader] = useState('');
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

  const headerChange =  (e) => {
           setHeader(e.target.value);
  }

  return (
    <Router>
    <Switch>
    <Route path="/submitted/:id">
    <Submitted url={url}/>
    </Route>
    <Route path="/answers/:id">
    <Answers/>
    </Route>
    <Route exact path="/answered">
    <AnswersSubmitted/>
    </Route>
    <Route path="/form/:id">
    <FormReady/>
    </Route>
    <Route exact path="/">
    <div className = "App" >
  <
    form id = "userform"
    method = "POST"
    action = "http://localhost:3001/lol" >
      <input className="form-name-input" type="text" name="header" form="userform" placeholder="Form name" onChange={(e) => {headerChange(e)}} />
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

    <SubmitButton setUrl={setUrl} history={history} header={header} questions={questions}/>

    < /div >
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
