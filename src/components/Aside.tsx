import React from "react";
//@ts-expect-error
const Aside = ({ requests }) => {
  const filterRequests = (statusType: any) => {
    return requests.filter(
      (request: { status: any }) => request.status == statusType
    ).length;
  };
  return (
    <aside>
      <h3>Short Summary</h3>
      <p className="count Requests">
        <span style={{opacity: 1, fontWeight: 700}} id="reqs">{requests.length}</span>   Requests
      </p>
      <p className="count lowerOpa">
        Approved Requests: <span id="">{filterRequests("Approved")}</span>
      </p>
      <p className="count lowerOpa">
        Pending Requests: <span id="">{filterRequests("Pending")}</span>
      </p>
      <p className="count lowerOpa">
        Rejected Requests:{" "}
        <span id="">{filterRequests("Rejected")}</span>
      </p>
      <p className="count lowerOpa">
        Closed Requests: <span id="">{filterRequests("Closed")}</span>
      </p>
    </aside>
  );
};

export default Aside;
