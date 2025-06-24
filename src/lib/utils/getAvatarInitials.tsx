export function getAvatarInitials(name: string) {
  const nameParts = name.split(" ");
  return {
    children: `${nameParts[0][0]}${nameParts[1] ? nameParts[1][0] : ""}`,
  };
}
