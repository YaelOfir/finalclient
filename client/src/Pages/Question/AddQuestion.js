import React from "react";
import "../../Styles/questions/Questions.module.css";
import Dialog from "../../Components/Dialog/Dialog";
import api from "../../API/questionApi";
export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
    };
  }
  selectPrivate = (e) => {
    if (e.target.checked === true) {
      this.setState({
        mustBeSignedIn: e.target.checked,
      });
    } else {
      this.setState({ mustBeSignedIn: false });
    }
  };
  handleAddInput = () => {
    this.setState([...this.state, { answers: [] }]);
  };

  handleRemoveInput = (index) => {
    const list = [...this.state, { answers: [] }];
    list.splice(index, 1);
    this.setState(list);
  };

  addAnswer = () => {
    this.setState({
      answers: this.state.answers.concat(""),
    });
  };

  updateAnswer = (e, i) => {
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
    };
    this.setState({
      questions: this.state.questions.concat(question),
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
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
          {this.state.questions.map((ques, idx) => (
            <div className="question" key={idx}>
              <div>{ques.questionName}</div>
              <div>Correct Answer: {ques.correctAnswer}</div>
              <div>Num of answers: {ques.answers.length}</div>
              <span
                className="btn delete"
                onClick={() => this.removeQuestion(ques)}
              >
                Delete
              </span>
            </div>
          ))}

          <div className="questions">
            <div
              className="add-question"
              onClick={() => this.setState({ addQuestion: true })}
            >
              Add Question
            </div>
          </div>

          <Dialog model={this.state.addQuestion}>
            <div className="new-question-form">
              <input
                className="input"
                placeholder="Question"
                value={this.state.questionName}
                onChange={(e) =>
                  this.setState({ questionName: e.target.value })
                }
              />
              <div>Answers</div>
              {this.state.answers.map((ans, idx) => (
                <div className="answer-form" key={idx}>
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
                    onChange={(e) => this.updateAnswer(e, idx)}
                  />
                </div>
              ))}
              <div className="add-answer" onClick={this.addAnswer}>
                Add Answer
              </div>
              {/* <div>
                <input
                  type="button"
                  value="remove"
                  onClick={handleRemoveInput}
                />

                {answers.length - 1 === index && (
                  <input type="button" value="add" onClick={handleAddInput} />
                )}
              </div> */}
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
