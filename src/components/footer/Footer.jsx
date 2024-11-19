import { TextField } from "@mui/material";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footerBody">
          <h1>Pay the deposit</h1>

          <div className="pay">
            <div className="text">
              <textarea name="" id="" placeholder="description..."></textarea>
            </div>
            <div className="act">
              <div className="action">
                <TextField
                  label="Amount for payments"
                  type="number"
                  placeholder="Type an amount…"
                  variant="outlined"
                  inputProps={{
                    min: 0,
                    max: 100,
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

                <button>Payment</button>
              </div>
              <div className="qrcode">
                <img src="" alt="" />
              </div>
            </div>
            <div className="orderInfo">
              <div className="order">
                <h1>Order number:</h1>
                <span>32423423</span>
              </div>
              <div className="order">
                <h1>Status:</h1>
                <span>32423423</span>
              </div>
            </div>
          </div>
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
