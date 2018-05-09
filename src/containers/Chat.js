import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      id: ""
    };
    this.quickadd = "Quick Add";
  }

  componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  // Get the id of the logged in user
  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current"
      })
      .then(response => {
        this.user = response.data;
        this.setState({
          userId: response.data
        });
      })
      .catch(error => {
        // User is not logged in
        window.location.href = "http://localhost:3000/signin";
      });
  }
  // Logout and reset the cookie session
  onLogout() {
    axios
      .request({
        method: "get",
        url: "/api/auth/logout"
      })
      .then(response => {
        console.log(response.data);
        window.location = "http://localhost:3000/";
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <ProjectNav
          quickadd="Quick Add"
          sidebar={true}
          details={true}
          onLogout={this.onLogout.bind(this)}
          id={this.state.id}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Chat" />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-8 m-auto" />
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

Chat.propTypes = {};

export default Chat;
