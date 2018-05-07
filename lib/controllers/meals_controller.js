const Meal = require('../../models/meal')
const Food = require('../../models/food')
const FoodMeal = require('../../models/food_meal')

const getMeals = async (req, res) => {
  const mealData = await Meal.findAll()
  const meals = mealData.rows.map(async meal => {
    const addedMeal = new Meal(meal.id, meal.name)
    await addedMeal.getFoods()
    return addedMeal
  })
  const awaitedMeals = await Promise.all(meals)
  res.json(awaitedMeals)
}

const getFoodsForMeal = async (req, res) => {
  let id = req.params.id
  const mealData = await Meal.find(id)
  const meal = new Meal(mealData.rows[0].id, mealData.rows[0].name)
  await meal.getFoods()
  res.json(meal.foods)
}

module.exports = {
  getMeals,
  getFoodsForMeal
}
