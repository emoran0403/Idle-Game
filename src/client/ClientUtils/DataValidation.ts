function isValidEmail(email: string) {
  const emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail: boolean = emailRegex.test(email.toLocaleLowerCase());

  return new Promise((resolve, reject) => {
    if (!isEmail) {
      reject(`Bad data - not an email`);
    } else {
      resolve("Good data - is an email");
    }
  });
}

const Validation = {
  isValidEmail,
};
export default Validation;
