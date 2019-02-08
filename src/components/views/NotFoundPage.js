import React from "react";
import "../../assets/style/articles/style.scss";
import { Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div id="main-fof">
      <div className="fof">
        <h1>Error 404</h1>
        <Divider />
        <h3>Page Not Found</h3>
        <Link to="/">
          <Button color="primary inverted">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
