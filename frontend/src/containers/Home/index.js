import React from "react";
//import { Jumbotron ,Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layouts";

function Home(props) {
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  let orderNumbers = 0;

  return (
    <div>
      <Layout sidebar>
        {/* The following div should be inside the Layout component */}
        <div className="text-center" style={{ margin: "60px", backgroundColor: "#fff" }}>
          <h1>Welcome to Admin Dashboard</h1>
          <h2>{auth.authenticate ? <div>{auth.user.fullName}</div> : null}</h2>
          {order.orders.map((orderItem, index) => (
            <div key={index}>
              {(() => {
                for (var i = 0; i < orderItem.orderStatus.length; i++) {
                  if (
                    orderItem.orderStatus[i].type === "Collected" &&
                    orderItem.orderStatus[i].isCompleted !== true
                  ) {
                    orderNumbers = orderNumbers + 1;
                  }
                }
              })()}
            </div>
          ))}
          <div
            style={{
              marginTop: "50px",
              backgroundColor: "#fcba03",
              border: "2px solid black",
            }}
          >
            <br></br>
            <h2>Not Completed Requests In Queue</h2>
            <h1 style={{ padding: "50px" }}>{orderNumbers ? orderNumbers : 0}</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;




