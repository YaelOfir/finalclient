import React from "react";
import classes from "../../Styles/questions/Questions.module.css";
import Dialog from "../../Components/Dialog/Dialog";
import api from "../../API/questionApi";
import { useForm } from "react-hook-form";

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
      topic: "",
    };
  }

  addInputAnswer = () => {
    this.setState({
      answers: this.state.answers.concat(""),
    });
  };

  addAnswer = (e, i) => {
    let newArr = Object.assign([], this.state.answers);
    newArr[i] = e.target.value;
    this.setState({
      answers: newArr,
    });
  };

  removeQuestion = (question) => {
    this.setState({
      questions: this.state.questions.filter(
        (ques) => ques.questionName !== question.questionName
      ),
    });
  };

  addTest = async (data) => {
    await api.post("/add", data).then((response) => {
      this.setState(response.data);
    });
  };

  saveQuestion = () => {
    let question = {
      answers: this.state.answers,
      correctAnswer: this.state.correctAnswer,
      questionName: this.state.questionName,
      topic: this.state.topic,
    };
    this.setState({
      questions: this.state.questions.concat(question),
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
      topic: "",
    });
    api
      .post("/add", {
        question,
      })
      .then((res) => {
        if (res.data.success) {
          this.setState(res.data);
          setTimeout(() => {}, 3000);
        }
      })
      .catch((er) => {
        console.error(er);
      });
  };

  render() {
    return (
      <div className="create-quiz-wrapper">
        <div className="main">
          {this.state.questions.map((ques, idx, topic) => (
            <div className="question" key={idx}>
              <h4>Question Prequel:</h4>
              <div>Title: {ques.questionName}</div>
              <div> Topic: {ques.topic}</div>
              <div>Correct Answer: {ques.correctAnswer}</div>
              <div>Num of answers: {ques.answers.length}</div>
              <span
                className={classes.delete}
                onClick={() => this.removeQuestion(ques)}
              >
                Clear
              </span>
            </div>
          ))}

          <div className="questions">
            <div
              className={classes.qu}
              onClick={() => this.setState({ addQuestion: true })}
            >
              Add Question
            </div>
          </div>

          <Dialog model={this.state.addQuestion}>
            <div className={"new-question-form"}>
              <input
                placeholder="Question"
                value={this.state.questionName}
                onChange={(e) =>
                  this.setState({ questionName: e.target.value })
                }
                // {...register("questionName", {
                //   required: "Please enter a topic",
                //   message: "Please enter a topic",
                // })}
              />
              {/* {errors.questionName && errors.questionName.message}{" "} */}
              <input
                placeholder="Topic"
                value={this.state.topic}
                onChange={(e) => this.setState({ topic: e.target.value })}
                // {...register("topic", {
                //   required: "Please enter a topic",
                //   message: "Please enter a topic",
                // })}
              />
              {/* {errors.topic && errors.topic.message} <h3>Answers</h3> */}
              {this.state.answers.map((ans, idx, topic) => (
                <div className="answerform" key={idx}>
                  <input
                    type="radio"
                    value={this.state.ans}
                    onChange={(e) => this.setState({ correctAnswer: ans })}
                    name="answer"
                  />{" "}
                  <input
                    className="input"
                    type="text"
                    placeholder="Answer"
                    value={this.state.answers[idx]}
                    onChange={(e) => this.addAnswer(e, idx)}
                  />
                </div>
              ))}
              <div className={classes.addAnswer} onClick={this.addInputAnswer}>
                Add Answer
              </div>
              <div className="btn-wrapper">
                <div
                  className="btn"
                  onClick={() => this.setState({ addQuestion: false })}
                >
                  Close
                </div>
                <div className="btn" onClick={this.saveQuestion}>
                  Save
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}
