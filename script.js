const loadphone = async (searchText, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  //console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  // Show all button
  const showall = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showall.classList.remove("hidden");
  } else {
    showall.classList.add("hidden");
  }

  // Show all the phones when the button is clicked

  // Clear previous results
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    console.log(phone);

    const div = document.createElement("div");
    div.classList.add(
      "card",
      "bg-gray-100",
      "rgb-border-1",
      "w-96",
      "h-100",
      "shadow-sm"
    );
    div.innerHTML = `
          <figure class="mt-8">
            <img 
              src="${phone.image}"
              alt="${phone.phone_name}"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>
             
            </p>
            <div class="card-actions justify-end">
              <button onclick="showdetails('${phone.slug}'); my_modal_4.showModal()" class="btn btn-primary">Show details</button>
            </div>
          </div>
        `;
    phoneContainer.appendChild(div);
  });

  // Hide the loading spinner
  toggleSpinner(false);
};

// handle the main search button
const handleSearch = (isShowAll) => {
  document.getElementById("find-phone-container").classList.add("hidden");
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadphone(searchText, isShowAll);
};

//loading spinner
const loadingSpinner = document.getElementById("loading-spinner");
const toggleSpinner = (isLoading) => {
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const showdetails = async (id) => {
  console.log("Show details button clicked", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
  showmodaltitle(data);
  showdetailscontainer(data);
};

// Show all phones when the button is clicked
const showAllPhones = () => {
  handleSearch(true);
};

const showmodaltitle = (data) => {
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = data.data.name;
};

const showdetailscontainer = (data) => {
  const showdetailcontainer = document.getElementById("show-detail-container");
  showdetailcontainer.innerHTML = `
        <div class="card bg-gray-100 w-96 h-140 shadow-sm mr-3">
            <figure class="mt-8 justify-center align-center">
                <img  src="${data.data.image}" alt="${data.data.name}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${data.data.name}</h2>
                <p>Brand: ${data.data.brand}</p>
                <p>Release Date: ${
                  data.data.releaseDate
                    ? data.data.releaseDate
                    : "Not Available"
                }</p>
                <p>Storage: ${data.data.mainFeatures.storage}</p>   
                <p>Display Size: ${data.data.mainFeatures.displaySize}</p>
                <p>Chip Set: ${data.data.mainFeatures.chipSet}</p>
            </div>
        </div>
    `;
};
