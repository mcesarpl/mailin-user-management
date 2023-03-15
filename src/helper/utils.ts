class Utils {
  public containsNumber(input: string): boolean {
    return /[0-9]/.test(input);
  }

  public containsSpecialCharacters(input: string): boolean {
    return /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(input);
  }

  public isLongEnough(input: string, range = 10): boolean {
    return input.length >= range;
  }

  public isThisEmailValid(email: string): boolean {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    );
  }

  public notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
}

export const utils = new Utils();
