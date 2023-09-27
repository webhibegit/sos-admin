import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (

    <>

    </>
  );
};

export default BarChart;
