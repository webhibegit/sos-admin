import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

// icons
import CategoryIcon from "@mui/icons-material/Category";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FactoryIcon from "@mui/icons-material/Factory";
import MovieIcon from "@mui/icons-material/Movie";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const sidebarItems = [
  // category
  {
    heading: "Brand",
    subHeading: [
      {
        title: "Add Brand",
        link: "/add-category",
        icon: <CategoryIcon />,
      },
      {
        title: "Manage Brand",
        link: "/manage-category",
        icon: <CategoryIcon />,
      },
    ],
  },

  // //Brand
  // {
  //   heading: "Brand",
  //   subHeading: [
  //     {
  //       title: "Add Brand",
  //       link: "/add-brand",
  //       icon: <CategoryIcon />
  //     },
  //     {
  //       title: "Manage Brand",
  //       link: "/manage-brand",
  //       icon: <CategoryIcon />
  //     },
  //   ]
  // },

  //Industry
  {
    heading: "Industry",
    subHeading: [
      {
        title: "Add Industry",
        link: "/add-industry",
        icon: <FactoryIcon />,
      },
      {
        title: "Manage Industry",
        link: "/manage-industry",
        icon: <FactoryIcon />,
      },
    ],
  },

  //Media
  {
    heading: "Media",
    subHeading: [
      {
        title: "Add Media",
        link: "/add-media",
        icon: <MovieIcon />,
      },
      {
        title: "Manage Media",
        link: "/manage-media",
        icon: <MovieIcon />,
      },
    ],
  },

  // work
  {
    heading: "Work",
    subHeading: [
      {
        title: "Add Work",
        link: "/add-work",
        icon: <FollowTheSignsIcon />,
      },
      {
        title: "Manage Work",
        link: "/manage-work",
        icon: <FollowTheSignsIcon />,
      },
    ],
  },

  // News
  {
    heading: "News",
    subHeading: [
      {
        title: "Add News",
        link: "/add-news",
        icon: <NewspaperIcon />,
      },
      {
        title: "Manage News",
        link: "/manage-news",
        icon: <NewspaperIcon />,
      },
    ],
  },

  //Case Study
  {
    heading: "Case Study",
    subHeading: [
      {
        title: "Add Case Study",
        link: "/add-case-study",
        icon: <NewspaperIcon />,
      },
      {
        title: "Manage Case Study",
        link: "/manage-case-study",
        icon: <NewspaperIcon />,
      },
    ],
  },

  //People
  {
    heading: "People",
    subHeading: [
      {
        title: "Add and Manage Thought Leaders",
        link: "/add-manage-thought-leaders",
        icon: <NewspaperIcon />,
      },
      {
        title: "Add and Manage Trailblazers",
        link: "/add-manage-trailblazers",
        icon: <NewspaperIcon />,
      },
    ],
  },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  SOS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )} */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* dashboard */}
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}
            {/* <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {sidebarItems.map((item, i) => (
              <Box key={i}>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  {item?.heading}
                </Typography>

                {item?.subHeading?.map((ele, i) => (
                  <Item
                    key={i}
                    title={ele?.title}
                    to={ele?.link}
                    icon={ele?.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}

                {/* <Item
                    title="Manage Cateory"
                    to="/manage-category"
                    icon={<CategoryIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
              </Box>
            ))}

            {/* Category */}
            {/* <Box>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Category
              </Typography>
              <Item
                title="Add Cateory"
                to="/add-category"
                icon={<CategoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Manage Cateory"
                to="/manage-category"
                icon={<CategoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box> */}

            {/* Work */}
            {/* <Box>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Work
              </Typography>
              <Item
                title="Add Work"
                to="/add-work"
                icon={<FollowTheSignsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Manage Work"
                to="/manage-work"
                icon={<FollowTheSignsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box> */}

            {/* News */}
            {/* <Box>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                News
              </Typography>
              <Item
                title="Add News"
                to="/add-news"
                icon={<NewspaperIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Manage News"
                to="/manage-news"
                icon={<NewspaperIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box> */}

            {/* <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
