export function generatePassword(length:number) {
    let result = "";
    const size = length || 16;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const charsLenght = chars.length;
    for (let i = 0; i < size; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLenght));
    }
    return result as string;
  }