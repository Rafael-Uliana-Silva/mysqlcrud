import React from 'react'
import axios from "axios"
import styled from 'styled-components'
import {FaTrash, FaEdit} from "react-icons/fa"
import { toast } from "react-toastify"

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;


`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

`


const Grid = ({ users, setUsers, setOnEdit }) => {

  const handleEdit = (user) => {
    setOnEdit(user);
  }

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
  
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
  
    setOnEdit(null);
    };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
         {users.map((user, i) => (
          <Tr key={i}>
            <Td width="30%">{user.nome}</Td>
            <Td width="30%">{user.email}</Td>
            <Td width="20%">{user.fone}</Td>
            <Td width="5%" ><FaEdit onClick={() => handleEdit(user)}/></Td>
            <Td width="5%" ><FaTrash onClick={() => handleDelete(user.id)} /></Td>
          </Tr>
         ))}
      </Tbody>
    </Table>
  )
}

export default Grid
