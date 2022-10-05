import { useState, useMemo } from "react";
// router
import { useNavigate } from "react-router-dom";
// material
import { 
  Stack, TextField, Button, Typography,
  Box, Container,
} from "@mui/material";
// custom
import { 
  CustomDifficultySelect, CustomMultiSelect,
  AnswerModeOption, StyledOptionDiv
} from "./CustomSetupComps";
// Store
import { useStore } from "../../store/StoreContext";
// query
import { useGetTriviaTags, useGetTriviaCategories } from "../queries/queries";

export default function FreePlaySetup () {

  // state
  const [limit, setLimit] = useState(30);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"hard"|"easy"|"medium">('easy');
  // store
  const { dispatchToStore, freePlaySettings } = useStore();
  // tags
  const { data: tags } = useGetTriviaTags();
  const { data: categories } = useGetTriviaCategories();
  // nav
  const navigate = useNavigate();

  const handleStartGame = () => {
    // dispatchToStore({
    //   type: "UPDATE_FREE_SETTINGS",
    //   settings: {
    //     limit,
    //     categories: selectedCategories,
    //     tags: selectedTags
    //   }
    // });

    navigate("../free");
  };

  const handleAmountChange = (value: string) => {  
    const _amt = Number(value);

    dispatchToStore({
      type: "UPDATE_FREE_SETTINGS", 
      settings: {
        // check amt is less than 0 or over 30
        limit: (_amt < 0 || Number.isNaN(_amt)) ? 0 : (_amt > 30) ? 30 : _amt
      }
    });

    // if (_amt < 0 || Number.isNaN(_amt)) {
    //   dispatchToStore({
    //     type: "UPDATE_FREE_SETTINGS", 
    //     settings: {
    //       limit: (_amt < 0 || Number.isNaN(_amt)) ? 0 : (_amt > 30) ? 30 : _amt
    //     }
    //   });
    //   setLimit(0);
    //   return
    // } else if (_amt > 30) {
    //   dispatchToStore({
    //     type: "UPDATE_FREE_SETTINGS", 
    //     settings: {
    //       limit: 30
    //     }
    //   });
    //   setLimit(30);
    //   return
    // }
    // setLimit(_amt);
  };

  const handleChange = (type: "cat"|"tag"|"limit", value: string|string[]) => {
    switch (type) {
      case "cat":
        dispatchToStore({
          type: "UPDATE_FREE_SETTINGS", 
          settings: {
            categories: typeof value === 'string' ? value.split(',') : value
          }
        });
        // setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
        break;
      
      case "tag":
        dispatchToStore({
          type: "UPDATE_FREE_SETTINGS", 
          settings: {
            tags: typeof value === 'string' ? value.split(',') : value
          }
        });
        // setSelectedTags(typeof value === 'string' ? value.split(',') : value);
        break;

      case "limit":
        const _amt = Number(value as string);
        dispatchToStore({
          type: "UPDATE_FREE_SETTINGS", 
          settings: {
            // check amt is less than 5 or over 30
            limit: (_amt < 5 || Number.isNaN(_amt)) ? 5 : (_amt > 30) ? 30 : _amt
          }
        });

      default:
        break;
    }
  };

  const handleClear = (type: "cat"|"tag") => {
    switch (type) {
      case "cat":
        dispatchToStore({
          type: "UPDATE_TIMED_SETTINGS", 
          settings: {
            categories: []
          }
        });
        break;
      
      case "tag":
        dispatchToStore({
          type: "UPDATE_TIMED_SETTINGS", 
          settings: {
            tags: []
          }
        });
        break;
      
      default:
        break;
    }
  };

  return(
    <Stack
      direction={"column"}
      justifyContent={"flex-start"}
      height={"100%"}
    >
      <Box alignSelf={"center"} sx={{p:1}}>
        <Typography variant={"h6"}> Game Setup </Typography>
      </Box>
      <StyledOptionDiv>
        {/* <Typography variant={"caption"} gutterBottom={true} sx={{marginBottom: 2}}> Amount </Typography> */}
        <Stack direction={"row"}>
          <TextField id="outlined-minutes" label="Amount of Questions" type="number" value={freePlaySettings.limit}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleChange("limit", e.target.value)}
            sx={{m:1}}
          />
        </Stack>
      </StyledOptionDiv>
      <StyledOptionDiv>
        <AnswerModeOption 
          value={freePlaySettings.displayAnswer}
          onChange={(value) => dispatchToStore({
              type: "UPDATE_FREE_SETTINGS", 
              settings: {
                displayAnswer: value
              }
            })
          }
        />
      </StyledOptionDiv>
      <StyledOptionDiv>
        <CustomMultiSelect
          label={"Tags"}
          items={tags}
          selecteditems={freePlaySettings.tags}
          onChange={handleChange}
          onClear={handleClear}
          type={"tag"}
        />
        <CustomMultiSelect
          label={"Categories"}
          items={categories}
          selecteditems={freePlaySettings.categories}
          onChange={handleChange}
          onClear={handleClear}
          type={"cat"}
        />
        <CustomDifficultySelect 
          label={"Difficulty"}
          difficulty={freePlaySettings.difficulty}
          onChange={(value) => dispatchToStore({
              type: "UPDATE_FREE_SETTINGS", 
              settings: {
                difficulty: value
              }
            })
          }
        />
      </StyledOptionDiv>
      <Button onClick={handleStartGame}> Start Game </Button>
    </Stack>
  );
};
