import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridCellParams, gridClasses, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../types/props";
import { useGetSpaceRequestsMutation, useUpdateSpaceStatusMutation } from "../../../slices/adminApiSlice";
import { WorkSpace } from "../../../types/spaces/space";
import { styled } from "@mui/material/styles";
import ViewSpaceDetails from "./ViewProviderRequest"; // You need to create this component


const CustomBox = styled(Box)(() => ({
  height: 400,
  width: "95%",
}));

const ProviderRequest: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [spaces, setSpaces] = useState<WorkSpace[]>([]);
  const [getSpaceRequests] = useGetSpaceRequestsMutation();
  const [selectedSpace, setSelectedSpace] = useState<WorkSpace | null>(null);
  const [updateStatus] = useUpdateSpaceStatusMutation();
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    space: null as WorkSpace | null,
    action: null as "accept" | "reject" | null,
  });

  useEffect(() => {
    setSelectedLink(link);
    async function fetchSpaces() {
      try {
        const res = await getSpaceRequests("").unwrap();
        console.log(res);
        const pendingSpaces = res.data.filter((space: WorkSpace) => !space.isAccepted);
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

  const handleOpenConfirmationDialog = (space: WorkSpace, action: "accept" | "reject") => {
    setConfirmationDialog({ open: true, space, action });
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialog({ open: false, space: null, action: null });
  };

  const handleConfirmAction = async () => {
    if (confirmationDialog.space && confirmationDialog.action) {
      try {
        const { _id: id, providerId } = confirmationDialog.space;
        const isAccepted = confirmationDialog.action === "accept";
        const res = await updateStatus({ id, providerId, isAccepted }).unwrap();
        console.log(res);
        setSpaces((prevSpaces) => prevSpaces.filter((space) => space._id !== id));
      } catch (error) {
        console.error("Error updating space status:", error);
      } finally {
        handleCloseConfirmationDialog();
      }
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "spaceName", headerName: "Space Name", width: 150 },
      { field: "providerId", headerName: "Provider ID", width: 150 },
      { field: "spaceType", headerName: "Space Type", width: 150 },
      { field: "chargePerHour", headerName: "Charge Per Hour", type: "number", width: 150 },
      { field: "availableSpaces", headerName: "Available Spaces", type: "number", width: 150 },
      { field: "contactNumber", headerName: "Contact Number", width: 150 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 150,
        renderCell: (params: GridCellParams) => moment(params.row.createdAt).format("DD-MM-YYYY"),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 300,
        renderCell: (params: GridCellParams) => (
          <>
            <Button variant="contained" color="inherit" onClick={() => handleViewDetails(params.row as WorkSpace)}>
              View Details
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleOpenConfirmationDialog(params.row as WorkSpace, "accept")}>
              Accept
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleOpenConfirmationDialog(params.row as WorkSpace, "reject")}>
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
      <CustomBox>
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
              bgcolor: (theme) => (theme.palette.mode === "light" ? grey[200] : grey[900]),
            },
            [`& .${gridClasses.columnHeader}`]: {
              bgcolor: '#064749', // Make sure you have this color defined in your theme
              color: 'white',
              fontWeight: 'bold',
            },
          }}
        />
      </CustomBox>
      {selectedSpace && <ViewSpaceDetails open={true} onClose={handleCloseModal} space={selectedSpace} />}
      <Dialog
        open={confirmationDialog.open}
        onClose={handleCloseConfirmationDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to {confirmationDialog.action} this space request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProviderRequest;
