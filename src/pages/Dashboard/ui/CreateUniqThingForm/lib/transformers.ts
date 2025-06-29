export const safeFormDataStringValue = (formData: FormData, fieldName: string): string => {
  const fieldValue = formData.get(fieldName);
  return fieldValue && typeof fieldValue === 'string' ? fieldValue : '';
};

export const safeFormDataBooleanValue = (formData: FormData, fieldName: string): boolean => {
  const fieldValue = formData.get(fieldName);
  return fieldValue && typeof fieldValue === 'boolean' ? fieldValue : false;
};

export const safeFormDataDateValue = (formData: FormData, fieldName: string): number => {
  const fieldValue = formData.get(fieldName);
  console.log(typeof fieldValue);
  return fieldValue && typeof fieldValue === 'string' ? Number(new Date(fieldValue)) : 0;
};
