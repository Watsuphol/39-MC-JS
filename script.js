let products = [];
let id = 0;

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const price = document.getElementById("price").value;
  const imgUrl = document.getElementById("imgurl").value;

  if (!imageUrl(imgUrl)) {
    alert("Please enter a valid image URL.");
    return;
  }

  const newProduct = {
    id: ++id,
    imgUrl: imgUrl,
    productName: productName,
    price: price,
    check: false,
  };

  products.push(newProduct);
  displayProduct(newProduct);
  document.getElementById("form").reset();
});

//Reset
document.querySelector("button[type='reset']").addEventListener("click", () => {
  window.location.reload();
});

//Checked URL by RegEx
function imageUrl(imgUrl) {
  const input = new URL(imgUrl);
  return /\.(jpg|png|gif)$/.test(input.pathname);
}

//Display Product
function displayProduct(product) {
  const displaySection = document.getElementById("displaySection");
  const card = document.createElement("div");
  card.className = "items-center bg-white p-4 rounded-lg shadow-lg";

  card.innerHTML = `
  
  <img src="${product.imgUrl}" alt="${product.productName} class="w-full aspect-[4/3] rounded-md mb-4 object-cover">
  <div class="flex items-center justify-between">
  
  <div class="mt-3 ">
  <span class="block ml-2 text-gray-700 font-semibold text-3xl">${product.productName}</span>
  <span class="block ml-2 text-gray-700 font-semibold text-2xl">${product.price}$</span>
  </div>
  <input type="checkbox" class="w-5 h-5 text-2xl accent-rose-600" data-id="${product.id}" onchange="toggleSelector(event)">
  </div>
  `;

  displaySection.appendChild(card);
}

// PART 2 ADD CART

function toggleSelector(event) {
  const checkbox = event.target;
  const checkboxId = parseInt(checkbox.getAttribute("data-id"));
  const product = products.find((product) => product.id === checkboxId);

  if (checkbox.checked) {
    product.checked = true;
  } else {
    product.checked = false;
  }
}

document.getElementById("addbtn").addEventListener("click", () => {
  cart = products.filter((product) => product.checked);
  displayCart(cart);
});

function displayCart(cart) {
  const displayDiv = document.getElementById("displayCart");
  displayDiv.innerHTML = "";

  cart.forEach((product) => {
    const div = document.createElement("div");
    div.className = "items-center bg-white p-4 rounded-lg shadow-lg";

    div.innerHTML = `
    <input type="checkbox" class="sr-only w-5 h-5 text-2xl accent-rose-600" data-id="${product.id}" onchange="calculateSelector(event)">
    <img src="${product.imgUrl}" alt="${product.productName} class="w-full aspect-[4/3] rounded-md mb-4 object-cover">
    
    <div class="flex items-center justify-between">

    <div class="mt-3 ">
    <span class="block ml-2 text-gray-700 font-semibold text-3xl">${product.productName}</span>
    <span class="block ml-2 text-gray-700 font-semibold text-2xl">${product.price}$</span>
    </div>
    <button
    type="submit"
    id="${product.id}"
    onclick="removeCard(${product.id})"
    class="bg-blue-500 px-4 text-white rounded-md hover:bg-blue-600 hover:ring hover:ring-blue-300 py-4 mt-2"
  >Remove
  </button>
    </div>
    `;
    displayDiv.appendChild(div);
  });
  const btnDiv = document.getElementById("btnCal");
  btnDiv.innerHTML = `<button id="cfp" onclick="calulateBtn()" class="bg-gray-500 px-4 text-white rounded-md hover:bg-gray-600 hover:ring hover:ring-gray-300">Calculate Final Price</button>`;

  const totalDiv = document.getElementById("totalSection");
  totalDiv.innerHTML = `<h2 id="total" class="text-xl mt-3">You have to pay:</h2>`;
}

function removeCard(productId) {
  cart = cart.filter((product) => product.id !== productId);
  displayCart(cart);
}

//calulate Btn
function calulateBtn() {
  calculateFinal(cart);
}

function calculateFinal(cart) {
  let sum = 0;
  cart.forEach((product) => {
    sum += parseFloat(product.price);
  });
  const totalPrice = document.getElementById("total");
  totalPrice.textContent = `You have to pay: ${sum.toFixed(2)} $`;
}
