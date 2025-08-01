export const safeFormDataStringValue = (formData: FormData, fieldName: string): string => {
  const fieldValue = formData.get(fieldName);
  return fieldValue && typeof fieldValue === 'string' ? fieldValue : '';
};

export const safeFormDataCheckboxValue = (formData: FormData, fieldName: string): boolean => {
  const fieldValue = formData.get(fieldName);
  return fieldValue !== null && fieldValue === 'on';
};

export const safeFormDataDateValue = (formData: FormData, fieldName: string): number => {
  const fieldValue = formData.get(fieldName);
  return fieldValue && typeof fieldValue === 'string' ? Number(new Date(fieldValue)) : 0;
};
