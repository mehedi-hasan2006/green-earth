const removeActiveClass = () => {
  let categoryBtn = document.querySelectorAll(".categoryBtn");
  categoryBtn.forEach((btn) => btn.classList.remove("active"));
};

const fetchCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
fetchCategories();

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categoriesContainer");
  categoriesContainer.innerHTML = " ";

  categories.forEach((catagory) => {
    let createCategoryElement = document.createElement("div");
    createCategoryElement.innerHTML = `
        <button id="categoryBtn-${catagory.id}" onclick="getCategoriesByPlants(${catagory.id})"  class="btn btn-success btn-outline w-full categoryBtn"> ${catagory.category_name} </button>
    `;
    categoriesContainer.appendChild(createCategoryElement);
  });
};

const fetchAllPlants = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const resData = await res.json();

  displayAllPlants(resData.plants);
};

fetchAllPlants();

const displayAllPlants = (plants) => {
  let itemCardsContainer = document.getElementById("itemCardsContainer");
  itemCardsContainer.innerHTML = "";

  plants.forEach((plant) => {
    let plantCard = document.createElement("div");

    plantCard.innerHTML = `
        <div class="bg-white rounded-lg p-5 space-y-2">
            <img src="${plant.image}" alt="" class="rounded-md h-[180px] w-full object-cover" >
            <h2 class="font-semibold"> ${plant.name} </h2>
            <p class="text-[12px] opacity-80 text-[#71717A]"> ${plant.description} </p>

            <div class="flex justify-between items-center">
                <p class="btn  rounded-full bg-[#DCFCE7] text-[#15803D]"> ${plant.category}</p>
                <p class="font-semibold">৳ ${plant.price}</p>
            </div>
            <button onclick="addToCart(${plant.id}, '${plant.name}', ${plant.price})" class="btn bg-[#15803D] text-white rounded-full w-full">Add to Cart</button>
        </div>
    `;
    itemCardsContainer.appendChild(plantCard);
  });
};

const getCategoriesByPlants = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      let clickBtn = document.getElementById(`categoryBtn-${id}`);
      clickBtn.classList.add("active");

      let allBtn = document.getElementById("allBtn");
      allBtn.classList.add("btn-outline");

      displayAllPlants(data.plants);
    });
};

const allCategoryBtn = (allCategoryBtn) => {
  fetchAllPlants();
  allCategoryBtn.classList.remove("btn-outline");
  removeActiveClass();
};

let cart = [];
const addToCart = (id, name, price) => {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }

  let totalAmountContainer = document.getElementById("totalAmount");
  totalAmountContainer.classList.remove("hidden");

  cartNoItem.classList.add("hidden");

  displayCart();
};

// display cart content
const displayCart = () => {
  let cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";
  let totalSum = 0;
  cart.forEach((item) => {
    totalSum += item.price * item.quantity;
    let cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class=" rounded-md bg-[#f0fdf4] p-4">
                    <div class="flex justify-between">
                        <h2 class="font-semibold"> ${item.name}</h2>
                        <div onclick="removeFromCart(${item.id})" class="cursor-pointer">
                          <p  > X </p>
                        </div>
                    </div>  
                       <div class="flex justify-between"> 
                          <p class="text-[#94a0a1]">৳ ${item.price} X ${item.quantity}</p>
                          <p class ="font-semibold text-[16px]">৳ ${item.price * item.quantity} </p>
                        </div>           
      </div>
      
    `;
    cartContainer.appendChild(cardDiv);
  });

  let totalTaka = document.getElementById("totalTaka");
  totalTaka.innerText = totalSum;
};
displayCart();

const removeFromCart = (id) => {
  let removeItem = cart.filter((item) => item.id != id);
  cart = removeItem;

  displayCart();
};

let cartNoItem = document.getElementById("cartNoItem");

if (cart.length == 0) {
  cartNoItem.classList.remove("hidden");
} else {
  cartNoItem.classList.add("hidden");
}
