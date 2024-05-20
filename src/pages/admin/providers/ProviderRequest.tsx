import React, { useEffect, useMemo, useState } from "react";
import {  Box, Button, Typography } from "@mui/material";
import { DataGrid, GridCellParams, gridClasses, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../types/props";
import { useGetSpaceRequestsMutation,useUpdateSpaceStatusMutation } from "../../../slices/adminApiSlice";
import { WorkSpace } from "../../../types/Spaces/space";
import ViewSpaceDetails from "./ViewProviderRequest"; // You need to create this component

const ProviderRequest: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [spaces, setSpaces] = useState<WorkSpace[]>([]);
  const [getSpaceRequests] = useGetSpaceRequestsMutation();
  const [selectedSpace, setSelectedSpace] = useState<WorkSpace | null>(null);
  const [updateStatus] = useUpdateSpaceStatusMutation()

  useEffect(() => {
    setSelectedLink(link);
    async function fetchSpaces() {
      try {
        const res = await getSpaceRequests("").unwrap();
        console.log(res)
        const pendingSpaces = res.data.filter((space: WorkSpace) => space.isAccepted === false);
        setSpaces(pendingSpaces);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    }
    fetchSpaces();
  }, [setSelectedLink, link, getSpaceRequests]);

  const handleViewDetails = (space: WorkSpace) => {
    setSelectedSpace(space);
  };

  const handleCloseModal = () => {
    setSelectedSpace(null);
  };

  const handleUpdateStatus = async (space: WorkSpace, isAccepted: boolean) => {
    try {
      console.log("ID:", space._id);
      console.log("Provider ID:", space.providerId);
      const { _id: id, providerId } = space; // Extract id and providerId from the space object
      const res = await updateStatus({ id, providerId, isAccepted }).unwrap();
      console.log(res)
    } catch (error) {
      console.error("Error updating space status:", error);
    }
  };
  

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "spaceName", headerName: "Space Name", width: 150 },
      { field: "providerId", headerName: "Provider ID", width: 150 },
      { field: "spaceType", headerName: "Space Type", width: 150 },
    
      { field: "chargePerHour", headerName: "Charge Per Hour", type: 'number', width: 150 },
      { field: "availableSpaces", headerName: "Available Spaces", type: 'number', width: 150 },
      { field: "contactNumber", headerName: "Contact Number", width: 150 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 150,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format("DD-MM-YYYY"),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 300,
        renderCell: (params: GridCellParams) => (
          <>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => handleViewDetails(params.row as WorkSpace)}
            >
              View Details
            </Button>
            <Button
  variant="contained"
  color="primary"
  onClick={() => handleUpdateStatus(params.row as WorkSpace, true)}
>
  Accept
</Button>
<Button
  variant="contained"
  color="secondary"
  onClick={() => handleUpdateStatus(params.row as WorkSpace, false)}
>
  Reject
</Button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Box sx={{ height: 400, width: "95%" }}>
        <Typography variant="h4" component="h4" sx={{ textAlign: "center", mt: 2, mb: 3 }}>
          New Space Requests
        </Typography>
        <DataGrid
          columns={columns}
          rows={spaces}
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
        />
      </Box>
      {selectedSpace && (
        <ViewSpaceDetails
          open={true}
          onClose={handleCloseModal}
          space={selectedSpace}
        />
      )}
    </>
  );
};

export default ProviderRequest;
