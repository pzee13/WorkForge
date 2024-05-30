import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  gridClasses,
  GridColDef,
} from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import UsersAction from "./UserAction";
import { Selected } from "../../../types/props";
import { useGetUsersMutation } from "../../../slices/adminApiSlice";
import { IUser } from "../../../types/user/usertypes";

const Users: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [getUsersData] = useGetUsersMutation();

  useEffect(() => {
    setSelectedLink(link);

    async function fetchUser() {
      try {
        const res = await getUsersData("").unwrap();
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUser();
  }, [link]); // Add dependencies if needed

  const columns: GridColDef[] = useMemo(
    () => [
    
      { field: "name", headerName: "Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "mobile", headerName: "Mobile", width: 200 },
      {
        field: "createdAt",
        headerName: "Joined at",
        width: 200,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      // { field: "_id", headerName: "Id", width: 220 },
      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: GridCellParams) => (
          <UsersAction {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 400, width: "95%" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 , }}
      >
        Manage Users
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
        pageSizeOptions={[10, 25, 50, 75, 100]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
    </Box>
  );
};

export default Users;
