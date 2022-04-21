import { useState } from "react";

const Main = () => {
  const [boolean, setBoolean] = useState<boolean>(false);

  return (
    <div>
      <h1>Hello Home</h1>
      <div style={{ marginBottom: "1%" }}>
        <span>boolean: {boolean ? "true" : "false"}</span>
      </div>
      <div>
        <button type="button" onClick={() => setBoolean((prev) => !prev)}>
          change the sate
        </button>
      </div>
    </div>
  );
};

export default Main;
