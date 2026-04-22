export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.');
  };
};

export class OrgAuthenticateError extends Error {
  constructor() {
    super('Incorrect e-mail or password.');
  };
};