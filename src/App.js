
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

import Frontpage from "./Frontpage.js";

const PieChart = (props) => {
  let myRef = useRef();

  useEffect(() => {

    let answerarray = [];
    props.data.answer.map(answer => {
      let alreadyExists = answerarray.filter(selected => selected.value === props.data.options[answer])

      if (answerarray.length < 1) {
        answerarray.push({ value: props.data.options[answer], count: 1 })
      } else if (alreadyExists[0]) {
        let index = answerarray.indexOf(alreadyExists[0]);

        answerarray[index].count += 1;
      } else {
        answerarray.push({ value: props.data.options[answer], count: 1 })
      }
    })
    const data = answerarray;
    const svg = d3.select(myRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const radius = 200;



    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
    const color = d3.scaleOrdinal(["#cfe1f2", "#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebc", "#1864aa", "#0a4a90", "#08306b"]);

    const pie = d3.pie().sort(null).value(d => d.count);

    const path = d3.arc().outerRadius(radius).innerRadius(0);

    const label = d3.arc().outerRadius(radius).innerRadius(radius - 30);

    const pies = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');
    pies.append('path').attr('d', path).attr('fill', d => color(d.data.value));

    pies.append('text')
      .attr('transform', function (d) {
        return `translate(${label.centroid(d)})`;
      })
      .text(d => { return d.data.value + " " + d.data.count })

  }, [])

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
    axios.get(`${process.env.REACT_APP_API_URL}/forms/getFormAnswers`, {
      params: {
        url: id
      }
    }).then((formdata) => {
      console.log(formdata.data);
      setHeader(formdata.data.header);
      setAnswers(formdata.data.answers);
    })
  }, [])

  return (

    <div className="App">

      <h1 className="survey-header">{header}</h1>
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

          ) :
          (
            <h1 className="survey-header">You dont have any responses yet! </h1>
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
      <button className="submit-button" onClick={() => { axios.post(`${process.env.REACT_APP_API_URL}/forms/newForm`, { questions: props.questions, header: props.header }).then((url) => changeRoute(url.data)) }} > Submit </button>
    </div>
  )
}

const AnswersSubmitted = (props) => {


  return (
    <div className="App">
      <h1 className="survey-header">Thanks for answering our survey!</h1>

    </div>
  )
}


