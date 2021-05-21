import React from "react";
import "../styles/analytic.css";
import imgs from "../../assets/img/undraw_pending_approval_xuu9 (1).svg";
import approved from "../../assets/img/undraw_Confirmed_re_sef7.svg";
import alldata from "../../assets/img/undraw_All_the_data_re_hh4w.svg";
import check from "../../assets/img/undraw_check_boxes_m3d0.svg";
import denied from "../../assets/img/undraw_access_denied_re_awnf.svg";
import checked from "../../assets/img/undraw_Checklist__re_2w7v.svg";
import needsA from "../../assets/img/undraw_Note_list_re_r4u9.svg";
import Doughnut from "./Chart1";
import Chart2 from "./Chart2";
import { apiTypes } from "./index";
import jwt_decode from "jwt-decode";
import {accessToken} from "../helpers/helperFunc"


const analyticsContent = ({
  requests
}: {
  requests: [apiTypes];
}) => {
  const getAmount = requests.map(
    (singleRequest: apiTypes) => singleRequest.amount
  );
  const sumAmount = getAmount.reduce((a, b) => Number(a) + Number(b), 0);
  const getAllRequests = requests.length;
  console.log(sumAmount);

  const pendingRequests = requests.filter(
    (singleRequest) => singleRequest.status == "Pending"
  );
  const amountPending = pendingRequests
    .map((singleRequest) => singleRequest.amount)
    .reduce((a, b) => Number(a) + Number(b), 0);

    const approvedRequests = requests.filter(
      (singleRequest) => singleRequest.status == "Approved"
    );
    const amountApproved = approvedRequests
      .map((singleRequest) => singleRequest.amount)
      .reduce((a, b) => Number(a) + Number(b), 0);
  

  const rejectedRequests = requests.filter(
    (singleRequest) => singleRequest.status == "Rejected"
  );
  const amountRejected = rejectedRequests
    .map((singleRequest) => singleRequest.amount)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const closedRequests = requests.filter(
    (singleRequest) => singleRequest.status == "Closed"
  );
  const amountClosed= closedRequests
    .map((singleRequest) => singleRequest.amount)
    .reduce((a, b) => Number(a) + Number(b), 0);


    const loan= requests.filter((single)=> single.request=="Loan").length
    const refund= requests.filter((single)=> single.request=="Refund").length
    const invoice= requests.filter((single)=> single.request=="Invoice").length
    const upfront= requests.filter((single)=> single.request=="Upfront").length
    const stipend= requests.filter((single)=> single.request=="Stipend").length
    const others= requests.filter((single)=> single.request=="Others").length
    let decoded:{name:string}= jwt_decode(accessToken);
    let names = decoded.name;
  return (
    <div className="analytics">
      <div className="image-text">
        <p className="image-head">
          <img src={check} alt="" />
        </p>
        <div className="text">
          <p>
            Hello, <span>{names}</span>
          </p>
          <p>Welcome to your DashBoard.</p>
        </div>
      </div>

      <div className="main-grid">
        <div className="grids grid1">
          <div className="flexed">
            <div className="image-analytics">
              <img src={alldata} alt="" />
            </div>
            <p className="request-type">{getAllRequests}</p>
            <p>Requests</p>
          </div>
        </div>
        <div className="grids grid2">
          <div className="flexed">
            <div className="image-analytics">
              <img src={checked} alt="" />
            </div>
            <p className="request-type">{Number(sumAmount).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
            <p>Total Amount</p>
          </div>
        </div>
        <div className="grids grid2">
          <div className="flexed">
            <div className="image-analytics">
              <img src={imgs} alt="" />
            </div>
            <p className="request-type">{Number(amountPending).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
            <p>Pending</p>
          </div>
        </div>
        <div className="grids grid3">
          <div className="flexed">
            <div className="image-analytics">
              <img src={approved} alt="" />
            </div>
            <p className="request-type">{Number(amountApproved).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
            <p>Approved</p>
          </div>
        </div>
        <div className="grids grid4">
          <div className="flexed">
            <div className="image-analytics">
              <img src={denied} alt="" />
            </div>
            <p className="request-type">{Number(amountRejected).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
            <p>Rejected</p>
          </div>
        </div>
        <div className="grids grid5">
          <div className="flexed">
            <div className="image-analytics">
              <img src={needsA} alt="" />
            </div>
            <p className="request-type">{Number(amountClosed).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
            <p>Closed</p>
          </div>
        </div>
        
        <div className="grids chart1">
          <Doughnut
            className="charts"
            
            amountPending={amountPending}
            amountApproved={amountApproved}
            amountRejected={amountRejected}
            amountClosed= {amountClosed}
           
          />
        </div>
        <div className="grids chart2">
        <Chart2
        loan={loan}
        refund={refund}
        stipend={stipend}
        invoice={invoice}
        upfront={upfront}
        others={others}
        />
        </div>
      </div>
    </div>
  );
};

export default analyticsContent;
