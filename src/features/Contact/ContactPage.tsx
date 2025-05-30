import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { decrement, increment } from "./counterReducer";

export default function ContactPage() {
  const {data} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Typography variant="h2">
        Contact Page
      </Typography>
      <Typography variant="body1">
        {data}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(decrement(1))} color="error">Decrement</Button>
        <Button onClick={() => dispatch(increment(1))} color="error">Increment</Button>
        <Button onClick={() => dispatch(increment(5))} color="primary">Increment by 5</Button>
      </ButtonGroup>
    </div>
  )
}