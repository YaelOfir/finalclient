import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import classes from "../../Styles/tests/Test.module.css";
import api from "../../API/testApi";
function ListOfTests() {
  const [testList, setTestList] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await api.get("/list");
        setTestList(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchTests();
  }, []);

  return (
    <div className={classes.scroll}>
      <meta name="" content="width-device-widtch, initial-scale=1.0" />
      <div>
        <Link to={`/add-test`}>
          <button className={classes.actions}>Add Test</button>
        </Link>
      </div>
      <input
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div>
        <div>
          {testList
            .filter((item) => {
              if (search == "") {
                return item;
              } else if (
                item.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => {
              return (
                <div className={classes.item}>
                  <Card key={index}>
                    <div className={classes.content}>
                      <h4>Test Name: {item.title}</h4>
                      <h4>Id: {item.id}</h4>
                      <p>Topic: {item.topic}</p>
                      <p>NoteToPass: {item.noteToPass}</p>
                      <p>showAnswer: {item.showAnswer}</p>
                    </div>
                    <div className={classes.actions}>
                      <Link to={`/view-test/${item.id}`}>
                        <button>View</button>
                      </Link>
                      <Link to={`/edit-test/${item.id}`}>
                        <button>Edit</button>
                      </Link>
                      <Link to={`/take-test/${item.id}`}>
                        <button>TakeTest</button>
                      </Link>
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ListOfTests;
