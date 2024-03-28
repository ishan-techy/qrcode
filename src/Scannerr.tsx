import { Component } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import "./style.css";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, Typography, Dialog, Link } from "@material-ui/core";
import QRCode from "react-qr-code";
import PublicIcon from "@material-ui/icons/Public";
import LinkIcon from "@material-ui/icons/Link";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ShareIcon from "@material-ui/icons/Share";

interface State {
  result: string;
  open: boolean;
}

class Scannerr extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      result: "No result",
      open: false,
    };
  }

  handleScan = (data: string | null) => {
    if (data) {
      this.setState({ result: data });
      this.handleClickOpen();
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseQR = () => {
    this.setState({ result: "No result" });
    window.location.reload();
  };

  copyText = () => {
    navigator.clipboard
      .writeText(this.state.result)
      .then(() => alert("Copied to clipboard"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        {this.state.result === "No result" ? (
          <div className="helloone">
            <h3 className="heading">SCAN QR CODE</h3>
            <div className="closeContainer">
              <IconButton>
                <CloseIcon className="closeIcon" />
              </IconButton>
            </div>
            <div className="b1"></div>
            <div className="b2"></div>
            <div className="b3"></div>
            <div className="b4"></div>
            <div className="hello">
              <Scanner onResult={(text) => this.handleScan(text)} />
            </div>
          </div>
        ) : (
          <div className="generatedQR">
            <h3 className="heading">SCAN QR CODE</h3>
            <div className="closeContainer">
              <IconButton onClick={this.handleCloseQR}>
                <CloseIcon className="closeIcon" />
              </IconButton>
            </div>
            <QRCode value={this.state.result} />
            <div className="linkQr">
              <PublicIcon />
              <p className="text"> {this.state.result}</p>
            </div>
            <Dialog
              fullScreen
              open={open}
              keepMounted
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              BackdropProps={{
                invisible: true,
              }}
              PaperProps={{
                style: {
                  maxHeight: "30%",
                  height: "30%",
                  borderTopRightRadius: "20px",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: ".5px solid grey",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "700", padding: "20px 20px" }}
                  >
                    QR code scanning
                  </Typography>
                  <IconButton aria-label="close" onClick={this.handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div
                  style={{
                    color: "grey",
                    padding: "25px 25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingBottom: "10px",
                  }}
                >
                  <Typography style={{ fontWeight: "400" }}>
                    {this.state.result}
                  </Typography>
                </div>
                <div className="cardLinks">
                  <a href={this.state.result}>
                    <LinkIcon
                      style={{
                        height: "25px",
                        width: "20px",
                        color: "#0F172A",
                      }}
                    />
                    <Typography
                      className="cardText"
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        marginLeft: "5px",
                      }}
                    >{` Open Link`}</Typography>
                  </a>
                </div>
                <div className="cardLinks">
                  <Link onClick={this.copyText}>
                    <FileCopyIcon
                      style={{
                        height: "25px",
                        width: "20px",
                        color: "#0F172A",
                      }}
                    />
                    <Typography
                      className="cardText"
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        marginLeft: "5px",
                      }}
                    >
                      {" "}
                      Copy the QR code Link
                    </Typography>
                  </Link>
                </div>
                <div className="cardLinks">
                  <a href={this.state.result}>
                    <ShareIcon
                      style={{
                        height: "25px",
                        width: "20px",
                        color: "#0F172A",
                      }}
                    />
                    <Typography
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        marginLeft: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {" "}
                      Share
                    </Typography>
                  </a>
                </div>
              </div>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

export default Scannerr;
