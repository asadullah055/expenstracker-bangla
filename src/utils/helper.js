export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandSeparator = (num) => {
  if (num === null || num === undefined || num === "" || isNaN(num)) return "";
  return new Intl.NumberFormat("bn-BD").format(Number(num));
};

export const formatBanglaDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const formatBanglaDayMonth = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
};
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const chartData = sortedData.map((item) => ({
    month: formatBanglaDayMonth(item?.date),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => { 

    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
    );
    const chartData = sortedData.map((item) => ({
        month: formatBanglaDayMonth(item?.date),
        amount: item?.amount,
        category: item?.category,
    }));
    return chartData;
};
