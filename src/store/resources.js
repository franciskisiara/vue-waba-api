export const resources = [
  { name: 'houses', url: 'apartments/:apartment/houses' },
];

export const helpers = {
  upper: string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};
