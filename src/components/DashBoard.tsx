import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "react-modal";
import { dateConv, accessToken } from "../helpers/helperFunc";
import Pagination from "./Pagination";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { apiTypes } from "./index";
import Aside from "./Aside";
Modal.setAppElement("#root");

const DashBoard = ({ requests }: { requests: apiTypes[] }) => {
  let decoded: Record<string, unknown> = jwt_decode(accessToken);
  console.log(process.env)
  // console.log("https")
  let isAdminBool = decoded.isAdmin;
  let isAgentBool = decoded.isAgent;

  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(5);
  const [searchVal, setSearchVal] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchAmount, setSearchAmount] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchVal, searchStatus, searchAmount]);

  if (searchVal.length > 0) {
    requests = requests.filter((request: Record<string, any>) => {
      return (
        request.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        request.email.toLowerCase().includes(searchVal.toLowerCase())
      );
    });
  }

  if (searchStatus.length > 0) {
    requests = requests.filter((request: Record<string, any>) => {
      return request.status.toLowerCase().includes(searchStatus.toLowerCase());
    });
  }

  if (Number(searchAmount) > 0) {
    requests = requests.filter((request: Record<string, any>) => {
      switch (Number(searchAmount)) {
        case 5000:
          return (
            Number(request.amount) >= 0 &&
            Number(request.amount) <= Number(searchAmount)
          );
        case 10000:
          return (
            Number(request.amount) >= 5001 &&
            Number(request.amount) <= Number(searchAmount)
          );
        case 100000:
          return (
            Number(request.amount) >= 10001 &&
            Number(request.amount) <= Number(searchAmount)
          );
        case 500000:
          return (
            Number(request.amount) >= 100001 &&
            Number(request.amount) <= Number(searchAmount)
          );
        case 1000000:
          return (
            Number(request.amount) >= 500001 &&
            Number(request.amount) <= Number(searchAmount)
          );
        default:
          return Number(request.amount) >= Number(searchAmount);
      }
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleStatusChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchStatus(e.target.value);
  };
  const handleAmountChange = (e: any) => {
    setSearchAmount(e.target.value);
  };

  // //Get current Requests(Pagination)
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  // //Change Page(Pagination)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //Modal
  const [modalInOpen, setModalIsOpen] = useState(false);
  const [value, setValue] = useState<apiTypes>([]);

  const modalToggle = (id: any) => {
    const value = requests.find((single: apiTypes) => single._id == id);
    // @ts-expect-error
    setValue(value);
    setModalIsOpen(true);
  };

  const close = () => {
    setModalIsOpen(false);
  };

  //formModalToggle
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);

  const formModalToggle = (id: any) => {
    const value: any = requests.find((single: any) => single._id == id);

    setValue(value);
    setFormModalIsOpen(true);
  };

  const formClose = () => {
    setFormModalIsOpen(false);
  };

  const handleInputChange = (e: { target: any }) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
  };
  const [change, setChange] = useState("");

  const onCharger = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setChange(value);
  };
    
  const update = () => {

    fetch(`http://localhost:3000/requests?id=${value._id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        ...value,
        status: change,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          return data;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeRequests = (requestsId: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this Request?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/requests?id=${requestsId}`, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            if (response) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            console.log("successful");
          })

          .catch((err) => {
            Swal.fire("Delete not successful");
            console.log("failed");
            return err.message;
          });
        window.location.reload();
      }
    });
  };

  // buttons
  function statusColor(row: string) {
    let colors: any = "";
    if (row == "Pending") {
      colors = "gray";
    } else if (row == "Closed") {
      colors = "blue";
    } else if (row == "Approved") {
      colors = "#4CAF50";
    } else if (row == "Rejected") {
      colors = "red";
    } else {
      colors = "gray";
    }
    return (
      <>
        <button style={{ backgroundColor: colors }} className="btns">
          {row}
        </button>
      </>
    );
  }
  const [requestsId, setRequestsId] = useState("");

  return (
    <>
      <main>
        <div className="content-header">
          <p className="request">Requests</p>
          <a href="/requests">
            <p className="records">
              <AddCircleOutlinedIcon className="icons plus" /> Create Requests
            </p>
          </a>
        </div>
        <input
          type="search"
          className="prompt"
          placeholder="Search title or user..."
          onChange={handleChange}
        />

        <table className="mainTable">
          <thead>
            <tr>
              <th style={{ paddingLeft: "10px" }}>Title</th>

              {isAdminBool || isAgentBool ? (
                <th style={{ paddingLeft: "10px" }}>User</th>
              ) : (
                ""
              )}
              <th style={{ textAlign: "center" }}>
                Status
                <select
                  style={{ marginTop: "15px" }}
                  className="select"
                  name="status"
                  id=""
                  onChange={handleStatusChange}
                >
                  <option value="">Select a status</option>
                  <option value="pending">pending</option>
                  <option value="approved">approved</option>
                  <option value="rejected">rejected</option>
                  <option value="closed">closed</option>
                </select>
              </th>
              <th style={{ textAlign: "center" }} className="range-container">
                Amount
                <select
                  style={{
                    margin: "15px 0",
                    maxWidth: !isAdminBool && !isAgentBool ? "250px" : "130px",
                  }}
                  className="select"
                  name="status"
                  id=""
                  onChange={handleAmountChange}
                >
                  <option value="">Select amount</option>
                  <option value={5000}>0 - 5,000</option>
                  <option value={10000}>5,001 - 10,000</option>
                  <option value={100000}>10,001 - 100,000</option>
                  <option value={500000}>100,001 - 500,000 </option>
                  <option value={1000000}>500,001 - 1,000,000 </option>
                  <option value={1000001}>1,000,001 - above </option>
                </select>
              </th>
              <th style={{ textAlign: "center" }}>Date created</th>
              {isAdminBool || isAgentBool ? (
                <th className="edit-delete">Edit/Delete</th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((requestUno: apiTypes) => {
              const {
                _id,
                title,
                amount,
                email,
                status,
                img_url,
                createdAt,
              } = requestUno;

              return (
                <tr className="rows" key={requestUno._id}>
                  <td onClick={() => modalToggle(requestUno._id)}>
                    <div className="detail-subject">
                      <div
                        style={{
                          display: img_url[0] ? "inherit" : "none",
                        }}
                        className="row-img"
                      >
                        <img src={img_url} alt="" />
                      </div>{" "}
                      <p>{title}</p>
                    </div>
                  </td>

                  {isAdminBool || isAgentBool ? (
                    <td
                      onClick={() => modalToggle(requestUno._id)}
                      className="email"
                    >
                      {email.replace(/[^\.]/g, "").length === 2
                        ? email.split(".")[0] +
                          " " +
                          email.split(".")[1].split("@")[0]
                        : email}
                    </td>
                  ) : (
                    ""
                  )}

                  <td onClick={() => modalToggle(requestUno._id)}>
                    {statusColor(status)}
                  </td>
                  <td
                    style={{
                      textAlign:
                        !isAdminBool && !isAdminBool ? "center" : "right",
                    }}
                    onClick={() => modalToggle(requestUno._id)}
                  >
                    {Number(amount).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </td>
                  <td className="dates">{dateConv(createdAt)}</td>

                  {isAdminBool || isAgentBool ? (
                    <td className="edit-delete">
                      <EditIcon
                        className="edit"
                        onClick={() => formModalToggle(requestUno._id)}
                      />
                      <DeleteIcon
                        className="delete"
                        onClick={() => removeRequests(_id)}
                      />
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          requestsPerPage={requestsPerPage}
          totalRequests={requests.length}
          paginate={paginate}
        />

        <Modal isOpen={modalInOpen} onRequestClose={close}>
          <p className="modalClose" onClick={close}>
            <i className="far fa-window-close"></i>
          </p>
          <div className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR9MhTNi80ZbjoguXECgWJOCxmM8oS_0P7Q&usqp=CAU"
              alt="decagon-logo"
            />
          </div>
          <h2>Request Details</h2>
          <div className="modalPicCon">
            <table>
              <thead>
                <tr className="rows-modal">
                  <th>Title</th>
                  <td>{value.title}</td>
                </tr>
                <tr className="rows-modal">
                  <th>Author Email</th>
                  <td>{value.email}</td>
                </tr>
                <tr className="rows-modal">
                  <th>Status</th>
                  <td>{value.status}</td>
                </tr>
                <tr className="rows-modal">
                  <th>Amount</th>
                  <td>
                    {Number(value.amount).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </td>
                </tr>
                <tr className="rows-modal">
                  <th>Request</th>
                  <td>{value.request}</td>
                </tr>
                <tr className="rows-modal">
                  <th> Summary</th>
                  <td>{value.summary}</td>
                </tr>

                <tr className="rows-modal">
                  <th> Date of Creation</th>
                  <td>{dateConv(value.createdAt)}</td>
                </tr>
                <tr className="rows-modal">
                  <th> Last Update</th>
                  <td>{dateConv(value.updatedAt)}</td>
                </tr>
              </thead>
            </table>
            {value.img_url ? (
              <div className="row-img-big">
                <img src={value.img_url} alt="" />
              </div>
            ) : (
              ""
            )}
          </div>
          <a className="btn-samp" href={"/nav/comments/" + value._id}>
            <button
              style={{
                borderRadius: "13px",
                padding: "10px",
                background: "#262737",
                color: "white",
              }}
            >
              Comments
            </button>
          </a>
        </Modal>

        <Modal isOpen={formModalIsOpen} onRequestClose={formClose}>
          <p className="modalClose" onClick={formClose}>
            <i className="far fa-window-close"></i>
          </p>
          <div className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR9MhTNi80ZbjoguXECgWJOCxmM8oS_0P7Q&usqp=CAU"
              alt="decagon-logo"
            />
          </div>
          <h2>Request Changes</h2>
          <form className="editform">
            <label htmlFor="fname">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              disabled
              placeholder="title"
              value={value.title}
            />

            <label htmlFor="lname">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              disabled
              placeholder="Amount"
              value={value.amount}
            />

            <label htmlFor="country">Status</label>
            <select
              id="select"
              name="status-type"
              defaultValue={value.status}
              onChange={onCharger}
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Closed</option>
            </select>
            <button
              className="update-btns"
              type="submit"
              onClick={() => update()}
            >
              Update
            </button>
          </form>
        </Modal>
      </main>
      <Aside requests={requests} />
    </>
  );
};
export default DashBoard;
