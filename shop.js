const yearElement = document.getElementById("year");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll("[data-category]");
const goodsCards = document.querySelectorAll(".goods-card");
const emptyMessage = document.getElementById("emptyMessage");

let activeCategory = "all";

yearElement.textContent = new Date().getFullYear();

function filterGoods() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  goodsCards.forEach((card) => {
    const matchesCategory =
      activeCategory === "all" || card.dataset.category === activeCategory;
    const matchesSearch = card.dataset.name.includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;

    card.style.display = shouldShow ? "flex" : "none";

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    filterGoods();
  });
});

searchInput.addEventListener("input", filterGoods);
