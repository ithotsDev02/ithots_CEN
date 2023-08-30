import React from "react";
import { Card, Avatar } from "antd";

function PaymentSuccess() {
  return (
    <div>
      <Card>
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_7W0ppe.json"
          background="transparent"
          speed="0.5"
          style={{
            width: "600px",
            height: "600px",
            //   marginTop: "-10%",
            //   marginLeft: "27%",
            //   marginRight: "25%",
          }}
          // controls
          autoplay
        ></lottie-player>
        <p>Course Purchased Success</p>
      </Card>
    </div>
  );
}

export default PaymentSuccess;
