import { dojoConfig } from "../dojo/dojoConfig";

const TORII_URL = dojoConfig.toriiUrl + "/graphql";

// Function to fetch all bets for a specific user
export const fetchUserBets = async (userAddress: string) => {
    try {
        const response = await fetch(TORII_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
                    query GetUserBets($address: String!) {
                        starkfantasyPoolUserBetModels(where: {user: {eq: $address}}, first: 100) {
                            edges {
                                node {
                                    user
                                    web2_pool_id
                                    prediction_value
                                    pool_type
                                    points_staked
                                    is_claimed
                                    created_at
                                }
                            }
                            totalCount
                        }
                    }
                `,
                variables: {
                    address: userAddress
                }
            }),
        });

        const result = await response.json();
        if (result.data && result.data.starkfantasyPoolUserBetModels) {
            return result.data.starkfantasyPoolUserBetModels.edges.map((edge: any) => edge.node);
        }
        return [];
    } catch (error) {
        console.error("Error fetching user bets:", error);
        return [];
    }
};

// Function to fetch all users (for leaderboard, etc.)
export const fetchAllUsers = async () => {
    try {
        const response = await fetch(TORII_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
                    query GetAllUsers {
                        starkfantasyUserModels(first: 100) {
                            edges {
                                node {
                                    address
                                    points_balance
                                    created_at
                                }
                            }
                            totalCount
                        }
                    }
                `,
            }),
        });

        const result = await response.json();
        if (result.data && result.data.starkfantasyUserModels) {
            return result.data.starkfantasyUserModels.edges.map((edge: any) => edge.node);
        }
        return [];
    } catch (error) {
        console.error("Error fetching all users:", error);
        return [];
    }
};

// Function to fetch all bets (for admin or analytics)
export const fetchAllBets = async () => {
    try {
        const response = await fetch(TORII_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
                    query GetAllBets {
                        starkfantasyPoolUserBetModels(first: 100) {
                            edges {
                                node {
                                    user
                                    web2_pool_id
                                    prediction_value
                                    pool_type
                                    points_staked
                                    is_claimed
                                    created_at
                                }
                            }
                            totalCount
                        }
                    }
                `,
            }),
        });

        const result = await response.json();
        if (result.data && result.data.starkfantasyPoolUserBetModels) {
            return result.data.starkfantasyPoolUserBetModels.edges.map((edge: any) => edge.node);
        }
        return [];
    } catch (error) {
        console.error("Error fetching all bets:", error);
        return [];
    }
};
