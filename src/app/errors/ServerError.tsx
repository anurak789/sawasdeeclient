import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
    const {state} = useLocation();
  return (
    <Paper>
        {state.error ? (
            <>
                <Typography gutterBottom variant="h5">
                    {state.error.title}
                </Typography>
                <Divider/>
                <Typography variant="body1" sx={{p: 4}}>{state.error.detail}</Typography>
            </>
        ): (
            <Typography variant="h5">Server Error</Typography>
        )}

    </Paper>
  )
}