import * as React from 'react';
// material
import { 
  ButtonProps, Button, useMediaQuery, IconButton,
  Tab, TabProps
} from '@mui/material';
// react router
import { Link as RouterLink, useNavigate} from 'react-router-dom';

function GenericCustomComponent<C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>,
) {
  /* ... */
}

type CastedForwardRefButtonType = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>,
  ref?: React.Ref<HTMLButtonElement>
) => React.ReactElement;

type CastedForwardRefButtonLinkType = <C extends React.ElementType>(
  props: ButtonProps<C, { to: string }>,
  ref?: React.Ref<HTMLButtonElement>
) => React.ReactElement;

const CastedForwardRefButtonFnc: CastedForwardRefButtonType = (props, ref) => {
  const { children, ...rest } = props;
  return (
    <Button ref={ref} {...rest}>
      {children}
    </Button>
  );
};

const RouterLinkButtonComp: CastedForwardRefButtonLinkType = (props, ref) => {
  const { children, to, ...rest } = props;

  const _props = {...rest, component: RouterLink};

  return (
    <Button ref={ref} {..._props} to={to}>
      {children}
    </Button>
  );
};

export const RouterLinkTab = ({href, ...rest}: TabProps & {href: string, component: "a"}) => {

  const navigate = useNavigate();

  return (
    <Tab
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
};

const RouterLinkResponsiveButton: CastedForwardRefButtonLinkType = (props, ref) => {

  const isSmallScreen = useMediaQuery('(max-width:382px)');

  const { children, to, endIcon, ...rest } = props;

  const _props = {...rest, component: RouterLink};

  return (
    <>
    {
      isSmallScreen ?
      <IconButton color={rest.color} {..._props} to={to}>
        { endIcon }
      </IconButton> : 
      <Button ref={ref} {..._props} to={to} endIcon={endIcon}>
        { children }
      </Button>
    }
    </>
  );
};

export const RouterLinkButton = React.forwardRef(
  RouterLinkButtonComp
) as CastedForwardRefButtonLinkType;

export const RespRouterLinkButton = React.forwardRef(
  RouterLinkResponsiveButton
) as CastedForwardRefButtonLinkType;

export const CastedForwardRefButton = React.forwardRef(
  CastedForwardRefButtonFnc
) as CastedForwardRefButtonType;