import React from "react";
import styled from "styled-components";
import { useMUD } from "./MUDContext";
import { Entity } from "@latticexyz/recs";

type Props = {
  id: Entity;
  content: string;
  done: boolean;
}

const ToDoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: white;
`;

export function ToDoItem({id, content, done}: Props) {
  const {
    systemCalls: {
      toggleDone,
    },
    components: {
      ToDo,
    },
  } = useMUD();

  return (
    <ToDoItemWrapper>
      <span>
        {content}
      </span>
      <input type="checkbox" checked={done} onChange={(e) => {
        ToDo.addOverride('done', {
          entity: id,
          value: {
            content,
            done: !done,
          }
        });
        toggleDone(id);
      }}/>
    </ToDoItemWrapper>
  )
}