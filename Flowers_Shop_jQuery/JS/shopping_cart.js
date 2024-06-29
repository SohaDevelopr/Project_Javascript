$(function () {
  let table_body = $("#table-body");
  let total_div = $("#total");
  let subtotal_div = $("#subtotal");
  let cart_items = $(".cart");
  let num_cart_items = 0;
  let product_list = JSON.parse(localStorage.getItem("productList"));
  let total = 0;
  let content = "";
  if (product_list && product_list.length > 0) {
    $(".non-empty-cart").removeClass("d-none");
    $(".empty-cart").addClass("d-none");
    product_list.forEach((element) => {
      content += `
                <tr>
                  <th scope="row" onclick="showProduct(${element.id})">
                  <a href= "show_product.html" class="text-decoration-none text-dark">
                    <img
                      src="./images/${element.img_url}"
                      loading="lazy" 
                      alt=""
                      class="object-fit-cover"
                      style="width: 90px; height: 120px"
                    />
                    </a>
                  </th>
                  <td>${element.name}</td>
                  <td>$${element.price}</td>
                  <td>
                    <input
                      type="number"
                      name="quantityField${element.id}"
                      value="${element.quantity}"
                      min="0"
                      onchange="onChange(${element.id})"
                      class="quantity-field border-0 text-center h-100 rounded-0 arabicNumbers"
                      style="width: 75px; background-color: transparent"
                    />
                  </td>
                  <td>$${element.total}</td>
                </tr>
    `;
      total += element.total;
      num_cart_items += parseInt(element.quantity);
    });
    table_body.html(content);
    total_div.text("$ " + total + ".00");
    subtotal_div.text("$ " + total + ".00");
    console.log(num_cart_items);
    cart_items.text(num_cart_items);
  } else {
    $(".non-empty-cart").addClass("d-none");
    $(".empty-cart").removeClass("d-none");
  }
});

function onChange(id) {
  let value = $(`input[name="quantityField${id}"]`).val();
  console.log(value);
  let productList_in_localStorage =
    JSON.parse(localStorage.getItem("productList")) || [];
  productList_in_localStorage.forEach((ele,index) => {
    if (ele.id === id) {
      ele.quantity = value;
      ele.total = ele.price * value; // Calculate the new total based on the updated quantity
      if(value == 0 ){
        productList_in_localStorage.splice(index, 1);
      }
    }
  });

  console.log("productList", productList_in_localStorage);
  // set localstorage
  localStorage.setItem(
    "productList",
    JSON.stringify(productList_in_localStorage)
  );
  // update page
  window.setTimeout(function () {
    window.location.reload();
  }, 20);
}




