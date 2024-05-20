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
import Footer from '../../../component/provider/footer/Footer';
import Navbar from '../../../component/provider/navbar/Navbar';
import SpaceProgress from './SpaceProgress';
import { RootState } from "../../../app/store";
import { TextField, Button, CircularProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function AddSpaceDetails() {
  const [createSpace] = useProviderCreateSpaceMutation();
  const { latitude, longitude } = useSelector((state: RootState) => state.location);
  const { areaName,state,district } = useSelector((state: RootState) => state.location)
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const [isSubmit, setSubmit] = useState(false);
  const [facilities, setFacilities] = useState<string[]>(['']);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [rentalAgreementPreview, setRentalAgreementPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const providerId = providerInfo?._id

  console.log("areaName:",areaName)

  console.log("providerId", providerId)
  const formik = useFormik<AddSpaceForm>({
    initialValues: {
      spaceName: "",
      spaceType: "",
      state: "",
      district: "",
      city: "",
      areaName: "",
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
          state,
          district,
          city,
          areaName,
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
          city,
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

  const handleRentalAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      formik.setFieldValue('rentalAgreement', files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setRentalAgreementPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddFacility = () => {
    setFacilities([...facilities, '']);
  };

  const handleRemoveFacility = (index: number) => {
    const newFacilities = facilities.filter((_, i) => i !== index);
    setFacilities(newFacilities);
  };

  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFacilities = [...facilities];
    newFacilities[index] = e.target.value;
    setFacilities(newFacilities);
    formik.setFieldValue('facilities', newFacilities);
  };

  return (
    <div>
      <Navbar />
      <SpaceProgress/>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="spaceName"
            name="spaceName"
            label="Space Name"
            value={formik.values.spaceName}
            onChange={formik.handleChange}
            error={formik.touched.spaceName && Boolean(formik.errors.spaceName)}
            helperText={formik.touched.spaceName && formik.errors.spaceName}
          />
           <TextField
              label="Space Type"
              variant="outlined"
              {...formik.getFieldProps("spaceType")}
              error={formik.touched.spaceType && !!formik.errors.spaceType}
              helperText={formik.touched.spaceType && formik.errors.spaceType}
            />
            <TextField
              label="State"
              variant="outlined"
              {...formik.getFieldProps("state")}
              error={formik.touched.state && !!formik.errors.state}
              helperText={formik.touched.state && formik.errors.state}
            />
            <TextField
              label="District"
              variant="outlined"
              {...formik.getFieldProps("district")}
              error={formik.touched.district && !!formik.errors.district}
              helperText={formik.touched.district && formik.errors.district}
            />
            <TextField
              label="City"
              variant="outlined"
              {...formik.getFieldProps("city")}
              error={formik.touched.city && !!formik.errors.city}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              label="Area Name"
              variant="outlined"
              {...formik.getFieldProps("areaName")}
              error={formik.touched.areaName && !!formik.errors.areaName}
              helperText={formik.touched.areaName && formik.errors.areaName}
            />
            <TextField
              label="Building Name"
              variant="outlined"
              {...formik.getFieldProps("buildingName")}
              error={formik.touched.buildingName && !!formik.errors.buildingName}
              helperText={formik.touched.buildingName && formik.errors.buildingName}
            />
            <TextField
              label="Floor"
              variant="outlined"
              {...formik.getFieldProps("floor")}
              error={formik.touched.floor && !!formik.errors.floor}
              helperText={formik.touched.floor && formik.errors.floor}
            />
            <TextField
              label="Charge Per Hour"
              variant="outlined"
              type="number"
              {...formik.getFieldProps("chargePerHour")}
              error={formik.touched.chargePerHour && !!formik.errors.chargePerHour}
              helperText={formik.touched.chargePerHour && formik.errors.chargePerHour}
            />
            <TextField
              label="Available Spaces"
              variant="outlined"
              type="number"
              {...formik.getFieldProps("availableSpaces")}
              error={formik.touched.availableSpaces && !!formik.errors.availableSpaces}
              helperText={formik.touched.availableSpaces && formik.errors.availableSpaces}
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              {...formik.getFieldProps("contactNumber")}
              error={formik.touched.contactNumber && !!formik.errors.contactNumber}
              helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              {...formik.getFieldProps("description")}
              error={formik.touched.description && !!formik.errors.description}
              helperText={formik.touched.description && formik.errors.description}
            />
          {/* Add other form fields similarly */}

          <div>
            <h4>Facilities</h4>
            {facilities.map((facility, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  value={facility}
                  onChange={(e) => handleFacilityChange(e, index)}
                />
                <IconButton onClick={() => handleRemoveFacility(index)}>
                  <RemoveIcon />
                </IconButton>
              </div>
            ))}
            <Button onClick={handleAddFacility} startIcon={<AddIcon />}>
              Add Facility
            </Button>
          </div>

          <div>
            <h4>Images</h4>
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {imagePreviews[index] && (
                  <img src={imagePreviews[index]} alt={`Preview ${index + 1}`} width="100" />
                )}
              </div>
            ))}
          </div>

          <div>
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
      <Footer />
    </div>
  );
}

export default AddSpaceDetails;
