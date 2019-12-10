import React, { useState } from "react";
import styled from "@emotion/styled";

const Input = styled.input({
  height: 40,
  border: "1px solid black"
});

const Form: React.FC = () => {
  const [value, setValue] = useState("");
  const [memory, setMemory] = useState("");

  return (
    <div>
      <Input
        type={"text"}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
      <div>{memory}</div>
    </div>
  );
};

export default Form;
