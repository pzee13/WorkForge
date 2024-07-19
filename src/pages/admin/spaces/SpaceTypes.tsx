import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
// import {
//   DataGrid,
//   GridCellParams,
//   gridClasses,
//   GridColDef,
// } from "@mui/x-data-grid";
import moment from "moment";
// import { grey } from "@mui/material/colors";
import { Selected } from "../../../types/props";
import {
    useGetSpaceTypesMutation,
    useCreateSpaceTypeMutation,
    useUpdateSpaceTypeMutation,
} from "../../../slices/adminApiSlice";
import { SpaceType } from "../../../types/Spaces/spaceType";
import { styled } from "@mui/material/styles";



const CustomBox = styled(Box)(() => ({
  height: 400,
  width: "95%",
  padding: 2
}));

const CustomBoxes = styled(Box)(() => ({
  overflowX: 'auto'
}));

const CustomBoxess = styled(Box)(() => ({
  p: 6,
  borderRadius: 2
}));


const SpaceTypes: React.FC<Selected> = ({ setSelectedLink, link }) => {
  // const [rowId, setRowId] = useState<string | null>(null);
  const [spaceTypes, setSpaceTypes] = useState<SpaceType[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  // const [errorMessage, setErrorMessage] = useState<string>("");
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<SpaceType | null>(null);

  const [getSpaceTypeData] = useGetSpaceTypesMutation();
  const [createSpaceType] = useCreateSpaceTypeMutation();
  const [updateSpaceType] = useUpdateSpaceTypeMutation();

  useEffect(() => {
    setSelectedLink(link);
  }, [link, setSelectedLink]);

  useEffect(() => {
    const fetchSpaceTypes = async () => {
      try {
        const response = await getSpaceTypeData("").unwrap();
        setSpaceTypes(response.data); // Assuming the response contains the space types data
      } catch (error) {
        console.error("Error fetching space types:", error);
        if (error instanceof Error) {
          toast(error.message);
      } else {
          toast("An unknown error occurred.");
      }
      }
    };
    fetchSpaceTypes();
  }, [getSpaceTypeData]);

  console.log("Spacetypes:", spaceTypes);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newSpaceType = {
      _id: formData.get('_id'),
      spaceTypeName: formData.get('spaceTypeName'),
      description: formData.get('description'),
      peopleAllowed: formData.get('peopleAllowed') === 'on',
      availableSpace: formData.get('availableSpace') === 'on'
    };
    try {
      if (formMode === 'create') {
        await createSpaceType(newSpaceType).unwrap();
      } else {
        await updateSpaceType(newSpaceType).unwrap();
      }
      setShowCreateForm(false);
      setFormData(null);

      const response = await getSpaceTypeData("").unwrap();
      setSpaceTypes(response.data);

    } catch (error) {
      console.error(`Error ${formMode === 'create' ? 'creating' : 'updating'} space type:`, error);
      if (error instanceof Error) {
        toast(error.message);
    } else {
        toast("An unknown error occurred.");
    }
    }
  };

  const handleEditClick = (spaceType: SpaceType) => {
    setFormMode('edit');
    setFormData(spaceType);
    setShowCreateForm(true);
  };

  // const columns: GridColDef[] = useMemo(
  //   () => [
  //     { field: "spaceTypeName", headerName: "Space Type Name", width: 170 },
  //     { field: "description", headerName: "Description", width: 200 },
  //     { field: "peopleAllowed", headerName: "Capacity for Mob", width: 200 },
  //     { field: "availableSpace", headerName: "Multiple Bookings", width: 200 },
  //     {
  //       field: "createdAt",
  //       headerName: "Created At",
  //       width: 200,
  //       renderCell: (params: GridCellParams) =>
  //         moment(params.row.createdAt).format("DD-MM-YYYY"),
  //     },
  //     {
  //       field: "actions",
  //       headerName: "Actions",
  //       width: 150,
  //       renderCell: (params: GridCellParams) => (
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={() => handleEditClick(params.row)}
  //         >
  //           Edit
  //         </Button>
  //       ),
  //     },
  //   ],
  //   []
  // );

  return (
    <CustomBox>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 }}
      >
        Manage Space Types
      </Typography>
      {/* {errorMessage && (
        <Typography color="error" sx={{ textAlign: "center", mb: 3 }}>
          {errorMessage}
        </Typography>
      )} */}
      {!showCreateForm ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setFormMode('create');
              setFormData(null);
              setShowCreateForm(true);
            }}
            sx={{ mb: 2 }}
          >
            Create New Type
          </Button>
          <CustomBoxes>
            <table className="w-full p-6 text-s text-left whitespace-nowrap">
              <colgroup>
                <col className="w-5" />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-5" />
              </colgroup>
              <thead>
                <tr className="dark:bg-gray-300">
                  <th className="p-3">A-Z</th>
                  <th className="p-3">Space Type Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Capacity for Mob</th>
                  <th className="p-3">Multiple Bookings</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                {spaceTypes.map((spaceType) => (
                  <tr key={spaceType._id}>
                    <td className="px-3 text-2xl font-medium dark:text-gray-600">
                      {spaceType.spaceTypeName.charAt(0)}
                    </td>
                    <td className="px-3 py-2">
                      <p>{spaceType.spaceTypeName}</p>
                    </td>
                    <td className="px-3 py-2 relative group">
                      <span className="block truncate max-w-xs">{spaceType.description}</span>
                      <span className="absolute z-10 hidden p-2 text-xs bg-white border rounded-md shadow-lg group-hover:block">
                        {spaceType.description}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <p>{spaceType.peopleAllowed ? 'Yes' : 'No'}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{spaceType.availableSpace ? 'Yes' : 'No'}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{moment(spaceType.createdAt).format("DD-MM-YYYY")}</p>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        title="Open details"
                        className="p-1 rounded-full dark:text-red-400 hover:dark:bg-gray-200 focus:dark:bg-red-500"
                        onClick={() => handleEditClick(spaceType)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CustomBoxes>
        </>
      ) : (
        <CustomBoxess>
          <form onSubmit={handleSubmit} className="container flex flex-col space-y-6">
            <Typography variant="h5" component="h5" sx={{ textAlign: "center", mb: 3 }}>
              {formMode === 'create' ? 'Create New Space Type' : 'Edit Space Type'}
            </Typography>
            {formMode === 'edit' && (
              <input id="_id" name="_id" type="hidden" value={formData?._id || ''} />
            )}
            <div>
              <label htmlFor="spaceTypeName" className="text-sm">Space Type Name</label>
              <input
                id="spaceTypeName"
                name="spaceTypeName"
                type="text"
                placeholder="Space Type Name"
                required
                className="w-full rounded-md border border-gray-300 p-2"
                defaultValue={formData?.spaceTypeName || ''}
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm">Description</label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                required
                className="w-full rounded-md border border-gray-300 p-2"
                defaultValue={formData?.description || ''}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="peopleAllowed"
                name="peopleAllowed"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                defaultChecked={formData?.peopleAllowed || false}
              />
              <label htmlFor="peopleAllowed" className="text-sm">Capacity Allowed</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="availableSpace"
                name="availableSpace"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                defaultChecked={formData?.availableSpace || false}
              />
              <label htmlFor="availableSpace" className="text-sm">Available Space</label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setFormData(null);
                }}
                className="rounded-md bg-gray-500 p-2 text-white"
              >
                Cancel
              </button>
              <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
                {formMode === 'create' ? 'Create' : 'Update'}
              </button>
            </div>
          </form>
        </CustomBoxess>
      )}
    </CustomBox>
  );
};

export default SpaceTypes;


