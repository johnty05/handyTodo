import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
    // const todoItems = [
    //   {
    //     id: 1,
    //     workname: "Web Developement",
    //     description: "Creating a webapp for todo list",
    //     complete: false
    // },
    // {
    //     id: 2,
    //     workname: "Bath daily",
    //     description: "Regularly take a bath , no matter what!!",
    //     complete: true
    // },
    // ];
    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          viewComplete: false,
          activeItem: {
            workname: "",
            description: "",
            complete: false
          },
          todoList: []
        };
      }
      componentDidMount() {
        this.refreshList();
      }
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/todos/")
          .then(res => this.setState({ todoList: res.data }))
          .catch(err => console.log(err));
      };
      displayComplete = status => {
        if (status) {
          return this.setState({ viewComplete: true });
        }
        return this.setState({ viewComplete: false });
      };
      renderTabList = () => {
        return (
          <div className="my-5 tab-list">
            <span
              onClick={() => this.displayComplete(true)}
              className={this.state.viewComplete ? "active" : ""}
            >
              COMPLETED
            </span>
            <span
              onClick={() => this.displayComplete(false)}
              className={this.state.viewComplete ? "" : "active"}
            >
              WILL DO IT
            </span>
          </div>
        );
      };
      renderItems = () => {
        const { viewComplete } = this.state;
        const newItems = this.state.todoList.filter(
          item => item.complete === viewComplete
        );
        return newItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`todo-workname mr-2 ${
                this.state.viewComplete ? "complete-todo" : ""
              }`}
              workname={item.description}
            >
              {item.workname}
            </span>
            <span>
              <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                {" "}
                MODIFY{" "}
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                REMOVE{" "}
              </button>
            </span>
          </li>
        ));
      };
      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };
      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`http://localhost:8000/api/todos/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/todos/", item)
          .then(res => this.refreshList());
      };
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/todos/${item.id}`)
          .then(res => this.refreshList());
      };
      createItem = () => {
        const item = { workname: "", description: "", complete: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      render() {
        return (
          <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">SAURAV's TODO</h1>
            <div className="row ">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="">
                    <button onClick={this.createItem} className="btn btn-primary">
                      Add task
                    </button>
                  </div>
                  {this.renderTabList()}
                  <ul className="list-group list-group-flush">
                    {this.renderItems()}
                  </ul>
                </div>
              </div>
            </div>
            {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
          </main>
        );
      }
    }
    export default App;
