const {
  check,
  validationResult
} = require('express-validator')

let isHidden = true;

const userValidationRules = () => {
  return [
    check('password').isLength({
      min: 8
    }).matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$")
    .withMessage('It must be at least 8 charachters'),
    check('firstName').isLength({
      min: 3
    }).withMessage('First name must be at least 3 charachters'),
    check('passwordagain').custom((value, {
      req
    }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must be the same");
      } else {
        return value;
      }
    })
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

  isHidden = false;
  const errorMsg = Object.values(extractedErrors[0])
  return res.status(422).render('register', {
    isHidden: isHidden,
    errorMsg: errorMsg
  })

}

module.exports = {
  userValidationRules,
  validate,
}