type ClassMapper = (styles: Record<string, any>, name: string | string[]) => string;

export const classMapper: ClassMapper = (styles, name) => {
  if (Array.isArray(name)) {
    return name.map((key) => styles[key]).join(' ');
  }

  return styles[name];
};
