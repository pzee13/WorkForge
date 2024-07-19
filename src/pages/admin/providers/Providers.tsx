// import { useEffect, useMemo, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import {
//   DataGrid,
//   GridCellParams,
//   gridClasses,
//   GridColDef,
// } from "@mui/x-data-grid";
// import moment from "moment";
// import { grey } from "@mui/material/colors";
// import ProviderAction from "./ProviderAction";
// import { Selected } from "../../../types/props";
// import { useGetProvidersMutation } from "../../../slices/adminApiSlice";
// import { IUser } from "../../../types/user/usertypes";

// const Providers: React.FC<Selected> = ({ setSelectedLink, link }) => {
//   const [rowId, setRowId] = useState<string | null>(null);
//   const [providers, setProviders] = useState<IUser[]>([]);
//   const [getProvidersData] = useGetProvidersMutation();

//   useEffect(() => {
//     setSelectedLink(link);

//     async function fetchUser() {
//       try {
//         const res = await getProvidersData("").unwrap();
//         setProviders(res.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     }

//     fetchUser();
//   }, [link]); // Add dependencies if needed

//   const columns: GridColDef[] = useMemo(
//     () => [
    
//       { field: "name", headerName: "Name", width: 200 },
//       { field: "email", headerName: "Email", width: 200 },
//       { field: "mobile", headerName: "Mobile", width: 200 },
//       {
//         field: "createdAt",
//         headerName: "Joined at",
//         width: 200,
//         renderCell: (params: GridCellParams) =>
//           moment(params.row.createdAt).format(" DD-MM-YYYY"),
//       },
//       // { field: "_id", headerName: "Id", width: 220 },
//       {
//         field: "isBlocked",
//         headerName: "Blocked",
//         width: 200,
//         type: "boolean",
//         editable: true,
//       },
//       {
//         field: "actions",
//         headerName: "Actions",
//         width: 350,
//         type: "actions",
//         renderCell: (params: GridCellParams) => (
//           <ProviderAction {...{ params, rowId, setRowId }} />
//         ),
//       },
//     ],
//     [rowId]
//   );

//   return (
//     <Box sx={{ height: 400, width: "95%" }}>
//       <Typography
//         variant="h4"
//         component="h4"
//         sx={{ textAlign: "center", mt: 2, mb: 3 , }}
//       >
//         Manage Providers
//       </Typography>
//       <DataGrid
//         columns={columns}
//         rows={providers}
//         getRowId={(row) => row._id}
//         pageSizeOptions={[10, 25, 50, 75, 100]}
//         getRowSpacing={(params) => ({
//           top: params.isFirstVisible ? 0 : 5,
//           bottom: params.isLastVisible ? 0 : 5,
//         })}
//        sx={{
//           [`& .${gridClasses.row}`]: {
//             bgcolor: (theme) =>
//               theme.palette.mode === "light" ? grey[200] : grey[900],
//           },
//           [`& .${gridClasses.columnHeader}`]: {
//             backgroundColor: "#064749", // Custom green color
//             color: "white",
//             fontWeight: "bold",
//           },
//         }}
//         onCellEditStop={(params) => setRowId(params.id.toString())}
//         onCellEditStart={(params) => setRowId(params.id.toString())}
//       />
//     </Box>
//   );
// };

// export default Providers;


import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  gridClasses,
  GridColDef,
} from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import ProviderAction from "./ProviderAction";
import { Selected } from "../../../types/props";
import { useGetProvidersMutation } from "../../../slices/adminApiSlice";
import { IUser } from "../../../types/user/usertypes";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// Define the custom styled component
const CustomBox = styled(Box)(() => ({
  height: 400,
  width: "95%",
}));

const Providers: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [providers, setProviders] = useState<IUser[]>([]);
  const [getProvidersData] = useGetProvidersMutation();

  useEffect(() => {
    setSelectedLink(link);

    async function fetchUser() {
      try {
        const res = await getProvidersData("").unwrap();
        setProviders(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUser();
  }, [link, setSelectedLink, getProvidersData]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "mobile", headerName: "Mobile", width: 200 },
      {
        field: "createdAt",
        headerName: "Joined at",
        width: 200,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format("DD-MM-YYYY"),
      },
      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 200,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 350,
        type: "actions",
        renderCell: (params: GridCellParams) => (
          <ProviderAction {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <CustomBox>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 }}
      >
        Manage Providers
      </Typography>
      <DataGrid
        columns={columns}
        rows={providers}
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
          [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: "#064749",
            color: "white",
            fontWeight: "bold",
          },
        }}
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
    </CustomBox>
  );
};

export default Providers;
