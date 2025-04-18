/**
 * Converts an array of hexadecimal string values to an array of decimal numbers.
 *
 * @param hexArray - An array of strings representing hexadecimal numbers. 
 *                   If undefined, an empty array is returned.
 * @returns An array of decimal numbers corresponding to the input hexadecimal strings.
 */
export function hexToDecimalArray(hexArray: string[] | undefined) {
    if (!hexArray) return [];
    return hexArray.map(hexString => parseInt(hexString, 16));
}

/**
 * Fetches user data by calling a specified contract `get_user_data` entrypoint.
 *
 * @param account - An object representing the account, which should have a `callContract` method.
 * @returns A promise that resolves to the user data as a decimal array if successful, or `null` if an error occurs.
 *
 * @throws Logs an error to the console if the contract call fails.
 */
export const fetchUserData = async (account: any) => {
    try {
        const response = await account?.callContract({
            contractAddress: "0x23f5eafef6a4e44b4c960d2de35ff2e65929509658d1ca645ca94bbcce112fd",
            entrypoint: "get_user_data",
            calldata: [],
        });
        return hexToDecimalArray(response);
    } catch (err) {
        console.log(err);
        return null;
    }
};

/**
 * Fetches the points balance for a given account by calling a smart contract.
 *
 * @param account - The account object used to interact with the smart contract.
 *                   It should have a `callContract` method to execute the contract call.
 * @returns A promise that resolves to the points balance as a number. If an error occurs,
 *          or the response is invalid, it returns 0.
 *
 * @throws Will log an error to the console if the contract call fails.
 */
export const fetchPointsBalance = async (account: any) => {
    try {
        const response = await account?.callContract({
            contractAddress: "0x23f5eafef6a4e44b4c960d2de35ff2e65929509658d1ca645ca94bbcce112fd",
            entrypoint: "get_points_balance",
            calldata: [],
        });
        return hexToDecimalArray(response)?.[0] || 0;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

// Add more utility functions as needed