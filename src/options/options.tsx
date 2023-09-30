import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";
import "fontsource-roboto";
import "./options.css";

type FormState = "ready" | "save";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");
  const isSavingData = "save" === formState;

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleOverlayChange = (hasOverlay: boolean) => {
    setOptions({
      ...options,
      hasStorageOverlay: hasOverlay,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState("save");
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  useEffect(() => {
    getStoredOptions().then((storedOptions) => {
      setOptions(storedOptions);
    });
  }, []);

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          {options && (
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h4" component="h4">
                  Weather Extension Options
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Home city name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter a home city name"
                  value={options.homeCity}
                  onChange={(e) => handleHomeCityChange(e.target.value)}
                  disabled={isSavingData}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Overlay on Webpage
                </Typography>
                <Switch
                  color="primary"
                  checked={options.hasStorageOverlay}
                  disabled={isSavingData}
                  onChange={(e) => handleOverlayChange(e.target.checked)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveButtonClick}
                  disabled={isSavingData}
                >
                  {isSavingData ? "Saving..." : "Save"}
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
