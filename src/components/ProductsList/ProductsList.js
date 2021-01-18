import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../Header";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Grid,
  Snackbar,
  TextField,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Copyright } from "../../helpers/utils";
import ProductsService from "../../services/ProductsService";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertComponent from "../AlertComponent";
import DialogComponent from "../DialogComponent";
import { GreenButton } from "../../helpers/utils";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 650,
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
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const columns = [
  { id: "productName", label: "Product Name" },
  { id: "productCategory", label: "Product Category" },
  { id: "productSKU", label: "Product SKU" },
  { id: "region", label: "Region" },
  { id: "price", label: "Price", align: "right" },
  { id: "rating", label: "Rating", align: "right" },
];

const ProductsList = (props) => {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [jsonForm, setisJsonForm] = useState(false);
  const [showMessageBar, setShowMessageBar] = useState(false);
  const [responseStatus, setResponseStatus] = useState({
    successful: false,
    message: "",
  });

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchProducts = async () => {
    try {
      const response = await ProductsService.getAllProducts();
      setProducts(response); 
    } catch (error) {
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
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProduct = async (id) => {
    await ProductsService.deleteProduct(id).then(
      (response) => {
        setResponseStatus({
          ...responseStatus,
          message: response.data.message,
          successful: true,
        });
        setisJsonForm(false);
        setShowDialog(false);
        fetchProducts();
        setShowMessageBar(true);
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
    fetchProducts();
  };

  const onFormChange = (key, value, errorKey, errorMessage) => {
    setFormState({
      ...formState,
      [key]: value,
      [errorKey]: errorMessage,
    });
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

  const handleFormUpdate = async (e) => {
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

    const data = {
      productName,
      productSKU,
      productCategory,
      region,
      rating,
      price,
    };

    await ProductsService.updateProduct(id, JSON.stringify(data)).then(
      (response) => {
        setResponseStatus({
          ...responseStatus,
          message: response.data.message,
          successful: true,
        });
        setisJsonForm(false);
        setShowDialog(false);
        fetchProducts();
        setShowMessageBar(true);
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
  };

  return (
    <div>
      <Header />
      <Container>
        <br />
        <div>
          <Typography variant="h5" color="textSecondary">
            {"Add Products"}
            <IconButton
              color="secondary"
              aria-label="add to shopping cart"
              onClick={() => {
                history.push("/add-products");
              }}
            >
              <AddShoppingCartIcon fontSize="large" />
            </IconButton>
          </Typography>
        </div>
        <br />
        <Paper className={classes.root}>
          <Typography
            className={classes.title}
            variant="h6"
            color="textSecondary"
          >
            Products Available
          </Typography>

          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              className={classes.table}
              size="small"
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell align={column.align} key={column.id}>
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, id) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={`row.code+${id}`}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell align="right">
                          <Tooltip title="Edit this record">
                            <IconButton
                              aria-label="go back"
                              onClick={() => {
                                setId(row["_id"]);
                                setShowDialog(true);
                                const temp = {
                                  price: row.price,
                                  productCategory: row.productCategory,
                                  productName: row.productName,
                                  productSKU: row.productSKU,
                                  rating: row.rating,
                                  region: row.region,
                                  productNameError: "",
                                  productSKUError: "",
                                  productCategoryError: "",
                                  regionError: "",
                                  ratingError: "",
                                  priceError: "",
                                };
                                setFormState(temp);
                              }}
                            >
                              <CreateIcon style={{ color: "#21bf88" }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete this record">
                            <IconButton
                              color="secondary"
                              aria-label="go back"
                              onClick={() => {
                                setId(row["_id"]);
                                setOpen(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Box mt={8}>{Copyright()}</Box>
      {open && (
        <AlertComponent
          dialogHeader={"Confirm action!!"}
          dialogMessage={"Are you sure to delete this record"}
          closeAction={() => {
            setOpen(false);
          }}
          primaryAction={() => {
            deleteProduct(id);
            setOpen(false);
            fetchProducts();
          }}
          closeLabel={"Cancel"}
          primaryLabel={"Delete"}
          okOnly={false}
        />
      )}
      {showDialog && (
        <DialogComponent
          jsonForm={jsonForm}
          dialogHeader={"Enter product details"}
          dialogMessage={
            <div>
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
                        onClick={handleFormUpdate} //todo
                      >
                        Update
                      </GreenButton>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </div>
              </form>
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
      {messageBar()}
    </div>
  );
};

const ProductsListPropTypes = {
  // always use prop types!
};

ProductsList.propTypes = ProductsListPropTypes;

export default ProductsList;
