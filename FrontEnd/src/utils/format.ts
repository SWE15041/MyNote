export const formatSupportNumber = (phone: string | null) => {
    if (!phone || phone.length < 7) {
        return phone;
    }

    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
};

export const fixedNumber = (num: number) => (num === 0 ? "0.00" : num.toFixed(2));

export const fixedDeductedNumber = (num: number) => {
    const isDeducted = num < 0;
    return isDeducted ? `- $${fixedNumber(Math.abs(num))}` : `$${fixedNumber(num)}`;
};
