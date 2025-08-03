function pascalToKebabCase (str: string): string {
  return str
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

export default pascalToKebabCase;
