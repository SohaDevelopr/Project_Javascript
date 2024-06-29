$(function () {
  let product_name = $("#product-name");
  let product_price = $("#product-price");
  let product_img = $("#product-img");
  let add_to_cart_btn = $(".add-to-cart-btn");
  let product = JSON.parse(localStorage.getItem("product"));
  product_name.text(product.name);
  console.log(product_name.text());
  product_price.text(`$ ${product.price}.00`);
  product_img.attr("src", `./images/${product.img_url}`);
  add_to_cart_btn.attr("id", `${product.id}`);
  add_to_cart_btn.click(function () {
    addToCart(product.id);
  });
});
