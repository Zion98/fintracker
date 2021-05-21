import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import SideBar from "./SideBar";
import axios from "axios";
import { accessToken } from "../helpers/helperFunc";
import jwt_decode from "jwt-decode";

const Upgrade:React.FC = () => {
  let decoded: Record<string, unknown> = jwt_decode(accessToken);
  let names = decoded.name;
  let isAdminBool = decoded.isAdmin;

const [allAdmins, setAllAdmins] = useState([]);
const [allAgents, setAllAgents] = useState([]);
const [allUsers, setAllUsers] = useState([]);
 const getUsers = async (usertype: string | undefined) => {
    try {
    const result = await axios
      .get(`http://localhost:3000/${usertype}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (usertype === "alladmins") {
        setAllAdmins(result.data);
      } else if (usertype === "allagents") {
        setAllAgents(result.data)
      } else {
        setAllUsers(result.data)
      }
      
    } catch (err) {
      console.log(err);
    }
 };

  useEffect(() => {
    getUsers("alladmins")
    getUsers("allagents")
    getUsers("allusers")  
  }, [])

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  
  const [data, setData] = useState([]);

  

  const [inputEmail, setInputEmail] = useState("");

  const handleEmailInput = (e:any) => {

    setInputEmail(e.target.value)
  }

  const [inputEmailAgent, setInputEmailAgent] = useState("");
  const handleEmailInputAgent = (e:any) => {
    setInputEmailAgent(e.target.value)
  }

  const handleAdminKeyDown = (e:any) => {

    if (e.keyCode === 13) {
      addAdminOrAgent(inputEmail, "admin")
      setInputEmail("")
    } 
  }

  const handleAgentKeyDown = (e) => {

    if (e.keyCode === 13) {
      addAdminOrAgent(inputEmailAgent, "agent")
      setInputEmailAgent("")
    } 
  }

  const addAdminOrAgent = (email: string, userType: string) => {
    FetchFunc2(email, userType)
  }

  const FetchFunc2 = (email: string, role: string) => {

    const apiUrl = `http://localhost:3000/change-role`;
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ email, role }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
    window.location.reload()
  };

  return (
    <>
      <Nav name={names} openSideBar={openSideBar} />
      <SideBar
        isAdmin={isAdminBool}
        decoded={decoded}
        sideBarOpen={sideBarOpen}
        closeSideBar={closeSideBar}
      />

      <div className="upgrade-section">
        <h1>Modify Roles</h1>
        
        <div className="admins">
          <h4>Administrators</h4>
          <p className="addA">Add Admin: </p>
          <form>
          <input type="email" value={inputEmail} onKeyDown={handleAdminKeyDown}
              onChange={handleEmailInput}
              placeholder="Input a valid email" />
            <button type="submit" className="admingent" onClick={() => {
              addAdminOrAgent(inputEmail, "admin")
            }}>Add</button>
            </form>
          
          {allAdmins.length == 1
            ?
            <div>
            <p style={{ marginBottom: "20px", marginTop: "30px"}}>You are the sole Administrator</p>
            <div className="upgrade">
              <p>{ // @ts-expect-error
              allAdmins[0]!.email} </p>
              <div className="roles">
                        <p>
                          <button disabled
                            onClick={ // @ts-expect-error
                              () => FetchFunc2(allAdmins[0].email, "agent")}


                          >
                            Agent
                          </button>
                        </p>
                        <p>
                          <button disabled
                            onClick={ // @ts-expect-error
                              () => FetchFunc2(allAdmins[0].email, "user")}
                          >
                            User
                          </button>
                        </p>
                      </div>
              </div>
              </div>
            : allAdmins.map((user: any) => {
                  return (
                    <div className="upgrade" key={user._id}>
                      <p>{user.email} </p>
                      <div className="roles">
                        <p>
                          <button
                            disabled={user.email === decoded.email ? true : false}
                            onClick={() => FetchFunc2(user.email, "agent")}
                          >
                            Agent
                          </button>
                        </p>
                        <p>
                          <button

                            disabled={ // @ts-expect-error
                              user.email === decoded.email || !allUsers.some(userNorm=>userNorm.email==user.email) ? true : false}


                            onClick={() => FetchFunc2(user.email, "user")}
                          >
                            User
                          </button>
                        </p>
                      </div>
                    </div>
                  );
              })}
        </div>
        
        <div className="agents">
          <h4>Agents</h4>
          <p className="addA">Add Agent:</p>
          <form style={{ marginBottom: "30px" }}>
          <input type="email" value={inputEmailAgent} onChange={handleEmailInputAgent}
              placeholder="Input a valid email"
              onKeyDown={handleAgentKeyDown}
            />
              <button className="admingent"
                onClick={() => {
                  addAdminOrAgent(inputEmailAgent, "agent")
                }}
              >Add</button>
            </form>
        {allAgents!.length == 0 || allAgents == []
          ? "No Agents has been created at the moment"
          : allAgents!.map((user:any) => {
              return (
                <div className="upgrade" key={user._id}>
                  <p>{user.email} </p>
                  <div className="roles">
                    <p>
                      <button onClick={() => FetchFunc2(user.email, "admin")}>
                        Admin
                      </button>
                    </p>
                    <p>
                      <button


                        disabled={  // @ts-expect-error
                          !allUsers.some(userNorm=>userNorm.email==user.email) ? true : false }


                        onClick={() => FetchFunc2(user.email, "user")}>
                        User
                      </button>
                    </p>
                    </div>
                  </div>
                );
              })}
        </div>
        
        <div className="users">
          <h4>Users</h4>
          {allUsers.length == 0 || allUsers == []
            ? "You are the only User presently"
            : allUsers.map((user: any) => {
                if (user.email != decoded.email) {
                  return (
                    <div className="upgrade" key={user._id}>
                      <p>{user.email} </p>
                      <div className="roles">
                        <p>
                          <button
                            onClick={() => FetchFunc2(user.email, "admin")}
                          >
                            Admin
                          </button>
                        </p>
                        <p>
                          <button
                            onClick={() => FetchFunc2(user.email, "agent")}
                          >
                            Agent
                          </button>
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
        </div>
      </div>
    </>
  );
}

export default Upgrade;
