export const randomDate = (startYear: number, endYear: number) => {
    const startDate = new Date(startYear, 0, 1).getTime();
    const endDate = new Date(endYear + 1, 0, 1).getTime();
    const randomTime = Math.random() * (endDate - startDate) + startDate;
    return new Date(randomTime);
}

