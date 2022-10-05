// material
import {
  Stack,
  Typography
} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';


interface IErrorPageProps {
  errorMsgTitle?: string;
  errorMsgDetail?: string;
  errorObject?: Error;
};

/**
* @description Renders a fancy error message
* @param IErrorPageProps
* @returns Error page to render
*/
export default function ErrorPage ({
  errorMsgDetail="Oops, Something went wrong..", errorMsgTitle="Error", errorObject
}: IErrorPageProps) {

  return(
    <Stack spacing={2} width={"100%"}>
      <Stack spacing={2} justifyContent={"center"}>
        {/* <Typography variant={"xLarge"}> Error </Typography> */}
        <ErrorIcon />
      </Stack>
      <Stack spacing={2}>
        <Typography variant={"h6"}> {errorMsgTitle} </Typography>
        <ErrorIcon />
      </Stack>
      <Stack spacing={2}>
        <Typography variant={"body1"}> {errorMsgDetail} </Typography>
      </Stack>
    </Stack>
  );
};
