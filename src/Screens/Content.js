import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
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

import { Formik, Form, Field, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { deleteproduct, fetchProduct } from "../redux/Actions/ProductAction";
import AddProductModal from "../components/Modals/AddProductModal";
import UpdateProductModal from "../components/Modals/UpdateProductModal";

function Content() {
  const product = useSelector((state) => state.products);
  const { products } = product;

  const editproduct = useSelector((state) => state.editproduct);
  const { success: editproductsuccess } = editproduct;
  const deleteproducts = useSelector((state) => state.deleteproducts);
  const { success: deleteproductssuccess } = deleteproducts;
  const addproducts = useSelector((state) => state.addproducts);
  const { success: addproductssuccess } = addproducts;

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [updateId, setUpdateId] = useState("");
  const [updatename, setUpdatename] = useState("");
  const [updatedesc, setUpdatedesc] = useState("");
  const [updateimage, setUpdateimage] = useState("");
  const [updateqty, setUpdateqty] = useState("");

  const tableColumn = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Productname",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Image",
      accessor: "image",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
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
                row.original.description,
                row.original.image,
                row.original.quantity
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
        </>
      ),
    },
  ];

  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(
    () => products[0]?.data?.data,
    [products[0]?.data?.data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;
  const dispatch = useDispatch();

  const deleteThisId = (id) => {
    dispatch(deleteproduct(id, userInfo));
  };
  const editThisRole = (id, name, desc, img, qty) => {
    setUpdateId(id);
    setUpdatename(name);
    setUpdatedesc(desc);
    setUpdateimage(img);
    setUpdateqty(qty);
    setEditModal(true);
  };

  useEffect(() => {
    dispatch(fetchProduct(userInfo));
    // console.log(products[0].data.data);
  }, [addproductssuccess, editproductsuccess, deleteproductssuccess]);

  return (
    <div>
      {addModal && <AddProductModal setOpenModal={setAddModal} />}
      {editModal && (
        <UpdateProductModal
          setOpenModal={setEditModal}
          id={updateId}
          name={updatename}
          desc={updatedesc}
          qty={updateqty}
          img={updateimage}
        />
      )}
      <div className="User-heading">
        <span className="heading">Products List</span>
        <div>
          <button
            className="add-users"
            onClick={() => {
              setAddModal(true);
            }}
          >
            <i className="bi bi-plus"></i>Add Products
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
}

export default Content;

{
  /* <div>
        
<h1>Friend List</h1>
<Formik
  initialValues={{ friends: ["jared", "ian", "brent"] }}
  onSubmit={(values) =>
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 500)
  }
  render={({ values }) => (
    <Form>
      <FieldArray
        name="friends"
        render={(arrayHelpers) => (
          <div>
            {values.friends && values.friends.length > 0 ? (
              values.friends.map((friend, index) => (
                <div key={index}>
                  <Field name={`friends.${index}`} />
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                  >
                    +
                  </button>
                </div>
              ))
            ) : (
              <button
                type="button"
                onClick={() => arrayHelpers.push("")}
              >
                {/* show this when user has removed all friends from the list
                Add a friend
              </button>
            )}
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      />
    </Form>
  )}
/>
</div> */
}
