import joi from 'joi'

export const createProducts = joi.object({
  name: joi.string(4).required(),
  price: joi.number(4).required(),
  image: joi.url(5).required(),
  description: joi.string(5).required(),
  brand: joi.string(5).required(),
  color: joi.string(3).required(),
  numbers: joi.number().required()
})
