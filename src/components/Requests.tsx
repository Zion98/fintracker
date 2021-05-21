import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import { accessToken } from "../helpers/helperFunc";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";

const ClientRequest = () => {
  let { isAdmin, isAgent, email }:{isAdmin:string, isAgent:string, email:string} = jwt_decode(accessToken);
  const state = {
    title: "",
    email: !isAdmin && !isAgent ? email : "",
    request: "Refund",
    amount: 0,
    summary: "",
    approvers: [],
    img_url: "",
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(state);
  console.log(data, "the value we got");

  const onChangeHandler = (event: any) => {
    const { files } = event.target;
    if (files) {
      const url = `https://api.cloudinary.com/v1_1/omecloudinary/upload`;
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "upload");
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((datas) => {
          setData({ ...data, img_url: datas.secure_url });
          Swal.fire("Done", "Upload Successful!", "success");
        });
    } else if (event.target.name === "approvers") {
      const { value, name } = event.target;
      setData({ ...data, [name]: [...state.approvers, value] });
    } else {
      const { value, name } = event.target;
      setData({ ...data, [name]: value });
    }
  };

  const history = useHistory();
  const submitRequest = async (e: any) => {
    e.preventDefault();
    let decoded: Record<string, unknown> = jwt_decode(accessToken);
    console.log("ert", decoded._id);
    const apiUrl = `http://localhost:3000/requests?id=${decoded._id}`;
    fetch(apiUrl, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          swal("New Request Created");
          history.push("/dashboard");
        } else {
          swal(data.message);
        }
      });
    // );
  };

  return (
    <div className="requests">
      <Card bg="light" style={{ width: "65rem" }}>
        <Card.Header
          style={{
            background: "rgb(40,41,64)",
            color: "#fff",
            padding: "2.5rem 0rem",
            textAlign: "center",
            fontSize: "1.7rem",
          }}
        >
          <b>Create Request</b>
        </Card.Header>
        <Card.Body
          style={{
            background: "#fff",
            paddingBottom: "70px",
          }}
        >
          <Form className="form" action="" onSubmit={submitRequest}>
            <Form.Group>
              <Form.Label style={{ paddingTop: "40px" }}>Title</Form.Label>
              <Form.Control
                name="title"
                value={data.title}
                onChange={(e) => onChangeHandler(e)}
                type="text"
              />
            </Form.Group>
            <Form.Group
              style={{ display: !isAdmin && !isAgent ? "none" : "default" }}
            >
              <Form.Label style={{ paddingTop: "20px" }}>Email</Form.Label>
              <Form.Control
                name="email"
                value={data.email}
                onChange={(e) => onChangeHandler(e)}
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1"></Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label style={{ paddingTop: "20px" }}>Requests</Form.Label>
              <Form.Control
                name="request"
                value={data.request}
                onChange={(e) => onChangeHandler(e)}
                as="select"
              >
                <option selected>Refund</option>
                <option>Invoice</option>
                <option>Loan</option>
                <option>Upfront</option>
                <option>Stipend</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1"></Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label style={{ paddingTop: "20px" }}>Amount</Form.Label>
              <Form.Control
                name="amount"
                value={data.amount}
                onChange={(e) => onChangeHandler(e)}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ paddingTop: "20px" }}>Summary</Form.Label>
              <Form.Control
                name="summary"
                value={data.summary}
                onChange={(e) => onChangeHandler(e)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group style={{ paddingBottom: "30px" }}>
              <Form.Label style={{ paddingTop: "20px" }}>Approvers</Form.Label>
              <Form.Control
                name="approvers"
                value={data.approvers}
                onChange={(e) => onChangeHandler(e)}
                type="text"
              />
            </Form.Group>
            <Form.Group
              style={{
                position: "relative",
                width: "130px",
                height: "40px",
                border: "1px solid green",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "green",
                fontWeight: "normal",
                cursor: "pointer",
                paddingTop: "5px",
                fontSize: "14px",
              }}
            >
              <Form.Label className="pointers">Upload Image</Form.Label>
              <Form.Control
                style={{ width: "100px", position: "absolute", opacity: "0" }}
                type="file"
                accept="image/*"
                id="single"
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Button
              style={{
                display: "block",
                marginTop: "9px",
                fontSize: "17px",
              }}
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientRequest;
