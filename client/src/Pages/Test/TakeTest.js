import React, { useEffect, useState } from "react";
import api from "../../API/testApi";
import { useParams, Link } from "react-router-dom";
import classes from "../../Styles/tests/Test.module.css";
function TakeTest() {
  const [takenTest, setTakenTest] = useState(null);

  const { id } = useParams();

  const selectedTest = async (id) => {
    const response = await api.get(`/test/${id}`);
    if (response.status === 200) {
      setTakenTest({ ...response[0].data }).then(console.log(response));
    }
  };

  useEffect(() => {
    if (id) {
      selectedTest(id);
    }
  }, [id]);

  return <div className={classes.content}>{takenTest}</div>;
}

export default TakeTest;
