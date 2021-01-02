import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import Axios from "axios";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './DataView.css'

class GuestHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: "1000",
          code: "f230fh0g3",
          name: "Bamboo Watch",
          description: "Product Description",
          image: "bamboo-watch.jpg",
          price: 65,
          category: "Accessories",
          quantity: 24,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1001",
          code: "nvklal433",
          name: "Black Watch",
          description: "Product Description",
          image: "black-watch.jpg",
          price: 72,
          category: "Accessories",
          quantity: 61,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1002",
          code: "zz21cz3c1",
          name: "Blue Band",
          description: "Product Description",
          image: "blue-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1003",
          code: "244wgerg2",
          name: "Blue T-Shirt",
          description: "Product Description",
          image: "blue-t-shirt.jpg",
          price: 29,
          category: "Clothing",
          quantity: 25,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1004",
          code: "h456wer53",
          name: "Bracelet",
          description: "Product Description",
          image: "bracelet.jpg",
          price: 15,
          category: "Accessories",
          quantity: 73,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1005",
          code: "av2231fwg",
          name: "Brown Purse",
          description: "Product Description",
          image: "brown-purse.jpg",
          price: 120,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1006",
          code: "bib36pfvm",
          name: "Chakra Bracelet",
          description: "Product Description",
          image: "chakra-bracelet.jpg",
          price: 32,
          category: "Accessories",
          quantity: 5,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1007",
          code: "mbvjkgip5",
          name: "Galaxy Earrings",
          description: "Product Description",
          image: "galaxy-earrings.jpg",
          price: 34,
          category: "Accessories",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1008",
          code: "vbb124btr",
          name: "Game Controller",
          description: "Product Description",
          image: "game-controller.jpg",
          price: 99,
          category: "Electronics",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 4,
        },
        {
          id: "1009",
          code: "cm230f032",
          name: "Gaming Set",
          description: "Product Description",
          image: "gaming-set.jpg",
          price: 299,
          category: "Electronics",
          quantity: 63,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
        {
          id: "1010",
          code: "plb34234v",
          name: "Gold Phone Case",
          description: "Product Description",
          image: "gold-phone-case.jpg",
          price: 24,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1011",
          code: "4920nnc2d",
          name: "Green Earbuds",
          description: "Product Description",
          image: "green-earbuds.jpg",
          price: 89,
          category: "Electronics",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1012",
          code: "250vm23cc",
          name: "Green T-Shirt",
          description: "Product Description",
          image: "green-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 74,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1013",
          code: "fldsmn31b",
          name: "Grey T-Shirt",
          description: "Product Description",
          image: "grey-t-shirt.jpg",
          price: 48,
          category: "Clothing",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 3,
        },
        {
          id: "1014",
          code: "waas1x2as",
          name: "Headphones",
          description: "Product Description",
          image: "headphones.jpg",
          price: 175,
          category: "Electronics",
          quantity: 8,
          inventoryStatus: "LOWSTOCK",
          rating: 5,
        },
        {
          id: "1015",
          code: "vb34btbg5",
          name: "Light Green T-Shirt",
          description: "Product Description",
          image: "light-green-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 34,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1016",
          code: "k8l6j58jl",
          name: "Lime Band",
          description: "Product Description",
          image: "lime-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 12,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
        {
          id: "1017",
          code: "v435nn85n",
          name: "Mini Speakers",
          description: "Product Description",
          image: "mini-speakers.jpg",
          price: 85,
          category: "Clothing",
          quantity: 42,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1018",
          code: "09zx9c0zc",
          name: "Painted Phone Case",
          description: "Product Description",
          image: "painted-phone-case.jpg",
          price: 56,
          category: "Accessories",
          quantity: 41,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1019",
          code: "mnb5mb2m5",
          name: "Pink Band",
          description: "Product Description",
          image: "pink-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 63,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1020",
          code: "r23fwf2w3",
          name: "Pink Purse",
          description: "Product Description",
          image: "pink-purse.jpg",
          price: 110,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1021",
          code: "pxpzczo23",
          name: "Purple Band",
          description: "Product Description",
          image: "purple-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 6,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1022",
          code: "2c42cb5cb",
          name: "Purple Gemstone Necklace",
          description: "Product Description",
          image: "purple-gemstone-necklace.jpg",
          price: 45,
          category: "Accessories",
          quantity: 62,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1023",
          code: "5k43kkk23",
          name: "Purple T-Shirt",
          description: "Product Description",
          image: "purple-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 5,
        },
        {
          id: "1024",
          code: "lm2tny2k4",
          name: "Shoes",
          description: "Product Description",
          image: "shoes.jpg",
          price: 64,
          category: "Clothing",
          quantity: 0,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1025",
          code: "nbm5mv45n",
          name: "Sneakers",
          description: "Product Description",
          image: "sneakers.jpg",
          price: 78,
          category: "Clothing",
          quantity: 52,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1026",
          code: "zx23zc42c",
          name: "Teal T-Shirt",
          description: "Product Description",
          image: "teal-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 3,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1027",
          code: "acvx872gc",
          name: "Yellow Earbuds",
          description: "Product Description",
          image: "yellow-earbuds.jpg",
          price: 89,
          category: "Electronics",
          quantity: 35,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
        {
          id: "1028",
          code: "tx125ck42",
          name: "Yoga Mat",
          description: "Product Description",
          image: "yoga-mat.jpg",
          price: 20,
          category: "Fitness",
          quantity: 15,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1029",
          code: "gwuby345v",
          name: "Yoga Set",
          description: "Product Description",
          image: "yoga-set.jpg",
          price: 20,
          category: "Fitness",
          quantity: 25,
          inventoryStatus: "INSTOCK",
          rating: 8,
        },
      ],
    };
    this.itemTemplate = this.itemTemplate.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  dispatch = this.props.dispatch;

  componentDidMount() {
    Axios.get('http://10.203.230.102:3001/products/?page=1&limit=6')
    .then(res => {
      this.setState({products : res.data.results.result})
    })
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      this.setState({
        sortOrder: -1,
        sortField: value.substring(1, value.length),
        sortKey: value,
      });
    } else {
      this.setState({
        sortOrder: 1,
        sortField: value,
        sortKey: value,
      });
    }
  }

  renderListItem(data) {
    return (
      <div className="p-col-12">
        <div className="product-list-item">
          <img
            src={`showcase/demo/images/product/${data.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.name}
          />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readonly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">${data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderGridItem(data) {
    console.log(data)
    return (
      <div className="p-col-12 p-md-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <span className={`product-badge status-${data.condition}`}>
              {data.condition}
            </span>
          </div>
          <div className="product-grid-item-content">
            <img
              src={data.image}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">${data.price}</span>
            {/* <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.condition === "OUTOFSTOCK"}
            ></Button> */}
          </div>
        </div>
      </div>
    );
  }

  itemTemplate(product, layout) {
    if (!product) {
      return <span></span>
    }

    if (layout === "list") return this.renderListItem(product);
    else if (layout === "grid") return this.renderGridItem(product);
  }

  renderHeader() {
    return (
      <div className="p-grid p-nogutter">
        <div className="p-col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={this.sortOptions}
            value={this.state.sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={this.onSortChange}
          />
        </div>
        <div className="p-col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions
            layout={this.state.layout}
            onChange={(e) => this.setState({ layout: e.value })}
          />
        </div>
      </div>
    );
  }

  render() {
    const header = this.renderHeader();

    return (
      <div className="dataview-demo card">
        <div className="card">
          <DataView
            value={this.state.products}
            layout={"grid"}
            header={header}
            itemTemplate={this.itemTemplate}
            paginator
            rows={9}
          />
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  return state;
})(withRouter(GuestHome));
