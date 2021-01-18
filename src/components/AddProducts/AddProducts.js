import React, { useState } from "react";
import { useHistory } from "react-router";
import Header from "../Header";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Container,
  IconButton,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Snackbar,
  Tooltip,
} from "@material-ui/core";
import Ajv from "ajv";
import MuiAlert from "@material-ui/lab/Alert";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Copyright } from "../../helpers/utils";
import ProductsService from "../../services/ProductsService";
import CheckIcon from "@material-ui/icons/Check";
import HelpIcon from "@material-ui/icons/Help";
import DialogComponent from "../DialogComponent";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { GreenButton } from "../../helpers/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = {
  title: "JsonSchema",
  type: "object",
  properties: {
    productName: { type: "string" },
    productSKU: { type: "string" },
    productCategory: { type: "string" },
    region: { type: "string" },
    rating: { type: "number", minimum: 1, maximum: 5 },
    price: { type: "number", minimum: 0 },
  },
  required: [
    "productName",
    "productSKU",
    "productCategory",
    "region",
    "rating",
    "price",
  ],
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AddProducts = (props) => {
  const [responseStatus, setResponseStatus] = useState({
    successful: false,
    message: "",
  });
  const [showMessageBar, setShowMessageBar] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [jsonForm, setisJsonForm] = useState(false);
  const [fileText, setFileText] = useState("");
  const [fileName, setFilename] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const initialState = {
    productName: "",
    productSKU: "",
    productCategory: "",
    region: "",
    rating: 1,
    price: 0,
    productNameError: "",
    productSKUError: "",
    productCategoryError: "",
    regionError: "",
    ratingError: "",
    priceError: "",
  };

  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    setFilename(e.target.value.replace(/^.*[\\/]/, ""));
    fileReader.onload = (e) => {
      setFileText(e.target.result);
    };
  };

  const onFormChange = (key, value, errorKey, errorMessage) => {
    setFormState({
      ...formState,
      [key]: value,
      [errorKey]: errorMessage,
    });
  };

  const handleUpload = async (jsonData, parsed) => {
    if (jsonData === "") {
      setResponseStatus({
        ...responseStatus,
        successful: false,
        message: "Json must not be empty!",
      });
      setShowMessageBar(true);
      return;
    }
    try {
      let parsedData = !parsed ? JSON.parse(jsonData) : jsonData;
      const ajv = new Ajv({ allErrors: true });
      var validate = ajv.compile(schema);
      let invaidflag = false;
      if (Array.isArray(parsedData)) {
        parsedData.forEach(obj => {
          if(!validate(obj)) invaidflag = true;
        })
      } else {
        invaidflag = !validate(parsedData);
      }
      
      if (invaidflag) {
        setResponseStatus({
          ...responseStatus,
          message:
            "Json is invalid. Please check schema by clicking help icons (?) in this page",
          successful: false,
        });
        setShowMessageBar(true);
        return;
      }

      await ProductsService.addProductsInBulk(JSON.stringify(jsonData)).then(
        (response) => {
          setResponseStatus({
            ...responseStatus,
            message: response.data.message,
            successful: true,
          });
          setShowMessageBar(true);
          setisJsonForm(false);
          setShowDialog(false);
          setFilename("");
          setFileText("");
          setJsonText("");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setResponseStatus({
            ...responseStatus,
            successful: false,
            message: resMessage,
          });
          setShowMessageBar(true);
        }
      );
    } catch (e) {
      setResponseStatus({
        ...responseStatus,
        successful: false,
        message: "Json pasted is invalid!",
      });
      setShowMessageBar(true);
      return false;
    }
    return true;
  };

  const handleFormUpload = (e) => {
    e.preventDefault();
    let errorFlag = false;

    const {
      productName,
      productSKU,
      productCategory,
      region,
      rating,
      price,
    } = formState;

    const temp = formState;

    if (productName === "") {
      temp.productNameError = "Product Name must not be empty";
      errorFlag = true;
    } else temp.productNameError = "";

    if (productSKU === "") {
      temp.productSKUError = "Product SKU must not be empty";
      errorFlag = true;
    } else temp.productSKUError = "";

    if (productCategory === "") {
      temp.productCategoryError = "Product Category must not be empty";
      errorFlag = true;
    } else temp.productCategoryError = "";

    if (region === "") {
      temp.regionError = "Region must not be empty";
      errorFlag = true;
    } else temp.regionError = "";

    if (Number.isNaN(rating) || rating <= 0 || typeof rating === "undefined") {
      temp.ratingError = "Rating must be non negative number";
      errorFlag = true;
    } else if (rating < 1 || rating > 5) {
      temp.ratingError = "Rating must be between 1 and 5";
      errorFlag = true;
    } else temp.ratingError = "";

    if (Number.isNaN(price) || price <= 0 || typeof price === "undefined") {
      temp.priceError = "Price must be non negative number";
      errorFlag = true;
    } else temp.priceError = "";

    setFormState({
      ...formState,
      temp,
    });

    if (errorFlag) return;

    setResponseStatus({
      ...responseStatus,
      message: "",
      successful: false,
    });

    handleUpload(
      {
        productName,
        productSKU,
        productCategory,
        region,
        rating: Number(rating),
        price: Number(price),
      },
      true
    );
  };

  const messageBar = () => (
    <Snackbar
      open={showMessageBar}
      autoHideDuration={6000}
      onClose={() => setShowMessageBar(false)}
    >
      <Alert
        onClose={() => setShowMessageBar(false)}
        severity={responseStatus.successful ? "success" : "error"}
      >
        {responseStatus.message}
      </Alert>
    </Snackbar>
  );

  return (
    <div>
      <Header />
      <Container>
        <br />
        <div>
          <Typography variant="h5" color="textSecondary">
            <IconButton
              color="secondary"
              aria-label="go back"
              onClick={() => {
                history.push("/products");
              }}
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            {"Go back to Products list"}
          </Typography>
        </div>
        <br />
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={5}>
            <Typography
              className={classes.title}
              variant="h6"
              color="textSecondary"
            >
              {"Paste Json object here"}
              <Tooltip
                title="Help: know valid schema"
                aria-label="Help: know valid schema"
              >
                <IconButton
                  style={{ verticalAlign: "sub" }}
                  color="secondary"
                  aria-label="go back"
                  onClick={() => {
                    setShowDialog(true);
                  }}
                >
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <br />
            <FormControl fullWidth>
              <TextField
                id="jsonText"
                multiline
                rows={15}
                name="jsonText"
                value={jsonText}
                variant="outlined"
                onChange={(e) => {
                  setJsonText(e.target.value);
                }}
                onBlur={() => {
                  var obj = JSON.parse(jsonText);
                  setJsonText(JSON.stringify(obj, undefined, 2));
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              className={classes.title}
              variant="h6"
              color="textSecondary"
            >
              {"{or}"}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              className={classes.title}
              variant="h6"
              color="textSecondary"
            >
              {"Browse Json document"}
              <Tooltip
                title="Help: know valid schema"
                aria-label="Help: know valid schema"
              >
                <IconButton
                  style={{ verticalAlign: "sub" }}
                  color="secondary"
                  aria-label="go back"
                  onClick={() => {
                    setShowDialog(true);
                  }}
                >
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <br />
            <Button variant="contained" component="label">
              Select File
              <input
                type="file"
                hidden
                onChange={(e) => {
                  handleChange(e);
                }}
                accept=".json"
              />
            </Button>
            {fileName !== "" && (
              <div>
                <CheckIcon />
                {fileName}
              </div>
            )}
          </Grid>
          <Grid item xs={5}>
            <GreenButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
              onClick={() => handleUpload(jsonText)}
            >
              Upload
            </GreenButton>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <GreenButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
              onClick={() => handleUpload(fileText)}
            >
              Upload
            </GreenButton>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              variant="h6"
              color="textSecondary"
            >
              {
                "Alternatively, you can use form inputs to enter a single product at a time. Click"
              }
              <Tooltip title="Open json details form">
                <IconButton
                  style={{ verticalAlign: "sub" }}
                  color="secondary"
                  aria-label="go back"
                  onClick={() => {
                    setisJsonForm(true);
                    setShowDialog(true);
                  }}
                >
                  <PostAddIcon />
                </IconButton>
              </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box mt={8}>{Copyright()}</Box>
      {messageBar()}
      {showDialog && (
        <DialogComponent
          jsonForm={jsonForm}
          dialogHeader={
            !jsonForm ? "Know the valid schema" : "Enter product details"
          }
          dialogMessage={
            <div>
              {!jsonForm ? (
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <Typography
                        className={classes.title}
                        variant="h6"
                        color="textSecondary"
                      >
                        {"Schema definition:"}
                      </Typography>
                      <TextField
                        id="schema"
                        multiline
                        rows={35}
                        name="schema"
                        value={JSON.stringify(schema, undefined, 2)}
                        variant="outlined"
                        onChange={(e) => {
                          setJsonText(e.target.value);
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <Typography
                        className={classes.title}
                        variant="h6"
                        color="textSecondary"
                      >
                        {"Sample Json:"}
                      </Typography>
                      <TextField
                        id="schema"
                        multiline
                        rows={15}
                        name="schema"
                        value={JSON.stringify(
                          {
                            productName: "Product Three",
                            productSKU: "Pr-3-bevg",
                            productCategory: "beverages",
                            region: "Bangalore",
                            rating: 5,
                            price: 10000,
                          },
                          undefined,
                          4
                        )}
                        variant="outlined"
                        onChange={(e) => {
                          setJsonText(e.target.value);
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              ) : (
                <form className={classes.form} noValidate onSubmit={() => {}}>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="productName"
                          label="Product name"
                          autoComplete="false"
                          value={formState.productName || ""}
                          name="productName"
                          onChange={(e) => {
                            onFormChange(
                              "productName",
                              e.target.value,
                              "productNameError",
                              e.target.value === "" ||
                                e.target.value === undefined
                                ? "Product name must not be empty"
                                : ""
                            );
                          }}
                          onBlur={(e) => {
                            setFormState({
                              ...formState,
                              productNameError:
                                e.target.value === "" ||
                                e.target.value === undefined
                                  ? "Product name must not be empty"
                                  : "",
                            });
                          }}
                          error={formState.productNameError !== ""}
                          helperText={formState.productNameError || ""}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="productSKU"
                          label="Product SKU"
                          autoComplete="false"
                          value={formState.productSKU || ""}
                          name="productSKU"
                          onChange={(e) => {
                            onFormChange(
                              "productSKU",
                              e.target.value,
                              "productSKUError",
                              e.target.value === "" ||
                                e.target.value === undefined
                                ? "Product SKU must not be empty"
                                : ""
                            );
                          }}
                          onBlur={(e) => {
                            setFormState({
                              ...formState,
                              productSKUError:
                                e.target.value === "" ||
                                e.target.value === undefined
                                  ? "Product SKU must not be empty"
                                  : "",
                            });
                          }}
                          error={formState.productSKUError !== ""}
                          helperText={formState.productSKUError || ""}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="productCategory"
                          label="Product Category"
                          autoComplete="false"
                          value={formState.productCategory || ""}
                          name="productCategory"
                          onChange={(e) => {
                            onFormChange(
                              "productCategory",
                              e.target.value,
                              "productCategoryError",
                              e.target.value === "" ||
                                e.target.value === undefined
                                ? "Product category must not be empty"
                                : ""
                            );
                          }}
                          onBlur={(e) => {
                            setFormState({
                              ...formState,
                              productCategoryError:
                                e.target.value === "" ||
                                e.target.value === undefined
                                  ? "Product category must not be empty"
                                  : "",
                            });
                          }}
                          error={formState.productCategoryError !== ""}
                          helperText={formState.productCategoryError || ""}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="region"
                          label="Region"
                          autoComplete="false"
                          value={formState.region || ""}
                          name="region"
                          onChange={(e) => {
                            onFormChange(
                              "region",

                              e.target.value,
                              "regionError",
                              e.target.value === "" ||
                                e.target.value === undefined
                                ? "Region must not be empty"
                                : ""
                            );
                          }}
                          onBlur={(e) => {
                            setFormState({
                              ...formState,
                              regionError:
                                e.target.value === "" ||
                                e.target.value === undefined
                                  ? "Region must not be empty"
                                  : "",
                            });
                          }}
                          error={formState.regionError !== ""}
                          helperText={formState.regionError || ""}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          type="number"
                          InputProps={{ inputProps: { min: 1, max: 5 } }}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="rating"
                          label="Rating"
                          autoComplete="false"
                          value={formState.rating || ""}
                          name="rating"
                          onChange={(e) => {
                            onFormChange(
                              "rating",
                              e.target.value,
                              "ratingError",
                              Number.isNaN(e.target.value) ||
                                e.target.value <= 0 ||
                                typeof e.target.value === "undefined"
                                ? "Rating must be non negative number"
                                : e.target.value < 1 || e.target.value > 5
                                ? "Rating must be between 1 and 5"
                                : ""
                            );
                          }}
                          onBlur={(e) => {
                            onFormChange(
                              "rating",
                              e.target.value,
                              "ratingError",
                              Number.isNaN(e.target.value) ||
                                e.target.value <= 0 ||
                                typeof e.target.value === "undefined"
                                ? "Rating must be non negative number"
                                : ""
                            );
                          }}
                          error={formState.ratingError !== ""}
                          helperText={formState.ratingError || ""}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="price"
                          label="price"
                          autoComplete="false"
                          value={formState.price}
                          name="price"
                          onChange={(e) => {
                            onFormChange(
                              "price",
                              e.target.value,
                              "priceError",
                              Number.isNaN(e.target.value) ||
                                e.target.value <= 0 ||
                                typeof e.target.value === "undefined"
                                ? "Price must be non negative number"
                                : ""
                            );
                          }}
                          onBlur={(e) => {
                            onFormChange(
                              "price",
                              e.target.value,
                              "priceError",
                              Number.isNaN(e.target.value) ||
                                e.target.value <= 0 ||
                                typeof e.target.value === "undefined"
                                ? "Price must be non negative number"
                                : ""
                            );
                          }}
                          error={formState.priceError !== ""}
                          helperText={formState.priceError || ""}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}>
                        <GreenButton
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          className={classes.submit}
                          onClick={handleFormUpload}
                        >
                          Upload
                        </GreenButton>
                      </Grid>
                      <Grid item xs={4}></Grid>
                    </Grid>
                    {messageBar()}
                  </div>
                </form>
              )}
            </div>
          }
          closeAction={() => {
            setisJsonForm(false);
            setShowDialog(false);
          }}
          primaryLabel={"Ok"}
          okOnly
        />
      )}
    </div>
  );
};

const AddProductsPropTypes = {
  // always use prop types!
};

AddProducts.propTypes = AddProductsPropTypes;

export default AddProducts;
