import React from "react";
import ReactDOM from "react-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import "fontsource-roboto";
import "./options.css";

const App: React.FC<{}> = () => {
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" component="h4">
                Weather Extension Options
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="p">
                Home city name
              </Typography>
              <TextField fullWidth placeholder="Enter a home city name" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
