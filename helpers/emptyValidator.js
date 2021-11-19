export function emptyValidator(name) {
  if (!name) return "The field can't be empty.";
  return "";
}
