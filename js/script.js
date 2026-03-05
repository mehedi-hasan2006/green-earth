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
        <button class="btn btn-success btn-outline w-full"> ${catagory.category_name} </button>
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
  console.log(itemCardsContainer);
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
            <button class="btn bg-[#15803D] text-white rounded-full w-full">Add to Cart</button>
        </div>
    `;
    itemCardsContainer.appendChild(plantCard);
  });
};
