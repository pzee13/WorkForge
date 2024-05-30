import { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProviderCreateSpaceMutation } from '../../../slices/providerApiSlice';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../app/firebase/config';
import { AddSpaceForm } from '../../../utils/validations/commonVaild';
import { spaceValidation } from '../../../utils/validations/yupValidation';
import SpaceProgress from './SpaceProgress';
import { RootState } from "../../../app/store";
import { TextField, Button, CircularProgress, IconButton, Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InputField from '../../../component/common/inputField/InputField'; // Adjust the path as necessary
import DeleteIcon from '@mui/icons-material/Delete';
import './AddSpaceDetails.css'; // Assuming you have a CSS file for custom styles

const FACILITIES = ["Wifi", "Toilet", "Parking", "Drinking Water"];

function AddSpaceDetails() {
  const [createSpace] = useProviderCreateSpaceMutation();
  const { latitude, longitude } = useSelector((state: RootState) => state.location);
  const { areaName, state, district, country } = useSelector((state: RootState) => state.address);
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const [isSubmit, setSubmit] = useState(false);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [rentalAgreementPreview, setRentalAgreementPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const providerId = providerInfo?._id;

  const formik = useFormik<AddSpaceForm>({
    initialValues: {
      spaceName: "",
      spaceType: "",
      buildingName: "",
      description: "",
      floor: "",
      images: [],
      chargePerHour: 0,
      availableSpaces: 0,
      contactNumber: "",
      facilities: [],
      rentalAgreement: null,
    },
    validationSchema: spaceValidation,
    onSubmit: async (values) => {
      setSubmit(true);

      try {
        const {
          spaceName,
          spaceType,
          buildingName,
          description,
          floor,
          images,
          chargePerHour,
          availableSpaces,
          contactNumber,
          rentalAgreement
        } = values;

        // Upload images
        let imageDownloadURLs: string[] = [];
        if (images.length > 0) {
          const imageUploadPromises = images.map(async (image) => {
            const imageName = `${Date.now()}-${image.name}`;
            const imageStorageRef = ref(storage, `/space_images/${imageName}`);
            const imageSnapshot = await uploadBytes(imageStorageRef, image);
            const downloadURL = await getDownloadURL(imageSnapshot.ref);
            return downloadURL;
          });
          imageDownloadURLs = await Promise.all(imageUploadPromises);
        }

        // Upload rental agreement
        const rentalAgreementFile = rentalAgreement as File;
        const rentalAgreementName = `${Date.now()}-${rentalAgreementFile.name}`;
        const rentalAgreementStorageRef = ref(storage, `/rental_agreements/${rentalAgreementName}`);
        await uploadBytes(rentalAgreementStorageRef, rentalAgreementFile);
        const rentalAgreementDownloadURL = await getDownloadURL(rentalAgreementStorageRef);

        // Prepare the payload
        const payload = {
          spaceName,
          spaceType,
          state,
          district,
          country,
          areaName,
          buildingName,
          description,
          floor,
          images: imageDownloadURLs,
          chargePerHour,
          availableSpaces,
          contactNumber,
          facilities,
          rentalAgreement: rentalAgreementDownloadURL,       
          latitude,
          longitude,
          providerId: providerId,
        };

        // Submit form
        await createSpace(payload).unwrap();
        toast.success('Space created successfully!');
        navigate('/provider/home');
      } catch (error) {
        toast.error('Failed to create space. Please try again.');
      } finally {
        setSubmit(false);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...formik.values.images];
      newImages[index] = files[0];

      // Ensure all images are unique
      const uniqueImages = new Set(newImages.map(image => image.name));
      if (uniqueImages.size !== newImages.length) {
        toast.error('Each image must be unique.');
        return;
      }

      formik.setFieldValue('images', newImages); 

      const reader = new FileReader();
      reader.onload = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue('images', newImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleRentalAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file.type !== "application/pdf") {
        toast.error('Rental agreement must be a PDF file.');
        return;
      }

      formik.setFieldValue('rentalAgreement', file);

      const reader = new FileReader();
      reader.onload = () => {
        setRentalAgreementPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFacilitiesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[];
    setFacilities(value);
    formik.setFieldValue('facilities', value);
  };

  return (
    <div>
      <SpaceProgress />
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="horizontal-inputs">
            <InputField
              id="spaceName"
              label="Space Name"
              type="text"
              value={formik.values.spaceName}
              onChange={formik.handleChange}
              error={formik.errors.spaceName}
              touched={formik.touched.spaceName}
              placeholder="Enter space name"
            />
            <InputField
              id="spaceType"
              label="Space Type"
              type="text"
              value={formik.values.spaceType}
              onChange={formik.handleChange}
              error={formik.errors.spaceType}
              touched={formik.touched.spaceType}
              placeholder="Enter space type"
            />
          </div>
          <div className="horizontal-inputs">
            <InputField
              id="buildingName"
              label="Building Name"
              type="text"
              value={formik.values.buildingName}
              onChange={formik.handleChange}
              error={formik.errors.buildingName}
              touched={formik.touched.buildingName}
              placeholder="Enter building name"
            />
            <InputField
              id="floor"
              label="Floor"
              type="text"
              value={formik.values.floor}
              onChange={formik.handleChange}
              error={formik.errors.floor}
              touched={formik.touched.floor}
              placeholder="Enter floor"
            />
          </div>
          <div className="horizontal-inputs">
            <InputField
              id="chargePerHour"
              label="Charge Per Hour"
              type="number"
              value={formik.values.chargePerHour}
              onChange={formik.handleChange}
              error={formik.errors.chargePerHour}
              touched={formik.touched.chargePerHour}
              placeholder="Enter charge per hour"
            />
            <InputField
              id="availableSpaces"
              label="Available Spaces"
              type="number"
              value={formik.values.availableSpaces}
              onChange={formik.handleChange}
              error={formik.errors.availableSpaces}
              touched={formik.touched.availableSpaces}
              placeholder="Enter available spaces"
            />
          </div>
          <InputField
            id="contactNumber"
            label="Contact Number"
            type="text"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            error={formik.errors.contactNumber}
            touched={formik.touched.contactNumber}
            placeholder="Enter contact number"
          />
          <InputField
            id="description"
            label="Description"
            type="textarea"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.errors.description}
            touched={formik.touched.description}
            placeholder="Enter description"
            multiline
            rows={4}
          />
          <div className="facilities-container">
            <FormControl fullWidth>
              <InputLabel>Facilities</InputLabel>
              <Select
                multiple
                value={facilities}
                onChange={handleFacilitiesChange}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {FACILITIES.map((facility) => (
                  <MenuItem key={facility} value={facility}>
                    <Checkbox checked={facilities.includes(facility)} />
                    <ListItemText primary={facility} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="image-upload">
            <h4>Images</h4>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="image-upload-item">
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {imagePreviews[index] && (
                  <div className="image-preview">
                    <img src={imagePreviews[index]} alt={`Preview ${index + 1}`} width="100" />
                    <IconButton onClick={() => handleRemoveImage(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rental-agreement">
            <h4>Rental Agreement</h4>
            <input
              type="file"
              onChange={handleRentalAgreementChange}
            />
            {rentalAgreementPreview && (
              <a href={rentalAgreementPreview} target="_blank" rel="noopener noreferrer">Preview Rental Agreement</a>
            )}
          </div>

          <Button color="primary" variant="contained" fullWidth type="submit" disabled={isSubmit}>
            {isSubmit ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddSpaceDetails;

