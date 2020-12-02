import React, { useEffect, useRef, useState, useContext } from 'react';
import Service from "./Service";
import { toast } from 'react-toastify';
import MyContext from "./Context";
import { useParams, useHistory } from 'react-router-dom';

function TaskForm() {
    let [users, setUsers] = useState([]);
    let message = useRef();
    let dueDate = useRef();
    let priority = useRef();
    let assignedTo = useRef();
    let context = useContext(MyContext);
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        Service.getUsers()
            .then(res => {
                if (res.data.status == "error") {
                    return toast.error(res.data.error);
                }
                setUsers(res.data.users);

                if (id > 0) {
                    context.forEach(item => {
                        if (item.id == id) {
                            message.current.value = item.message;
                            dueDate.current.value = item.dueDate;
                            priority.current.value = item.priority;
                            assignedTo.current.value = item.assignedTo.id;
                        }
                    })
                }
            }).catch(err => {
                return toast.error(err.data.error);
                console.error(err);
            });


    }, []);

    let submitHandler = () => {
        let useDetails = {
            id: Number.parseInt(Math.random() * Math.pow(10, 16)),
            message: message.current.value,
            dueDate: dueDate.current.value,
            priority: priority.current.value,
            assignedTo: users.filter(item => item.id == assignedTo.current.value)[0]
        }

        setTimeout(() => {
            if (id > 0) {
                for (let i = 0; i < context.length; i++) {
                    if (id == context[i].id) {
                        context[i] = useDetails;
                        toast.success("Details updated.")
                        break;
                    }
                }

            } else {
                context.push(useDetails);
                toast.success("Details added.")
            }

            history.push("/list");
        }, 2500);

        // Service.addTask(useDetails)
        //     .then(res => {
        //         console.log(res);
        //         if (res.data.status == "error") {
        //             return toast.error(res.data.error);
        //         }
        //     }).catch(err => {
        //         toast.error(err.data.error);
        //         console.error(err);
        //     })
    }

    return <div className="task-form">
        <table>
            <tbody>
                <tr>
                    <td>Message <span style={{ color: "red" }}>*</span></td>
                    <td>
                        <textarea ref={message}
                            className="form-control" autoFocus={true}></textarea>
                    </td>
                </tr>
                <tr>
                    <td>Due Date</td>
                    <td>
                        <input ref={dueDate} className="form-control" type="date" />
                    </td>
                </tr>
                <tr>
                    <td>Priority</td>
                    <td>
                        <select className="form-control" ref={priority}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Assign To</td>
                    <td>
                        <select className="form-control" ref={assignedTo}>
                            {
                                users.map(user => <option
                                    key={user.id}
                                    value={user.id}>
                                    {user.name}
                                </option>)
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colSpan={10}>
                        <div style={{ textAlign: "center" }}>
                            <hr></hr>
                            <button className="btn btn-primary"
                                onClick={submitHandler}>
                                Submit
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>;
}

export default TaskForm;