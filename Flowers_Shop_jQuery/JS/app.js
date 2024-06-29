let products = [
  {
    id: 0,
    type: "bouquet",
    img_url: "item-1.jpg",
    name: "peony bouquet",
    price: 45,
    quantity: 1,
    total: 45,
  },
  {
    id: 1,
    type: "bouquet",
    img_url: "item-2.jpg",
    name: "sunflower bouquet",
    price: 75,
    quantity: 1,
    total: 75,
  },
  {
    id: 2,
    type: "bouquet",
    img_url: "item-3.jpg",
    name: "poppy bouquet",
    price: 50,
    quantity: 1,
    total: 50,
  },
  {
    id: 3,
    type: "arrangement",
    img_url: "item-4.jpg",
    name: "tulip arrangement",
    price: 80,
    quantity: 1,
    total: 80,
  },
  {
    id: 4,
    type: "arrangement",
    img_url: "item-5.jpg",
    name: "tulip arrangement",
    price: 32,
    quantity: 1,
    total: 32,
  },
  {
    id: 5,
    type: "bouquet",
    img_url: "item-6.jpg",
    name: "pink poppy bouquet",
    price: 70,
    quantity: 1,
    total: 70,
  },
  {
    id: 6,
    type: "bouquet",
    img_url: "item-7.jpg",
    name: "nigella bouquet",
    price: 65,
    quantity: 1,
    total: 65,
  },
  {
    id: 7,
    type: "bouquet",
    img_url: "item-8.jpg",
    name: "pink tulip bouquet",
    price: 91,
    quantity: 1,
    total: 91,
  },
  {
    id: 8,
    type: "bouquet",
    img_url: "item-9.jpg",
    name: "white poppy bouquet",
    price: 57,
    quantity: 1,
    total: 57,
  },
  {
    id: 9,
    type: "bouquet",
    img_url: "item-10.jpg",
    name: "sweet rose bouquet",
    price: 98,
    quantity: 1,
    total: 98,
  },
  {
    id: 10,
    type: "bouquet",
    img_url: "item-11.jpg",
    name: "summer bouquet",
    price: 40,
    quantity: 1,
    total: 40,
  },
  {
    id: 11,
    type: "bouquet",
    img_url: "item-12.jpg",
    name: "love bouquet",
    price: 95,
    quantity: 1,
    total: 95,
  },
];
// init and set localstorage
if (
  JSON.parse(localStorage.getItem("productList")) === null ||
  JSON.parse(localStorage.getItem("productList")) === "undefined"
) {
  localStorage.setItem("productList", JSON.stringify([]));
  // update page
  window.setTimeout(function () {
    window.location.reload();
  }, 500);
}

$(function () {
  let best_sellers_content = $("#best-sallers .row");
  let all_products_content = $("#all-products");
  let arrangement_products_content = $("#arrangement-products");
  let bouquet_products_content = $("#bouquet-products");

  function App_init() {
    let best_sellers = "";
    let all_products = "";
    let arrangement_products = "";
    let bouquet_products = "";
    let cotents = "";
    products.forEach((value, key) => {
      cotents = `
            <div class="col" id="${key}">
                    <div class="card">
                      <img
                        src="./images/${value.img_url}"
                        class="card-img-top"
                        loading="lazy" 
                        alt="..."
                      />
                      <div class="card-body" onclick="showProduct(${key})">
                        <a href= "show_product.html" class="text-decoration-none text-dark">
                            <h5 class="card-title">${value.name}</h5>
                            <p class="card-text">$ ${value.price}.00</p>
                        </a>
                      </div>
                      <button
                        onclick = "addToCart(${key})"
                        class="btn btn-dark fw-normal rounded-0 text-capitalize"
                        id="btn-${key}"
                        style="width: 135px; height: 40px"
                      >
                        Add to cart
                      </button>
                    </div>
            </div>
       `;
      if (value.id <= 2) {
        best_sellers += cotents;
      } else if (value.type == "arrangement") {
        arrangement_products += cotents;
      } else if (value.type == "bouquet") {
        bouquet_products += cotents;
      }
      all_products += cotents;
    });

    best_sellers_content.html(best_sellers);
    all_products_content.html(all_products);
    arrangement_products_content.html(arrangement_products);
    bouquet_products_content.html(bouquet_products);
  }
  App_init();
 
});

function showProduct(id) {
  let selectedProduct = null;
  if (id >= 0 && id < products.length) {
    selectedProduct = products[id];
    console.log(selectedProduct);
    let product_list = JSON.parse(localStorage.getItem("productList"));
    if (product_list) {
      let matchingProduct = product_list.find((ele) => ele.id === selectedProduct.id);
      if (matchingProduct) {
        selectedProduct.quantity = matchingProduct.quantity;
      }
    }
    // set localStorage
    localStorage.setItem("product", JSON.stringify(selectedProduct));
  }
}

function addToCart(id) {
  const product = products.find((ele, key) => key === id);
  if (!product) {
    return; // Exit the function if the product is not found
  }

  const quantityField = $("#quantity-field");
  let value = parseInt(quantityField.val()) ? parseInt(quantityField.val()) : 1;

  if (value === 0) {
    return; // Exit the function without adding any items to the cart
  }

  quantityField.change(function () {
    console.log(parseInt(quantityField.val()));
  });

  let productListInLocalStorage =
    JSON.parse(localStorage.getItem("productList")) || [];

  let existingProduct = productListInLocalStorage.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += value;
    existingProduct.total += existingProduct.price * value;
  } else {
    productListInLocalStorage.push({ ...product, quantity: value });
  }
  // console.log("productList", productListInLocalStorage);

 //  Set Product List in LocalStorage
  localStorage.setItem(
    "productList",
    JSON.stringify(productListInLocalStorage)
  );
  // Show Alert
  $(".liveAlert").show("slow");
  // update page
  window.setTimeout(function () {
    window.location.reload();
  }, 3500);
}
