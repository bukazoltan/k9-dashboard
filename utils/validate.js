const validate = require("validate.js");

const constraints = {
  taboos: {
    presence: { allowEmpty: false, message: "Nem adtál meg egy taboot sem!" },
  },
  wordToGuess: {
    presence: true,
    length: {
      minimum: 3,
      message: "A kitalálandó szónak legalább 3 karakternek kell lennie.",
    },
  },
  imgURL: { url: { message: "A kép nem igazi URL." } },
};

const validateTawhoo = (tawhoo) => {
  console.log(tawhoo);
  return validate(tawhoo, constraints, {
    fullMessages: false,
  });
};

export { validateTawhoo };
