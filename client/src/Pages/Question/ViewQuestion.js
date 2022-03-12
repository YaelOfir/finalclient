import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../API/questionApi";
import classes from "../../Styles/questions/Questions.module.css";
const ViewQuestion = () => {
  const [question, setQuestion] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleQuestion(id);
    }
  }, [id]);

  const getSingleQuestion = async (id) => {
    const response = await api.get(`/question/${id}`);
    if (response.status === 200) {
      setQuestion({ ...response.data[0] });
    }
  };

  return (
    <div className={classes.content}>
      <h3>Question Id:</h3>
      <p>{id}</p>
      <h3>Question:</h3>
      <p>{question && question.questionName}</p>
      <h3>Answers:</h3>
      <p>{question && question.answers}</p>
      <h3>CorrectAnswer:</h3>
      <p>{question && question.correctAnswer}</p>

      <Link to="/all-questions">
        <button className={classes.item}>Go Back</button>
      </Link>
    </div>
  );
};

export default ViewQuestion;
