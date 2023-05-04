const getOrdinalSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2: {
      return 'nd';
    }
    case 3: {
      return 'rd';
    }
    default: {
      return 'th';
    }
  }
};

export default (date) => ({
  day: new Date(date).getDate(),
  ordinalSuffix: getOrdinalSuffix(new Date(date).getDate()),
  month: new Date(date).toLocaleString('default', { month: 'long' }),
  year: new Date(date).getFullYear(),
});
