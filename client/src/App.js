import { Route, Switch } from "react-router-dom";
import React from "react";
import Layout from "./Components/Layout/Layout";
import ListOfTests from "./Pages/Test/ListOfTests";
import AddTest from "./Pages/Test/AddTest";
import ViewTest from "./Pages/Test/ViewTest";
import TakeTest from "./Pages/Test/TakeTest";
import Dashboard from "./Pages/Admin/Dashboard";
import Login from "./Pages/Admin/Login";
import useToken from "./Helpers/useToken";
import AddQuestion from "./Pages/Question/AddQuestion";
import ListOfQuestions from "./Pages/Question/ListOfQuestions";
import ViewQuestion from "./Pages/Question/ViewQuestion";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/add-test">
          <AddTest />
        </Route>
        <Route path="/edit-test">
          <AddTest />
        </Route>
        <Route path="/all-tests">
          <ListOfTests />
        </Route>
        <Route path="/view-test">
          <ViewTest />
        </Route>
        <Route path="/take-test">
          <TakeTest />
        </Route>
        <Route path="/add-question">
          <AddQuestion />
        </Route>
        <Route path="/all-questions">
          <ListOfQuestions />
        </Route>
        <Route path="/view-question">
          <ViewQuestion />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
