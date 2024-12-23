function kebabToPascalCase(str: string): string {
  return str
    .split('-') // Split the string by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(''); // Join the words back together without spaces
}

export default kebabToPascalCase;
