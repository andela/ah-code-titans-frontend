import React from "react";
import { Container, Divider } from "semantic-ui-react";
import GetRates from "../containers/rating/GetRates";
import RateArticle from "../containers/rating/RateArticle";

const SingleArticle = props => (
  <div>
    <br />
    <Container textAlign="center"><b>How to train your dragon</b></Container>
    <Container textAlign="right"><GetRates /></Container>
    <Container textAlign="justified">
      <b>Justified</b>
      <Divider />
      <p>
          Lorem ipsum dolor sit amet, consectetuer
          adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa strong. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
          pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
          Aenean vulputate eleifend tellus.
           Aenean leo ligula, porttitor eu, consequat vitae, eleifend
          ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
           tellus. Phasellus viverra
          nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
          augue. Curabitur ullamcorper ultricies nisi.
      </p>
      <p>
          Lorem ipsum dolor sit amet,
          consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes,
           nascetur
          ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
           justo. Nullam dictum felis eu
          pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
          Aenean vulputate eleifend tellus. Aenean leo ligula,
           porttitor eu, consequat vitae, eleifend
          ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
           tellus. Phasellus viverra
          nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
          augue. Curabitur ullamcorper ultricies nisi.
      </p>
    </Container>
    <br />
    <Container textAlign="left"><b>Rate article:</b></Container>
    <Container textAlign="left"><RateArticle /></Container>
  </div>
);

export default SingleArticle;
