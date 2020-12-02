import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router, Route, Switch, useHistory, Link
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "Login";
import List from "./List";
import TaskForm from "./TaskForm";

function App() {
    let history = useHistory();

    let clickHandler = () => {
        history.push("/task-form");
    }

    return (
        <div className="App">
            <ToastContainer />
            <Router >
                <div className="Header">
                    <div className="menu-item">
                        <Link to="/list">
                            List
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/task-form/-1">
                            Create Task
                        </Link>
                    </div>
                </div>
                <Switch>
                    <Route path="/" exact component={List} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/list" exact component={List} />
                    <Route path="/task-form/:id" exact component={TaskForm} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
