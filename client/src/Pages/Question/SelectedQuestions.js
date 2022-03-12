import React, { useState, useEffect } from "react";
import classes from "../../Styles/questions/Questions.module.css";
import api from "../../API/questionApi";
const SelectedQuestions = (props) => {
  const [questionList, setQuestionList] = useState([]);
  const [selectedQ, setSelectedQ] = useState([]);

  useEffect(() => {
    api.get("/list").then((response) => {
      setQuestionList(response.data);
    });
  }, []);
  const isButtonSelected = (value) => {
    if (questionList === value) {
      return true;
    }
  };

  const handleChange = (e) => {
    if (selectedQ.includes(e.target.value)) {
      return;
    } else {
      let tmp = selectedQ;
      tmp.push(e.target.value);

      setSelectedQ(tmp);
      props.handleList(tmp);
    }
  };

  return (
    <div>
      <div>
        <div>
          {questionList.map((item) => {
            return (
              <div className={classes.content}>
                <input
                  type="checkbox"
                  key={item.id}
                  value={item.id}
                  className={classes.item}
                  onChange={handleChange}
                  checked={isButtonSelected("")}
                />
                {item.questionName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectedQuestions;
