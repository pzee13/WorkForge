import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Box, IconButton, Theme, styled } from "@mui/material";
import {
  ChevronLeft,
  Dashboard,
  PeopleAlt, Business
} from "@mui/icons-material";
import { CSSObject } from "@emotion/react";
import { useMemo, useState } from "react";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DashBoard from "../../../pages/admin/dashboard/DashBoard";
import Users from '../../../pages/admin/users/Users'
import SpaceTypes from "../../../pages/admin/spaces/SpaceTypes"
import Providers from "../../../pages/admin/providers/Providers"

import { Route, Routes, useNavigate } from "react-router-dom";


import { Open } from "../../../types/props";
import ProviderRequest from "../../../pages/admin/providers/ProviderRequest";




const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawerheader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



// sidebar for the all admin components
function SideBar({ open, setOpen }: Open) {

  const navigate = useNavigate()
  const [selectedLink, setSelectedLink] = useState('')
  
  const list = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <Dashboard />,
        link: "dashboard",
        component: <DashBoard {...{setSelectedLink,link:'dashboard'}}/>,
      },
      {
        title: "Space Types",
        icon: <Business />,
        link: "spaceTypes",
        component: <SpaceTypes {...{setSelectedLink,link:'spaceTypes'}}/>,
      },
      {
        title: "Users",
        icon: <PeopleAlt />,
        link: "users",
        component: <Users {...{setSelectedLink,link:'users'}}/>,
      },
      {
        title: "Providers",
        icon: <PeopleAlt />,
        link: "providers",
        component: <Providers {...{setSelectedLink,link:'providers'}}/>,
      },
      {
        title: "Space Requests",
        icon: <FiberNewIcon />,
        link: "getSpaceRequests",
        component: <ProviderRequest {...{setSelectedLink,link:'getSpaceRequests'}}/>,
      },
      
    ],
    []
  );
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <Drawerheader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </Drawerheader>
        <Divider />
        <List>
          {list.map((items) => (
            <ListItem
              key={items.title}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(items.link)}
                selected={selectedLink === items.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {items.icon}
                </ListItemIcon>
                <ListItemText
                  primary={items.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Drawerheader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component}/>
          ))}
        </Routes>
      </Box>
    </>
  );
}

export default SideBar;
