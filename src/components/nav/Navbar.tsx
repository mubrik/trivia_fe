import { useState, useEffect } from "react";
// router
import { useNavigate, useLocation } from "react-router-dom";
import { RouterLinkTab } from "../utils/RouterButtonLink";
// material
import {
  Stack, Button, Typography,
  Grid, Tabs, Box, MenuItem, useMediaQuery, useTheme
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// comps
import DarkModeSwitch from "../utils/DarkModeSwitch";
import { GridItemBlurShadowContainer, StyledMenu } from "./navStyledComps";

const TEXT_SHADOW =`3px 3px 2px #52899ba1, 1px 1px 0px #a9601ac9;`;

function CenteredTabs () {

  // router
  const location = useLocation();

  const [value, setValue] = useState<number|false>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // effect to unselect tab
  // a router navllink with active class would be better but, using this clunky way for now
  useEffect(() => {
    if (location.pathname.includes("play")) {
      setValue(0);
    } else if (location.pathname.includes("about")) {
      setValue(1);
    } else {
      setValue(false);
    }
  }, [location]);

  return (
    <Box sx={{ width: '100%'}}>
      <Tabs value={value} onChange={handleChange} centered>
        <RouterLinkTab label="Play" component="a" href="play/mode" />
        <RouterLinkTab label="About" component="a" href="/about" />
      </Tabs>
    </Box>
  );
};

function NavMenu () {
  // anchor state for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [label, setLabel] = useState("Home");
  const open = Boolean(anchorEl);

  // router
  const location = useLocation();
  const navigate = useNavigate();

  // effect for name
  useEffect(() => {
    if (location.pathname.includes("play")) {
      setLabel("Play");
    } else if (location.pathname.includes("about")) {
      setLabel("About");
    } else {
      setLabel("Home");
    }
  }, [location]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (navTo?: string) => {
    if (navTo){
      navigate(navTo);
    }
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        p: "4px 8px 12px 8px"
      }}
    >
      <Button
        id="nav-menu-button"
        aria-controls={open ? 'nav-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        variant="contained"
        disableElevation
        size={"small"}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {label}
      </Button>
      <StyledMenu
        id="custom-menu"
        MenuListProps={{
          'aria-labelledby': 'custom-menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose("play/mode")} disableRipple>
          Play
        </MenuItem>
        <MenuItem onClick={() => handleClose("/about")} disableRipple>
          About
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};

export default function Navbar (): JSX.Element {

  // nav
  const navigate = useNavigate();
  // medi query
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavClick = (path: string) => {
    navigate(path ? path : "/");
  };

  return(
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={4} sm={3} sx={{p:{xm:0.5, sm: 0.8, md: 1.2}}}>
        <Stack justifyContent={"flex-end"} alignItems={"center"}>
          <Typography
            onClick={() => handleNavClick("/")}
            sx={{
              // height: "30px",
              color: "#a454a96b",
              textAlign: "center",
              fontSize: "2.2em",
              fontWeight: "600",
              textShadow: TEXT_SHADOW,
              cursor: "pointer"
            }}
          >
            Trivial
          </Typography>
        </Stack>
      </Grid>
      <GridItemBlurShadowContainer sm={7} xs={8}>
        {
          isSmallScreen ?
          <>
            <DarkModeSwitch />
            <NavMenu />
          </>
          :
          <CenteredTabs />
        }
      </GridItemBlurShadowContainer>
      <Grid item sm={2} sx={{display:{xs: "none", sm: "flex"}}} justifyContent={"flex-end"}>
        <DarkModeSwitch />
      </Grid>
    </Grid>
  );
};