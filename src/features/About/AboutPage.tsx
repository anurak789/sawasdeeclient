import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [triggle400Error] =  useLazyGet400ErrorQuery();
  const [triggle401Error] =  useLazyGet401ErrorQuery();
  const [triggle404Error] =  useLazyGet404ErrorQuery();
  const [triggle500Error] =  useLazyGet500ErrorQuery();
  const [triggleValidationError] =  useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggleValidationError().unwrap();
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error 
        && typeof (error as {message: unknown}).message === 'string') {
        const errorArray = (error as {message: string}).message.split('| ');
        setValidationErrors(errorArray);
      }
    }
  }

  return (
    <div>
      <Container maxWidth = 'lg'>
        <Typography gutterBottom variant="h3">Error for testing</Typography>
        <ButtonGroup fullWidth>
          <Button variant="contained" onClick={() => triggle400Error()
            .catch(err => console.log(err))}>
              Test 400 error
          </Button>
          <Button variant="contained" onClick={() => triggle401Error()
            .catch(err => console.log(err))}>
              Test 401 error
          </Button>
          <Button variant="contained" onClick={() => triggle404Error()
            .catch(err => console.log(err))}>
              Test 404 error
          </Button>
          <Button variant="contained" onClick={() => triggle500Error()
            .catch(err => console.log(err))}>
              Test 500 error
          </Button>
          <Button variant="contained" onClick={getValidationError}>
              Test Validation error
          </Button>
        </ButtonGroup>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map(err => (
                <ListItem key={err}>{err}</ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Container>
    </div>
  )
}