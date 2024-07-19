// import { Box, CircularProgress, Fab } from "@mui/material";
// import { Check, Save } from "@mui/icons-material";
// import { green } from "@mui/material/colors";
// // import { updateStatus } from '../../../actions/user'; // Import your updateStatus function
// import { useState } from "react";
// import { useBlockUserMutation } from "../../../slices/adminApiSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
// // import { userLogOut } from "../../../slices/authSlice";
// import { MyError } from "../../../utils/validations/commonVaild";
// import { toast } from "react-toastify";
// import { GridCellParams } from "@mui/x-data-grid";

// const UsersAction = ({
//   params,
//   rowId,
//   setRowId,
// }: {
//   params: GridCellParams;
//   rowId: string | null;
//   setRowId: React.Dispatch<React.SetStateAction<string | null>>;
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [putBlockUser] = useBlockUserMutation();
//   // const dispatch = useDispatch();

//   const { userInfo } = useSelector((state: RootState) => state.auth);

//   const handleSubmit = async () => {
//     setLoading(true);
  
//     const { _id } = params.row;
//     // Call your updateStatus function here
//     try {
//       const response = await putBlockUser(_id).unwrap();
//       if (userInfo && userInfo._id === _id) {
//         // dispatch(userLogOut());
//       }
//       toast.success(response.message);
//       setSuccess(true);
//       setRowId(null);
//       setTimeout(() => {
//         setSuccess(false)
//       }, 5000);
//     } catch (err) {
//       toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
//       // Handle error appropriately, e.g., show error message
//     } finally {
//       setLoading(false);
//       setSuccess(false); // Reset success state here
//     }
//   };
  
//   return (
//     <Box
//       sx={{
//         m: 1,
//         position: "relative",
//       }}
//     >
//       {success ? (
//         <Fab
//           color="primary"
//           sx={{
//             width: 40,
//             height: 40,
//             bgcolor: green[500],
//             "&:hover": { bgcolor: green[700] },
//           }}
//         >
//           <Check />
//         </Fab>
//       ) : (
//         <Fab
//           color="primary"
//           sx={{
//             width: 40,
//             height: 40,
//           }}
//           disabled={params.id !== rowId || loading}
//           onClick={handleSubmit}
//         >
//           <Save />
//         </Fab>
//       )}
//       {loading && (
//         <CircularProgress
//           size={52}
//           sx={{
//             color: green[500],
//             position: "absolute",
//             top: -6,
//             left: -6,
//             zIndex: 1,
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default UsersAction;


import React, { useState } from "react";
import { CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { useBlockUserMutation } from "../../../slices/adminApiSlice";
import { RootState } from "../../../app/store";
import { toast } from "react-toastify";
import { GridCellParams } from "@mui/x-data-grid";
import { MyError } from "../../../utils/validations/commonVaild";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// Define the custom styled component
const CustomBox = styled(Box)(() => ({
  m: 1,
  position: "relative",
}));

const UsersAction = ({
  params,
  rowId,
  setRowId,
}: {
  params: GridCellParams;
  rowId: string | null;
  setRowId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [putBlockUser] = useBlockUserMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async () => {
    setLoading(true);
  
    const { _id } = params.row;
    try {
      const response = await putBlockUser(_id).unwrap();
      if (userInfo && userInfo._id === _id) {
        // If the blocked user is the current user, perform logout or other actions
        // dispatch(userLogOut());
      }
      toast.success(response.message);
      setSuccess(true);
      setRowId(null);
      setTimeout(() => {
        setSuccess(false)
      }, 5000);
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      // Handle error appropriately, e.g., show error message
    } finally {
      setLoading(false);
      setSuccess(false); // Reset success state here
    }
  };
  
  return (
    <CustomBox>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </CustomBox>
  );
};

export default UsersAction;
