import React, { useState } from "react";
function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const toggleEditable = (id) => {
    const row = todoList.find((t) => t.id === id);
    if (row) {
      setEditableId(id);
      setEditedTask(row.task);
      setEditedStatus(row.status);
      setEditedDeadline(row.deadline);
    } else {
      setEditableId(null);
    }
  };
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline) {
      alert("All fields are required!");
      return;
    }
    const newTodo = {
      id: Date.now(), // unique ID
      task: newTask,
      status: newStatus,
      deadline: newDeadline,
    };
    setTodoList([...todoList, newTodo]);
    setNewTask("");
    setNewStatus("");
    setNewDeadline("");
  };
  const saveEditedTask = (id) => {
    if (!editedTask || !editedStatus || !editedDeadline) {
      alert("All fields are required!");
      return;
    }
    setTodoList(
      todoList.map((item) =>
        item.id === id
          ? { ...item, task: editedTask, status: editedStatus, deadline: editedDeadline }
          : item
      )
    );
    setEditableId(null);
  };
  const deleteTask = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Todo Table */}
        <div className="col-md-7">
          <h2 className="text-center mb-3">Todo List</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todoList.length > 0 ? (
                  todoList.map((data) => (
                    <tr key={data.id}>
                      <td>
                        {editableId === data.id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        ) : (
                          data.task
                        )}
                      </td>
                      <td>
                        {editableId === data.id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          />
                        ) : (
                          data.status
                        )}
                      </td>
                      <td>
                        {editableId === data.id ? (
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={editedDeadline}
                            onChange={(e) => setEditedDeadline(e.target.value)}
                          />
                        ) : (
                          new Date(data.deadline).toLocaleString()
                        )}
                      </td>
                      <td>
                        {editableId === data.id ? (
                          <button
                            className="btn btn-success btn-sm me-1"
                            onClick={() => saveEditedTask(data.id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm me-1"
                            onClick={() => toggleEditable(data.id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(data.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No tasks available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-5">
          <h2 className="text-center mb-3">Add Task</h2>
          <form className="bg-light p-4" onSubmit={addTask}>
            <div className="mb-3">
              <label>Task</label>
              <input
                type="text"
                className="form-control"
                value={newTask}
                placeholder="Enter Task"
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Status</label>
              <input
                type="text"
                className="form-control"
                value={newStatus}
                placeholder="Enter Status"
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Deadline</label>
              <input
                type="datetime-local"
                className="form-control"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Todo;
