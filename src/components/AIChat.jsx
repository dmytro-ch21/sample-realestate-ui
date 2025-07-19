import { useState } from "react";
import "./AIChat.css";
import { getToken } from "../utils/auth";
import { chat } from "../api/ai";
import { FcAbout } from "react-icons/fc";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GrRobot } from "react-icons/gr";

function AIChat({ listingId }) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const openChat = () => {
    setShow(true);
    if (!message) {
      setMessage("What question do you have?");
    }
  };

  const sendMessage = async () => {
    const token = getToken();

    if (!message.trim()) return;

    setLoading(true);

    try {
      const data = await chat(token, { message }, listingId); // message is the one user typed
      setResponse(data.message); // message is the one ai returned
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="position-fixed bottom-0 end-0 p-3">
        {!show ? (
          <div className="text-center">
            <button
              className="btn"
              onClick={openChat}
              title="Ask AI about this property!"
            >
              <FcAbout
                style={{
                  width: "60px",
                  height: "60px",
                  animation: "pulse 2s infinite",
                  filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
                }}
              />
            </button>
            <small className="d-block text-muted mt-1 fw-bold">Ask AI</small>
          </div>
        ) : (
          <div
            className="card border-primary shadow-lg chat"
            style={{ width: "500px" }}
          >
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span className="p-0 m-0">Ask AI About This Property</span>
                <button
                  className="btn btn-sm border-0 text-light opacity-50 fs-5 p-0 m-0"
                  onClick={() => setShow(false)}
                >
                  <IoIosCloseCircleOutline />
                </button>
              </div>
            </div>

            <div className="card-body chat-body">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Ask anything about this listing"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={sendMessage}
                disabled={loading || !message.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    AI is thinking...
                  </>
                ) : (
                  <>Ask AI</>
                )}
              </button>

              {response && (
                <div className="flex-grow-1">
                  <div className="mt-3 p-3 bg-light border rounded h-100">
                    <div className="d-flex align-items-start">
                      <div className="me-2">
                        <GrRobot />
                      </div>
                      <div>
                        <strong>AI Assistant Response: </strong>
                        <p>{response}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AIChat;
