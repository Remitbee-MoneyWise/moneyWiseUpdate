import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Stack, Button, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <Typography
          variant="h4"
          color="black"
          style={{ textDecoration: "none", fontStyle: "italic" }}
          sx={{ flexGrow: 1 }}
          component={Link}
          to="/"
        >
          {" "}
          Money Wise
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/">
            Currencies
          </Button>
          <Button component={Link} to="/profile">
            Profile
          </Button>
          <Button component={Link} to="/login" style={{ color: "red" }}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
