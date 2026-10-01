
export async function getTotal(amounts: number[]) {
    return amounts.reduce((sum, n) => sum + n, 0);
}
export async function getTotalSpent(amounts: number[]) {
    return amounts.reduce((spent, amount) => {
        return amount < 0 ? spent + amount : spent;
    }, 0);
}
export async function getTotalEarned(amounts: number[]) {
    return amounts.reduce((earned, amount) => {
        return amount > 0 ? earned + amount : earned;
    }, 0);}