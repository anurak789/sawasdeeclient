import { SearchOff } from "@mui/icons-material";
import { Button, Link, Paper, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Paper
        sx={{
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 6
        }}
    >
        <SearchOff sx={{fontSize: 100}} color="primary"/>
        <Typography gutterBottom variant="h3">
            Oops! something went wrong
        </Typography>
        <Button fullWidth component={Link} to={'/catalog'}>
            go to shop
        </Button>
    </Paper>
  )
}