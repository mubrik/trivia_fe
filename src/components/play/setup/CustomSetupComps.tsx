import { useState, useMemo, ReactNode } from "react";
// material
import { 
  Stack, Typography, Checkbox, FormControlLabel,
  Box, Chip, Select, FormControl, InputLabel, MenuItem,
  OutlinedInput, FormHelperText, LinearProgress, useMediaQuery, Button
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// Store
import { useStore } from "../../store/StoreContext";
// query
import { useGetTriviaTags, useGetTriviaCategories } from "../queries/queries";
// animate
import { motion } from "framer-motion";

// styled divs
export const StyledOptionDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignSelf: "stretch",
  alignItems: "center", 
  borderRadius: "8px", 
  padding: "8px",
  marginBottom: "22px",
}));

export const StyledQuestionBoxDiv = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%", // mobile
  padding: theme.spacing(0.8),
  textAlign: "center",
  [theme.breakpoints.up("md")]:{
    width: "88%",
    padding: theme.spacing(2),
  }
}));

export const StyledCountownPositionDiv = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
}));

export const LinearLoading = () => {

  return(
    <Stack spacing={1} sx={{width: "100%"}}>
      <LinearProgress color="secondary"/>
    </Stack>
  );
};

// motion comps
export const StyledFullWidthMotionDiv = ({ children, motionKey }: {children: ReactNode, motionKey: string}) => {
  return (
    <motion.div
      key={motionKey}
      initial={{ opacity: 0, width: "100%" }}
      animate={{ opacity: 1, width: "100%"}}
      exit={{ opacity: 0, width: "100%" }}
    >
      { children }
    </motion.div>
  )
};

interface ICustomSelectProps {
  items?: string[];
  selecteditems: string[];
  onChange: (type: "cat" | "tag", value: string | string[]) => void;
  onClear: (type: "cat" | "tag") => void;
  label: string;
  type: "cat"|"tag";
}

export const CustomMultiSelect = ({items, selecteditems, onChange, label, type, onClear}: ICustomSelectProps) => {

  const isSmallScreen = useMediaQuery('(max-width:382px)');
  
  return(
    <Stack direction={"row"} flexWrap={"wrap"}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`multi-chip-${type}-label`}> { label } </InputLabel>
        <Select
          multiple
          value={selecteditems}
          onChange={(e) => onChange(type, e.target.value)}
          input={<OutlinedInput id={`select-multiple-chip-${type}`} label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {items?.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {
        isSmallScreen ?
        <Button variant="outlined" color="secondary" 
          startIcon={<ClearIcon />} sx={{ml:1.2}} aria-label="clear">
          clear
        </Button> :
        <IconButton aria-label="clear" onClick={() => onClear(type)}>
          <ClearIcon color="secondary"/>
        </IconButton>
      }
    </Stack>
  );
};

type tDifficuty = "easy"|"medium"|"hard";
interface ICustomDifficultyProps {
  label: string;
  difficulty: tDifficuty;
  onChange(param: tDifficuty): void;
}

export const CustomDifficultySelect = ({ difficulty, onChange, label }: ICustomDifficultyProps) => {

  return(
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="simple-select-helper-label">{ label }</InputLabel>
      <Select
        labelId="imple-select-helper-label"
        id="simple-select-helper"
        value={difficulty}
        label="Age"
        onChange={(e) => onChange(e.target.value as tDifficuty)}
      >
        <MenuItem value={"easy"}>Easy</MenuItem>
        <MenuItem value={"medium"}>Medium</MenuItem>
        <MenuItem value={"hard"}>Hard</MenuItem>
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
}


interface IAnswerModeOptionProps {
  value: boolean;
  onChange(param: boolean): void;
}

export const AnswerModeOption = ({value, onChange}: IAnswerModeOptionProps) => {


  return(
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      {/* <Typography variant={"caption"} gutterBottom={true} sx={{marginBottom: 2}}> Answer </Typography> */}
      <FormControlLabel 
        control={<Checkbox checked={value} />}
        label="Show Answer?" 
        labelPlacement="start"
        onChange={(e, v) => onChange(v)}
      />
      <FormHelperText>after guess</FormHelperText>
    </FormControl>
  );
};


// export const GeneralSettingComp = () => {

//   const [limit, setLimit] = useState(30);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [difficulty, setDifficulty] = useState<"hard"|"easy"|"medium">('easy');
//   // tags
//   const { data: tags } = useGetTriviaTags();
//   const { data: categories } = useGetTriviaCategories();
//   // store
//   const { dispatchToStore } = useStore();

//   const handleMultipleSelect = (type: "cat"|"tag", value: string|string[]) => {
//     switch (type) {
//       case "cat":
//         // dispatchToStore()
//         setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
//         break;
      
//       case "tag":
//         setSelectedTags(typeof value === 'string' ? value.split(',') : value);
//         break;

//       default:
//         break;
//     }
//   };

//   const handleSettingsChange = () => {

//   };


//   <Stack>
//     <CustomMultiSelect
//       label={"Tags"}
//       items={tags}
//       selecteditems={selectedTags}
//       onChange={handleMultipleSelect}
//       type={"tag"}
//     />
//     <CustomMultiSelect
//       label={"Categories"}
//       items={categories}
//       selecteditems={selectedCategories}
//       onChange={handleMultipleSelect}
//       type={"cat"}
//     />
//     <CustomDifficultySelect 
//       label={"Difficulty"}
//       difficulty={difficulty}
//       onChange={setDifficulty}
//     />
//   </Stack>
// };