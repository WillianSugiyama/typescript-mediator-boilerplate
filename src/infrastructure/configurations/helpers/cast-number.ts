export const castNumber = (value: string | undefined): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return Number(value);
};

export const castNullableNumber = (value: string | undefined | null): number | undefined | null => {
  if (value === null) {
    return null;
  }

  return castNumber(value);
};
