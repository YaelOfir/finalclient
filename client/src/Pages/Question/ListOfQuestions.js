import React, { useState, useEffect } from "react";
import api from "../../API/questionApi";
import { Link } from "react-router-dom";
import QuestionCard from "../../Components/Card/Card";
import classes from "../../Styles/questions/Questions.module.css";

function Question() {
  const [search, setSearch] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    api.get("/list").then((response) => {
      setQuestionList(response.data);
    });
  }, []);
  return (
    <div className={classes.scroll}>
      <td>
        <Link to={`/add-question`}>
          <button className={classes.actions}>Add Question</button>
        </Link>
      </td>

      <input
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div>
        <div>
          {questionList
            .filter((item) => {
              if (search == "") {
                return item;
              } else if (
                item.questionName.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => {
              return (
                <div className={classes.item}>
                  <QuestionCard key={index}>
                    <div className={classes.content}>
                      <h4>Question Name: {item.questionName}</h4>
                      <h4>Id: {index + 1}</h4>
                      <p>answers: {item.answers}</p>
                      <p>correctAnswer: {item.correctAnswer}</p>
                      <p>{item.datetime}</p>
                    </div>
                    <div className={classes.actions}>
                      <Link to={`/editQuestion/${item.id}`}>
                        <button>Edit</button>
                      </Link>
                      <Link to={`/view-question/${item.id}`}>
                        <button>View</button>
                      </Link>
                    </div>
                  </QuestionCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Question;
