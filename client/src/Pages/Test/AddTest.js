import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import classes from "../../Styles/tests/NewTest.module.css";
import SelectedQuestions from "../Question/SelectedQuestions";
import api from "../../API/testApi";
import qApi from "../../API/questionApi";
function NewTestPage() {
  const initialState = {
    title: "",
    topics: ["Math", "Science", "Technology", "Sports", "History", "Misc"],
    topicVal: "Math",
    questions: [],
    noteToPass: false,
    showAnswer: false,
    textSucceeded: "",
    textFailed: "",
    time: "",
  };

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getTestId(id);
    }
  }, [id]);

  const [testState, setTestState] = useState(initialState);
  const [selected, setSelected] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  const handleRadio = (e) => {
    setSelected(JSON.parse(e.target.value));
    console.log(selected);
  };

  const getTestId = async (id) => {
    const response = await api.get(`/test/${id}`);
    if (response.status === 200) {
      setTestState(...response.data[0]);
    }
  };

  const setSelectedQuestion = (item) => {
    setSelected(item);
  };

  const editTest = async (data, id) => {
    const response = await api.put(`/editTest/${id}`, data);
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    qApi.get("/list").then((response) => {
      setQuestionList(response.data);
    });
  }, []);

  const addTest = async (data) => {
    await api.post("/add", data).then((response) => {
      setTestState(response.data);
    });
  };

  const showAnswer = (e) => {
    if (e.target.checked === true) {
      setTestState({ ...testState, showAnswer: e.target.checked });
    } else {
      setTestState({ showAnswer: false });
    }
  };

  const noteToPass = (a) => {
    if (a.target.checked === true) {
      setTestState({ ...testState, noteToPass: a.target.checked });
    } else {
      setTestState({ noteToPass: false });
    }
  };

  const handlerInputChange = (e) => {
    const datetime = format(new Date(), "dd/MM/yyy");
    setTestState({
      ...testState,
      datetime,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();

    const questionsToSend = selected.map((questionId) => {
      return questionList.find((q) => q.id === questionId);
    });
    const newTestState = { ...testState, questions: questionsToSend };
    setTestState(newTestState);
    if (!id) {
      addTest(newTestState);
    } else {
      editTest(newTestState, id);
    }
    setTimeout(() => history.push("/all-tests"), 500);
  };

  return (
    <div>
      <form className={classes.scroll} onSubmit={onSubmit}>
        <h1>Create a new Test</h1>
        <div className={classes.content}>
          <h3 className={classes.control}> Test Title</h3>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handlerInputChange}
          />
        </div>
        <select
          onChange={(e) =>
            setTestState({ ...testState, topicVal: e.target.value })
          }
        >
          {testState.topics.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div>
          <p>Show Answers at the end of the Test</p>
          <input
            checked={testState.showAnswer}
            onChange={showAnswer}
            type="checkbox"
            placeholder="Show Answers at the end of the Test"
          />
        </div>
        <div className={classes.control}>
          <h3 className={classes.control}>Passed Message</h3>
          <input
            name="textSucceeded"
            id="textSucceeded"
            onChange={handlerInputChange}
          />
        </div>
        <div className={classes.control}>
          <h3 className={classes.control}>Failed Message</h3>
          <input
            name="textFailed"
            id="textFailed"
            onChange={handlerInputChange}
          />
        </div>
        <div className={classes.content}>
          <h3 className={classes.control}>Test Time</h3>
          <input
            name="time"
            type="time"
            id="time"
            onChange={handlerInputChange}
          />
        </div>
        <div>
          <p>Show Passing Grade</p>
          <input
            checked={testState.noteToPass}
            onChange={noteToPass}
            type="checkbox"
            placeholder="Passing Grade"
          />
        </div>
        <div>
          <SelectedQuestions
            value={testState.questions}
            questionList={questionList}
            onChange={handleRadio}
            handleList={setSelectedQuestion}
          />
        </div>
        <br />
        <input type="submit" value={id ? "Edit" : "Add"} />
        <br />
        <Link to="/all-tests">
          <button className={classes.actions}>All Tests</button>
        </Link>
      </form>
    </div>
  );
}

export default NewTestPage;
