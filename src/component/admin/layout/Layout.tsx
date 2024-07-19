import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline'; 
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {  useState } from 'react';
// import { RootState } from "../../../app/store"
import { useDispatch } from 'react-redux';
import { useLogoutAdminMutation } from '../../../slices/adminApiSlice';
import { adminLogout } from "../../../slices/authSlice"
import {  useNavigate } from 'react-router-dom'


import ExitToAppIcon from '@mui/icons-material/ExitToApp';


import SideBar from '../sidebar/SideBar'

const CustomBox = styled(Box)(({  }) => ({
  display: 'flex'
}));

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Navbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#49735A',
  borderBottomLeftRadius: open ? 20 : 10,  
  borderBottomRightRadius: open ? 20 : 10,  
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Layout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [showModal, setShowModal] = useState(false); 


  // const { adminInfo } = useSelector((state:RootState) => state.auth);
  const [logOut] = useLogoutAdminMutation();

  const confirmLogout = async () => {
    try {
      setShowModal(false);
      navigate('/admin/');
      dispatch(adminLogout());
      await logOut('').unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (

      <CustomBox>
        <CssBaseline />
        <Navbar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
             
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{flexGrow:1}}>
              SetSpace
            </Typography>
            <IconButton color="inherit" onClick={() => setShowModal(true)}>
              <ExitToAppIcon />
          </IconButton>
          </Toolbar>
          {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Are you sure you want to logout?</h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmLogout} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#49735A] text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Logout
                </button>
                <button onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </Navbar>
        <SideBar {...{open, setOpen}}/>
      </CustomBox>

  );
}
