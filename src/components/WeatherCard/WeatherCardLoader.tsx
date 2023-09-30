import React from "react";
import { Stack, Skeleton } from "@mui/material";

const WeatherCardLoader: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </Stack>
  );
};
export default WeatherCardLoader;
