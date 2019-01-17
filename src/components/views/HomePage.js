import React from "react";

class HomePage extends React.Component {
  componentDidMount() {
    const userData = {
      user: {
        email: "dennismacharia4747@gmail.com",
        password: "@Codetitans47"
      }
    };

    axios.post("/api/users/login", userData).then(res => {
      // Save to localStorage
      const token = res.data.user.token;
      const username = res.data.user.username;
      // Set token to ls
      localStorage.setItem("jwtToken", token);

      localStorage.setItem("username", username);

      setAuthorizationHeader(token);
    });
  }

  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <Link to="/profile">
          <Button>Profile</Button>
        </Link>
      </div>
    );
  }
}
