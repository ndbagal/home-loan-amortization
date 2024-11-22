export function formatToIndianCurrency(amount, decimals = 2) {
    const factor = Math.pow(10, decimals);
    const roundedAmount = Math.round(amount * factor) / factor;
    const numberParts = roundedAmount.toFixed(decimals).split('.');
    const integerPart = numberParts[0];
    const decimalPart = numberParts[1];

    // Add commas for Indian numbering system
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    const formattedInteger =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (otherNumbers ? ',' : '') + lastThree;

    return decimals !== 0 ? `₹${formattedInteger}.${decimalPart}` : `₹${formattedInteger}`;
}