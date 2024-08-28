/* eslint-disable no-useless-escape */
const regex = {
  name: /^[A-Za-zñÑáÁéÉíÍóÓúÚ\s]{3,100}$/,
  lastName: /^[A-Za-zñÑáÁéÉíÍóÓúÚ\s]{3,100}$/,
  description: /^[A-Za-z0-9ñÑáÁéÉíÍóÓúÚ.,\s]{2,500}$/,
  email: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  password: /^(?=.*\d)(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
}

regex.name = new RegExp(regex.name, "i")
regex.lastName = new RegExp(regex.lastName, "i")
regex.description = new RegExp(regex.description, "i")
regex.email = new RegExp(regex.email, "i")

const validation = (data) => {
  if(!regex.name.test(data.name) || !regex.lastName.test(data.lastName) ||
    !regex.description.test(data.description) || !regex.email.test(data.email)
    || !regex.password.test(data.password))
    {
      return false;
    }
    return true;
};

regex.validation = validation

export default regex