import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import { accessToken, User } from "../helpers/helperFunc";
import { useLocation } from "react-router-dom";


const state = { comment: "" };
const Comment = (props: any) => {
  const [data, setData] = useState(state);
  const [comments, setComment] = useState([]);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const location = useLocation();
  const link = location.pathname;
  const index = link.lastIndexOf("/") + 1;
  const requestId = link.toString().slice(index);
interface decoder{
  email: string
// exp: 1620507140
// iat: 1620503540
isAdmin: boolean
isAgent: boolean
name: string
_id: string
}
  let decoded: decoder= jwt_decode(accessToken);
  console.log(decoded)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const apiUrl = `http://localhost:3000/comment/${requestId}`;
    fetch(apiUrl, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => swal("Done", data.message, "Success"));
    window.location.reload();
  };

  const getComment = async () => {
    try {
      let response = await fetch(`http://localhost:3000/comment/${requestId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.json();
    } catch (err) {
      console.error(err);
    }
  };
console.log("beautifulname")
  useEffect(async ():any => {
    let commentdatas = await getComment();
    console.log(commentdatas, "jjjjjjjjjj");
    setComment(commentdatas);
  }, []);
  // : Promise<React.EffectCallback> | any

  let user = decoded._id;
  let isAdminBool = decoded.isAdmin;

  const commentData: any = comments?.data?.map((item:any) => {
    return (
      <div className="comment-section">
        <li className="comment-wrapper">
          <div className="comment2">
            <h5 className="ownerComment">
              <span className="initialComments">{User(decoded.name)}</span>{" "}
              {decoded.name}
            </h5>

            <p className="comments">
              <i className="fas fa-comment"></i> {item?.comment}
            </p>
          </div>
        </li>
      </div>
    );
  });

  return (
    <div className="commentSection">
      <Card bg="white" style={{ width: "65rem" }}>
        <Card.Header
          style={{
            background: "rgb(40,41,64)",
            color: "#fff",
            padding: "2.5rem 0rem",
            textAlign: "center",
            fontSize: "1.7rem",
          }}
        >
          <b>Comments</b>
        </Card.Header>
        <Card.Body
          style={{
            background: "#fff",
            paddingBottom: "70px",
          }}
        >
          <div className="flexComment">
            <Form action="" onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ paddingTop: "20px" }}></Form.Label>
                <Form.Control
                  name="comment"
                  value={data.comment}
                  onChange={handleChange}
                  as="textarea"
                  rows={2}
                  className="comment-sect"
                  placeholder="Write a comment..."
                />
              </Form.Group>
              <Button
                style={{
                  display: "block",
                  marginTop: "9px",
                  fontSize: "17px",
                  background: "#262737",
                  borderRadius: "5px",
                }}
                type="submit"
              >
                Comment
              </Button>
            </Form>
            <div className="otherComments">
              <ul className="cap">{commentData}</ul>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Comment;
