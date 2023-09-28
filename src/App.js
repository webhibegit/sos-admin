import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AddCategory from "./pages/Category/AddCategory";
import ManageCAtegory from "./pages/Category/ManageCAtegory";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AddWork from "./pages/Work/AddWork";
import ManageWork from "./pages/Work/ManageWork";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout/Layout";
import Login from "./Authentication/Login";
import PrivateRouter from "./privateRouter/PrivateRouter";
import EditCategory from "./pages/Category/EditCategory";
import EditWork from "./pages/Work/EditWork";
import AddNews from "./pages/News/AddNews";
import ManageNews from "./pages/News/ManageNews";
import EditNews from "./pages/News/EditNews";

import './Custom.css'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <div className="app"> */}

        <Toaster
          position="top-center"
          reverseOrder={false}
        />


        {/* <Sidebar isSidebar={isSidebar} /> */}
        {/* <main className="content"> */}
        {/* <Topbar setIsSidebar={setIsSidebar} /> */}
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route element={<Layout isSidebar={isSidebar} setIsSidebar={setIsSidebar} />} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />

              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/manage-category" element={<ManageCAtegory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />

              <Route path="/add-work" element={<AddWork />} />
              <Route path="/manage-work" element={<ManageWork />} />
              <Route path="/edit-work/:id" element={<EditWork />} />

              <Route path="/add-news" element={<AddNews />} />
              <Route path="/manage-news" element={<ManageNews />} />
              <Route path="/edit-news/:id" element={<EditNews />} />

              <Route path="*" element={<NotFoundPage />} />

            </Route>
          </Route>

          <Route path="/login" element={<Login />} />

          {/* <Route path="/form" element={<Form />} /> */}
          {/* <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} /> */}
          {/* <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}

        </Routes>
        {/* </main> */}
        {/* </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
