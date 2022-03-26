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
import { useTable } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleterole, fetchRole } from "../redux/Actions/RoleAction";
import AddRoleModal from "../components/Modals/AddRoleModal";
import UpdateRoleModal from "../components/Modals/UpdateRoleModal";

function RoleSetting() {
  const navigate = useNavigate();
  const tableColumn = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Role name",
      accessor: "name",
    },
    {
      Header: "Descriptions",
      accessor: "description",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <>
          <button
            style={{ color: "blue", paddingRight: "0.75rem" }}
            onClick={() =>
              editThisRole(
                row.original.id,
                row.original.name,
                row.original.description
              )
            }
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            style={{ color: "#e78787", paddingRight: "0.75rem" }}
            onClick={() => deleteThisRole(row.original.id)}
          >
            <i className="bi bi-trash3"></i>
          </button>
          <button
            style={{ color: "#green" }}
            onClick={() => configureThisRole(row.original.id)}
          >
            <i className="bi bi-gear"></i>
          </button>
        </>
      ),
    },
  ];

  const userdetails = useSelector((state) => state.roles);
  const { roles, isloading } = userdetails;

  const roledelete = useSelector((state) => state.deleterole);
  const { success } = roledelete;

  const roleadd = useSelector((state) => state.addrole);
  const { success: addrole } = roleadd;
  const roleedit = useSelector((state) => state.editrole);
  const { success: editrole } = roleedit;

  const [rolemodalOpen, setRolemodalOpen] = useState(false);
  const [editrolemodalOpen, setEditrolemodalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updatename, setUpdatename] = useState("");
  const [updatedesc, setUpdatedesc] = useState("");

  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => roles?.data?.data, [roles?.data?.data]);

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const deleteThisRole = (id) => {
    dispatch(deleterole(id, userInfo));
  };

  const editThisRole = (id, name, desc) => {
    setUpdateId(id);
    setUpdatename(name);
    setUpdatedesc(desc);
    setEditrolemodalOpen(true);
  };

  const configureThisRole = (id) => {
    navigate(`/privelagesetup/${id}`);
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });

  useEffect(() => {
    dispatch(fetchRole(userInfo));
  }, [success, addrole, editrole]);

  if (roles?.length === 0)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  return (
    <div>
      {rolemodalOpen && <AddRoleModal setOpenModal={setRolemodalOpen} />}
      {editrolemodalOpen && (
        <UpdateRoleModal
          setOpenModal={setEditrolemodalOpen}
          id={updateId}
          name={updatename}
          desc={updatedesc}
        />
      )}
      <div className="User-heading">
        <div>
          <span className="heading">Role Setting</span>
        </div>
        <div>
          <button
            className="add-users"
            onClick={() => {
              setRolemodalOpen(true);
            }}
          >
            <i className="bi bi-plus"></i>Add Role
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
}

export default RoleSetting;
