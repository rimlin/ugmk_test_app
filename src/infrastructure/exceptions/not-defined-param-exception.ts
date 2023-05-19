export class NotDefinedParamException extends Error {
  constructor(name: string) {
    super(`${name} is not defined`);
  }
}