const Submitted = (props) => {
  const history = useHistory('');
  const [showCopied, setShowcopied] = useState(false);
  const [showCopied2, setShowcopied2] = useState(false);

  const share = (url) => {
    navigator.clipboard.writeText(`https://henripar.github.io/Formsurways/form/${url}`);
    setShowcopied(true);
    setTimeout((() => {
      setShowcopied(false);
    }), 3000)
  }

  const seeResults = (url) => {
    navigator.clipboard.writeText(`${process.env.PUBLIC_URL}/answers/${url}`);
    setShowcopied2(true);
    setTimeout((() => {
      setShowcopied2(false);
    }), 3000)
  }

  return (
    <div className="App">
      <div className="center-text">
        <h1>Your survey has been created!</h1>
        <p>Share your survey and see the answers.</p>

        <p>You can now share your survey by sharing this link:
     </p>
        <div className="link-container">
          {showCopied == true ?
            (

              <p>Link Copied!</p>

            ) :

            <p>{'https://henripar.github.io/Formsurway/form/' + props.url}</p>

          }


          <svg aria-label="Copy link" onClick={() => { share(props.url) }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><title>Copy link!</title><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </div>

        {/* <Link to={'/form/' + props.url}>{'http://localhost:3000/form/' + props.url}</Link> */}
        <p>You can see the survey results by following this link: </p>

        <div className="link-container">
          {showCopied2 == true ?
            (

              <p>Link Copied!</p>

            ) :

            <p>{'https://henripar.github.io/Formsurway/answers/' + props.url}</p>

          }

          <svg onClick={() => { seeResults(props.url) }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><title>Copy link!</title><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>

          <svg onClick={() => history.push('/answers/' + props.url)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right" className="arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    </div>
  )
}

const FormReady = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [header, setHeader] = useState('')
  const [answers, setAnswers] = useState([{}]);

  const handleTyping = (e, index, question) => {
    e.preventDefault();
    console.log(index, question, e)
    let qis = questions;
    qis[index] = { question: question, answer: e.target.value };
    setAnswers(qis);
  }

  const submitAnswers = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/forms/newAnswers`, {
      answers,
      url: id
    }).then(() => { history.push("/answered") })
  }

  const handleRadioClick = (index, i, option) => {
    let qs = questions;
    qs[index].question = option;
    qs[index].answer = i;
    setAnswers(qs);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/forms/getForm`, {
      params: {
        urlParam: id
      }
    }).then((formdata) => {
      console.log(formdata.data);
      setQuestions(formdata.data.questions);
      setHeader(formdata.data.header);
      setAnswers(formdata.data.questions);
    })
  }, [])


  return (
    <div className="App">
      <h1 className="survey-header">{header}</h1>
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
                          <input type="radio" value={option} id={option} onClick={() => { handleRadioClick(index, i, question.value) }} name={question.value} />
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
                  <input className="answer-form-input" id={question} placeholder="Your answer.." onChange={(e) => { handleTyping(e, index, question) }} type="text" />

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


const OptionQuestion = (props) => {
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
      <input readOnly name="hep" type="radio" disabled />
      <input type="text" name={options} value={options} onChange={(e) => handleOptionChange(e, props.index, props.i)} placeholder={"Option " + (props.i + 1)} />

    </div>
  )
}
const QuestionType = (props) => {
  const addText = () => {
    props.setQuestions(props.questions.concat(""));
    props.setQuestionType(true);
  }
  const addMultipleChoice = () => {
    props.setQuestions(props.questions.concat({ value: "", options: ["", ""] }));
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
  const [questions, setQuestions] = useState([{ header: "" }])
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
    qs[index] = { value: e.target.value, options: [{ value: "" }] };
    setQuestions(qs);
  }

  const addOption = (index, e) => {
    setQuestionType(Math.random());
    console.log(index)
    let qs = questions;
    qs[index].options.push('');
    setQuestions(qs);
  }

  const headerChange = (e) => {
    setHeader(e.target.value);
  }

  return (

    <Router>
      <Switch>
        <Route path="/submitted/:id">
          <header>
            <h1 className="logo-big">Form<span className="logo-small">survway</span></h1>
          </header>
          <Submitted url={url} />
        </Route>
        <Route path="/answers/:id">
          <header>
            <h1 className="logo-big">Form<span className="logo-small">survway</span></h1>
          </header>
          <Answers />
        </Route>
        <Route exact path="/answered">
          <header>
            <h1 className="logo-big">Form<span className="logo-small">survway</span></h1>
          </header>
          <AnswersSubmitted />
        </Route>
        <Route path="/form/:id">
          <header>
            <h1 className="logo-big">Form<span className="logo-small">survway</span></h1>
          </header>
          <FormReady />
        </Route>
        <Route path="/frontpage">
          <Frontpage></Frontpage>
        </Route>
        <Route exact path="/">
          <header>
            <h1 className="logo-big">Form<span className="logo-small">survway</span></h1>
          </header>
          <div className="App" >
            <form id="userform" >
              <input className="form-name-input" type="text" name="header" form="userform" placeholder="Form name" onChange={(e) => { headerChange(e) }} />
              {
                questions.map((question, index) => {
                  return (
                    question.options ?
                      (<
                        div key={
                          index
                        } >
                        <
                          input name={
                            index
                          }
                          type="text"
                          onChange={
                            (e) => handleChangeOnMultipleInput(e, index)
                          }
                          className="question-input"
                          placeholder="Question"

                        />
                        {question.options.map((option, i) => {
                          return (
                            <div key={i}>
                              <OptionQuestion questions={questions} setQuestions={setQuestions} index={index} i={i} option={option} />
                            </div>)

                        })}
                        <button className="addoption-button" type="button" onClick={(e) => { addOption(index, e) }}> + Add option</button>
                      </div>
                      ) :
                      (<
                        div key={
                          index
                        } >
                        <
                          input className="text-input" name={
                            index
                          }
                          placeholder="Question"
                          type="text"
                          onChange={
                            (e) => handleChange(e, index)
                          }
                          value={
                            question.value
                          }
                        />

                      </div >
                      ))
                })

              }  </form>

            {questionType ?
              <div className="add-button-container">
                <button className="button-main" onClick={
                  selectType
                } > + New Question </button>
              </div>
              :
              <QuestionType questions={questions} setQuestions={setQuestions} setQuestionType={setQuestionType}></QuestionType>

            }

            <SubmitButton setUrl={setUrl} history={history} header={header} questions={questions} />

          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
