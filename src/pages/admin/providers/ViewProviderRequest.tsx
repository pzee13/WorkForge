import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { WorkSpace } from "../../../types/Spaces/space";

interface ViewSpaceDetailsProps {
  open: boolean;
  onClose: () => void;
  space: WorkSpace;
}

const ViewSpaceDetails: React.FC<ViewSpaceDetailsProps> = ({ open, onClose, space }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Space Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1"><strong>Space Name:</strong> {space.spaceName}</Typography>
        <Typography variant="body1"><strong>Provider ID:</strong> {space.providerId}</Typography>
        <Typography variant="body1"><strong>Space Type:</strong> {space.spaceType}</Typography>
        <Typography variant="body1"><strong>State:</strong> {space.state}</Typography>
        <Typography variant="body1"><strong>District:</strong> {space.district}</Typography>
        <Typography variant="body1"><strong>City:</strong> {space.city}</Typography>
        <Typography variant="body1"><strong>Area Name:</strong> {space.areaName}</Typography>
        <Typography variant="body1"><strong>Building Name:</strong> {space.buildingName}</Typography>
        <Typography variant="body1"><strong>Charge Per Hour:</strong> {space.chargePerHour}</Typography>
        <Typography variant="body1"><strong>Available Spaces:</strong> {space.availableSpaces}</Typography>
        <Typography variant="body1"><strong>Contact Number:</strong> {space.contactNumber}</Typography>
        <Typography variant="body1"><strong>Description:</strong> {space.description}</Typography>
        <Typography variant="body1"><strong>Facilities:</strong> {space.facilities.join(", ")}</Typography>

        {/* Render rental agreement if available */}
        {space.rentalAgreement && (
          <div>
            <Typography variant="body1"><strong>Rental Agreement:</strong></Typography>
            <a href={space.rentalAgreement} target="_blank" rel="noopener noreferrer" className="text-red-400">View Rental Agreement</a>
          </div>
        )}

        {/* Render images if available */}
        {space.images.length > 0 && (
          <div>
            <Typography variant="body1"><strong>Images:</strong></Typography>
            {space.images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} style={{ maxWidth: "100%", margin: "10px 0" }} />
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewSpaceDetails;
