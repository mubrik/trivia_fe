// mui
import {
  Grid, GridProps, MenuProps,
  Menu
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

// const
const BOX_SHADOW = "0px 0px 6px #0000002b";

export const GridItemBlurShadowContainer = (
  // adding disable shadow to props
  props: GridProps & {disableShadow? : boolean}
) => {

  const {children, disableShadow, ...rest } = props;

  return(
    <Grid
      item
      sx={{
        p:{xm:0.5, sm: 0.8, md: 1.2},
        display: "flex",
        alignItems: {xs: "flex-start", md: "center"},
        overflowX: "hidden",
        justifyContent: {xs: "flex-end", md: "space-evenly"},
        backdropFilter: "blur(6px)",
        borderRadius: "0px 0px 12px 12px",
        boxShadow: BOX_SHADOW,
      }}
      {...rest}
    >
      { children }
    </Grid>
  );
};

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));