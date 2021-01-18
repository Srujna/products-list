import axios from "axios";

const API_URL = "http://localhost:5000/api/";

class ProductsService {
  getAllProducts() {
    return axios.get(`${API_URL}products`).then((response) => {
      return response.data.data;
    });
  }

  addProductsInBulk(jsonText) {
    let config = {
      method: "post",
      url: `${API_URL}productBulk`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.parse(jsonText.replace(/\\n/g, "")),
    };
    return axios(config);
  }

  deleteProduct(id) {
    let FormData = require("form-data");
    let data = new FormData();
    data.append("id", id);

    let config = {
      method: "delete",
      url: `${API_URL}deleteProduct/${id}`,
      data: data,
    };

    return axios(config);
  }

  updateProduct(id, data) {
    //var data = JSON.stringify({"productName":"Product Test drive","productSKU":"Pr-1-foo","productCategory":"food","region":"Hyderabad","rating":5,"price":1000});
    
    var config = {
      method: 'put',
      url: `${API_URL}updateProduct/${id}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);
  }
}

export default new ProductsService();
