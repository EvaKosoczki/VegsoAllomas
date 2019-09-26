const {
  body,
  validationResult
} = require('express-validator')



const userValidationRules = () => {
  return [
    //body('username').isEmail(),
    body('password').isLength({
      min: 8
    }).matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$")
    .withMessage('It must be at least 8 charachters'),
    body('firstName').isLength({
      min: 3
    }).withMessage('First name at least 3 charachters')
    /*body('passwordagain').custom((value, {
      req
    }) => (value === body(req.body.password))).withMessage('Not the same')*/
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }))

  return res.status(422)
    .json({
      errors: extractedErrors,
    })
}

module.exports = {
  userValidationRules,
  validate,
}