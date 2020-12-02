import React, { useContext, useEffect, useState } from 'react';
import Service from "./Service";
import MyContext from "./Context";
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function List() {
    let context = useContext(MyContext);
    let history = useHistory();
    let [list, setList] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setList(context);
        }, 1000);

        // Service.getList()
        // .then(res => {
        //     console.log(res);
        // })
    }, []);

    let editUserDetails = (id) => {
        history.push("/task-form/" + id)
    };

    let deleteUserDetails = (index) => {
        let wantToDelete = window.confirm("Are sure for this operation ?");
        if (wantToDelete) {
            context.splice(index, 1);

            setTimeout(() => {
                setList([...context]);
                toast.success("Entry deleted.")
            }, 1000);
        }
    }

    return <div>
        <table className="table table-striped table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th style={{ textAlign: "center" }}>#</th>
                    <th>Message</th>
                    <th>DueDate</th>
                    <th>Priority</th>
                    <th>Assign To</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((item, index) => <tr>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td>{item.message}</td>
                        <td>{moment(new Date(item.dueDate)).format("DD-MM-YYYY")}</td>
                        <td>{item.priority}</td>
                        <td>{item.assignedTo.name}</td>
                        <td style={{ textAlign: "center" }}>
                            <button type="button" class="btn btn-primary btn-sm"
                                onClick={() => editUserDetails(item.id)}>
                                Edit
                            </button>
                            &nbsp;
                            <button type="button" class="btn btn-danger btn-sm"
                                onClick={() => deleteUserDetails(index)}>
                                Delete
                            </button>
                        </td>
                    </tr>)
                }
                {
                    list.length == 0 && <tr>
                        <td colSpan={9} style={{textAlign: "center"}}>No Task Added</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>;
}

export default List;