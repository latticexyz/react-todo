// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { ToDo, ToDoData } from "../codegen/Tables.sol";

import { addressToEntity } from "../Utils.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

contract ToDoSystem is System {
  function addTodo(string memory content) public {
    bytes32 id = getUniqueEntity();
    bytes32 owner = addressToEntity(_msgSender());

    ToDo.set(id, ToDoData({ owner: owner, content: content, done: false }));
  }

  function toggleDone(bytes32 id) public {
    bytes32 owner = addressToEntity(_msgSender());
    require(ToDo.get(id).owner == owner, "unauthorized");

    ToDo.setDone(id, !ToDo.getDone(id));
  }
}
