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

function isValidusername(username: string) {
  const usernameRegex: RegExp = /^[a-zA-Z0-9\s]*$/;
  const charCheck: boolean = usernameRegex.test(username); // returning true means that the username is acceptable
  const lengthCheck: boolean = username.length >= 4 && username.length <= 16; // evaluating to true means that the username is acceptable

  return new Promise((resolve, reject) => {
    if (charCheck && lengthCheck) {
      resolve("Good data - is an acceptable username");
    } else {
      reject(`Bad data - not an acceptable username`);
    }
  });
}

const Validation = {
  isValidEmail,
  isValidusername,
};
export default Validation;
