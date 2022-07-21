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
  const isGoodUsername: boolean = usernameRegex.test(username);

  return new Promise((resolve, reject) => {
    if (!isGoodUsername) {
      reject(`Bad data - not an acceptable username`);
    } else {
      resolve("Good data - is an acceptable username");
    }
  });
}

const Validation = {
  isValidEmail,
  isValidusername,
};
export default Validation;
