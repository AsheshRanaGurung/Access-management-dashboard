import {
  Button,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "../components/Modals/Modal";
import { useTable } from "react-table";
import { deleteuser, edituser, fetchUser } from "../redux/Actions/UserActon";
import { useDispatch, useSelector } from "react-redux";
import EditUserModal from "../components/Modals/EditUserModal";

const CreateUser = () => {
  const tableColumn = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "User",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <>
          <button
            style={{ color: "blue", paddingRight: "0.75rem" }}
            onClick={() =>
              editThisUser(
                row.original.id,
                row.original.name,
                row.original.email
              )
            }
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            style={{ color: "#e78787" }}
            onClick={() => deleteThisUser(row.original.id)}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </>
      ),
    },
  ];

  const userdetails = useSelector((state) => state.User);
  const { users, isloading } = userdetails;

  const adduser = useSelector((state) => state.adduser);
  const { success } = adduser;
  const deletethisuser = useSelector((state) => state.deleteuser);
  const { success: userdelete } = deletethisuser;

  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalopen, setEditmodalopen] = useState(false);
  const [editId, setEditId] = useState("");
  const [editname, setEditname] = useState("");
  const [editemail, setEditemail] = useState("");

  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => users?.data?.data, [users?.data?.data]);

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const deleteThisUser = (id) => {
    dispatch(deleteuser(id, userInfo));
  };

  const editThisUser = (id, name, email) => {
    setEditId(id);
    setEditname(name);
    setEditemail(email);
    setEditmodalopen(true);
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });

  useEffect(() => {
    dispatch(fetchUser(userInfo));
  }, [success, userdelete]);

  if (users?.length === 0)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  return (
    <div>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      {editmodalopen && (
        <EditUserModal
          setOpenModal={setEditmodalopen}
          id={editId}
          name={editname}
          email={editemail}
        ></EditUserModal>
      )}
      <div className="User-heading">
        <div>
          <span className="heading">User Setup</span>
        </div>
        <div>
          <button
            className="add-users"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <i className="bi bi-plus"></i>Add Users
          </button>
        </div>
      </div>
      {isloading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Table variant="striped" colorScheme="gray" {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default CreateUser;
