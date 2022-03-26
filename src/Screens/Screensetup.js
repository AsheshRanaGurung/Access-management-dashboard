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
import axios from "axios";
import ScreenModal from "../components/Modals/ScreenModal";
import { useTable } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  addscreen,
  deletescreen,
  editscreen,
  fetchScreen,
} from "../redux/Actions/ScreenAction";
import UpdateScreenModal from "../components/Modals/UpdateScreenModal";

const Screensetup = () => {
  const tableColumn = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Screen name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <>
          <button
            style={{ color: "blue" }}
            onClick={() =>
              editThisScreen(
                row.original.id,
                row.original.name,
                row.original.description
              )
            }
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            style={{ color: "#e78787" }}
            onClick={() => deleteThisId(row.original.id)}
          >
            <i className="bi bi-trash3"></i>
          </button>
          <button style={{ color: "#green" }} onClick={() => alert("hello")}>
            <i className="bi bi-gear"></i>
          </button>
        </>
      ),
    },
  ];

  const screen = useSelector((state) => state.screens);
  const { screens } = screen;

  const addeddscreen = useSelector((state) => state.addscreen);
  const { success: addsuccess } = addeddscreen;
  const deletedscreen = useSelector((state) => state.deletescreen);
  const { success: deletesuccess } = deletedscreen;
  const updatedscreen = useSelector((state) => state.updatescreen);
  const { success: updatesuccess } = updatedscreen;

  const [modalOpen, setModalOpen] = useState(false);
  const [updatemodalOpen, setUpdatemodalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updatename, setUpdatename] = useState("");
  const [updatedesc, setUpdatedesc] = useState("");

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => screens?.data?.data, [screens?.data?.data]);

  const dispatch = useDispatch();

  const deleteThisId = (id) => {
    dispatch(deletescreen(id, userInfo));
  };

  const editThisScreen = (id, name, desc) => {
    // dispatch(editscreen(id, userInfo));
    setUpdateId(id);
    setUpdatename(name);
    setUpdatedesc(desc);
    setUpdatemodalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchScreen(userInfo));
  }, [addsuccess, updatesuccess, deletesuccess]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });

  if (screens.length === 0)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <div>
      {modalOpen && <ScreenModal setOpenModal={setModalOpen} />}
      {updatemodalOpen && (
        <UpdateScreenModal
          setOpenModal={setUpdatemodalOpen}
          id={updateId}
          name={updatename}
          desc={updatedesc}
        />
      )}

      <div className="User-heading">
        <div>
          <span className="heading">Screen Setup</span>
        </div>
        <div>
          <button
            className="add-users"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <i className="bi bi-plus"></i>Add Screens
          </button>
        </div>
      </div>

      <Table variant="striped" colorScheme="gray" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
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
    </div>
  );
};

export default Screensetup;
