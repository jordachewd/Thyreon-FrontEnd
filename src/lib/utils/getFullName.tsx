interface UserNameParams {
  firstName?: string | null;
  lastName?: string | null;
  username: string;
}

export default function getFullName({
  firstName,
  lastName,
  username,
}: UserNameParams): string {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  if (firstName) {
    return firstName;
  }

  if (lastName) {
    return lastName;
  }

  return username;
}
