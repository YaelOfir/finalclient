import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import classes from "../../Styles/tests/NewTest.module.css";
import SelectedQuestions from "../Question/SelectedQuestions";
import api from "../../API/testApi";
import qApi from "../../API/questionApi";
import { useForm } from "react-hook-form";

function NewTestPage() {
  const initialState = {
    title: "",
    topic: "",
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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
  const onSubmit = () => {
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
      <form className={classes.scroll} onSubmit={handleSubmit(onSubmit)}>
        <h1>Create a new Test</h1>
        <div className={classes.content}>
          <h3 className={classes.control}> Test Title</h3>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handlerInputChange}
            {...register("title", {
              required: "Please enter title",
              message: "Please enter title",
            })}
          />
          {errors.title && errors.title.message}
        </div>
        <div className={classes.content}>
          <h3 className={classes.control}> Topic </h3>
          <input
            name="topic"
            type="text"
            id="topic"
            onChange={handlerInputChange}
            {...register("topic", {
              required: "Please enter a topic",
              message: "Please enter a topic",
            })}
          />
          {errors.topic && errors.topic.message}
        </div>
        <div>
          <p>Show Answers at the end of the Test</p>
          <input
            checked={testState.showAnswer}
            onChange={showAnswer}
            type="checkbox"
            placeholder="Show Answers at the end of the Test"
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
        <div className={classes.control}>
          <h3 className={classes.control}>Passed Message</h3>
          <input
            name="textSucceeded"
            id="textSucceeded"
            onChange={handlerInputChange}
            {...register("textSucceeded", {
              required: "required field",
              message: "required field",
            })}
          />
          {errors.textSucceeded && errors.textSucceeded.message}
        </div>
        <div className={classes.control}>
          <h3 className={classes.control}>Failed Message</h3>
          <input
            name="textFailed"
            id="textFailed"
            onChange={handlerInputChange}
            {...register("textFailed", {
              required: "required field",
              message: "required field",
            })}
          />
          {errors.textFailed && errors.textFailed.message}
        </div>
        <div className={classes.content}>
          <h3 className={classes.control}>Test Time</h3>
          <input
            name="time"
            type="time"
            id="time"
            onChange={handlerInputChange}
            {...register("time", {
              required: "required field",
              message: "required field",
            })}
          />
          {errors.time && errors.time.message}
        </div>

        <div>
          Questions:
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
