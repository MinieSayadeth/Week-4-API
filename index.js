const mealsListEl = document.querySelector('.meals')

async function main() {
  const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`)
  const mealsData = await meals.json()
  mealsListEl.innerHTML = mealsData.meals.map((meals) => mealsHTML(meals)).join('')
}

main()


function mealsHTML(meals) {
  return  `<div class="meal__container loading">
  <h3 class="meal__title">${meals.strMeal}</h3>          
  <img src="${meals.strMealThumb}" class="meals--img" alt="">
  <p class="meal__Id">
      ${meals.idMeal}
  </p>
</div>`
}

async function onSearch(event) {
  document.body.classList += ' meals__loading'
  const mealListValue = (event.target.value)
  const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealListValue}`)
  const mealsData = await meals.json()
  mealsListEl.innerHTML = mealsData.meals.slice([0], [6]).map((meals) => mealsHTML(meals)).join('')
  document.body.classList.remove('meals__loading')
}






