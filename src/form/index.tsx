import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Dexie from "dexie";

const Input = styled.input({
  height: 40,
  border: "1px solid black"
});

const Button = styled.button({
  height: 40
});

interface IRecord {
  date: string;
  type: "rpe" | "wellness";
  sync: boolean;
}

const db = new Dexie("db");

db.version(1).stores({
  records: "++id, date, type, sync"
});

const records = db.table("records");

const useHooks = () => {
  const [value, setValue] = useState("");
  const [memory, setMemory] = useState<IRecord[]>();

  const loadMemory = () => {
    records.toArray().then(res => setMemory(res));
  };

  const submit = () => {
    console.log("submit");
    records.add({ date: value, type: "rpe", sync: false });
    loadMemory();
  };

  return { value, setValue, memory, submit, loadMemory };
};

const Form: React.FC = () => {
  const { value, setValue, memory, submit, loadMemory } = useHooks();

  useEffect(() => {
    loadMemory();
  });

  return (
    <div>
      <Input
        type={"text"}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
      <Button onClick={submit}>送信</Button>
      {memory &&
        memory.map(mem => {
          return <div>{mem.date}</div>;
        })}
    </div>
  );
};

export default Form;
