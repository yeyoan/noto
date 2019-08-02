import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    alignSelf: "center",
    maxWidth: 445,
    padding: theme.spacing(4)
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: theme.spacing(4)
  },
  textField: {
    margin: theme.spacing(1),
    width: 250
  },
  button: {
    marginTop: theme.spacing(1),
    width: 250
  },
  dense: {
    paddingTop: theme.spacing(4)
  },
  subheader: {
    marginBottom: theme.spacing(4)
  }
}));

const Login = ({ user, say }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [createAccount, setCreateAccount] = useState(false);
  document.title = "Welcome Back";

  const validate = event => {
    event.preventDefault();
    let validatedUser = user.validate(values.email, values.password);
    if (validatedUser) {
      user.logIn(validatedUser);
      say("Successfully signed in");
    } else {
      say("Email or password is incorrect");
    }
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const validateEmail = email => {
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h3">Noto</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                className={classes.subheader}
              >
                Remember everything important.
              </Typography>
            </Grid>
            {createAccount ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange("name")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="password"
                    label="Password"
                    className={classes.textField}
                    value={values.password}
                    onChange={handleChange("password")}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="password"
                    label="Confirm Password"
                    className={classes.textField}
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={event => {
                      if (
                        values.name.length === 0 ||
                        values.email.length === 0 ||
                        values.password.length === 0 ||
                        values.confirmPassword.length === 0
                      ) {
                        say("Please fill out all fields");
                      } else if (!validateEmail(values.email)) {
                        say("Invalid email entered");
                      } else if (values.password !== values.confirmPassword) {
                        say("Passwords do not match");
                      } else {
                        user.create(values.name, values.email, values.password);
                        setValues({
                          name: "",
                          email: "",
                          password: "",
                          confirmPassword: ""
                        });
                        setCreateAccount(false);
                      }
                    }}
                  >
                    Continue
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className={classes.dense}
                  >
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    size="small"
                    onClick={event => setCreateAccount(false)}
                    fullWidth
                    color="primary"
                  >
                    Sign in
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="password"
                    label="Password"
                    className={classes.textField}
                    value={values.password}
                    onChange={handleChange("password")}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={validate}
                  >
                    Continue
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className={classes.dense}
                  >
                    Don't have an account?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    size="small"
                    onClick={event => setCreateAccount(true)}
                    fullWidth
                    color="primary"
                  >
                    Create account
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
