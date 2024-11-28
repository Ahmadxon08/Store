import { TextField } from "@mui/material";
import QRCode from "qrcode";
import "./Footer.scss";
import { useState } from "react";

// import axios from "axios";

const Footer = () => {
  const [amount, setAmount] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [desctiption, setDescription] = useState("");

  const handleDesciption = (e) => {
    setDescription(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  const orderNumber = generateUniqueId();

  const generateQRcode = (e) => {
    e.preventDefault();
    if (amount && desctiption) {
      const merchantID = "30386";
      const serviceID = "38229";

      const transactionParam = orderNumber;

      console.log("number for trans", transactionParam);
      console.log("order number", orderNumber);

      const returnURL = "https://github.com/";
      const cardType = "uzcard";
      const paymentURL = `https://my.click.uz/services/pay?merchant_id=${merchantID}&service_id=${serviceID}&amount=${amount}&transaction_param=${transactionParam}&return_url=${returnURL}&card_type=${cardType}`;

      QRCode.toDataURL(
        paymentURL,
        { errorCorrectionLevel: "H" },
        (err, url) => {
          if (err) {
            console.error(err);
          } else {
            setQrCodeUrl(url);
          }
        }
      );
    } else {
      alert("Please fill both description and amount");
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footerBody">
          <h1>Pay the deposit</h1>

          <form className="pay">
            <div className="text">
              <textarea
                name=""
                id=""
                value={desctiption}
                onChange={handleDesciption}
                placeholder="description..."></textarea>
            </div>
            <div className="act">
              <div className="action">
                <TextField
                  label="Amount for payments"
                  type="number"
                  placeholder="Type an amount…"
                  variant="outlined"
                  value={amount}
                  onChange={handleAmount}
                  inputProps={{
                    min: 0,
                    step: 1,
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#ccc",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#7421b0",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ccc",
                        borderWidth: "2px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#7421b0",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />

                <button onClick={generateQRcode}>Payment</button>
              </div>
              <div className="qrcode">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="" />
                ) : (
                  <p>QR code not generated yet</p>
                )}
              </div>
            </div>
            <div className="orderInfo">
              <div className="order">
                <h1>Order number:</h1>
                <span>{orderNumber}</span>
              </div>
              <div className="order">
                <h1>Status:</h1>
                <span>32423423</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <p>Copyright © 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
