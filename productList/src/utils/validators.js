export const required = value => (value ? undefined : 'Required');

export const onlyNumbers = value => (value && isNaN(Number(value)) ? 'Only numbers are allowed' : undefined);
