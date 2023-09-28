import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const [isOpenDrop, setIsOpenDrop] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsOpenDrop(false)
    navigate('/login');
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
        </Box>

        {/* ICONS */}
        <Box display="flex">

          {/* night mode */}
          {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}

          {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}

          {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}

          {/* user Icon */}
          <IconButton onClick={() => setIsOpenDrop(!isOpenDrop)}>
            <PersonOutlinedIcon />
          </IconButton>

          {isOpenDrop &&
            <div className="profile-dropdown">
              <p onClick={handleLogout}>logout</p>
            </div>
          }
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
