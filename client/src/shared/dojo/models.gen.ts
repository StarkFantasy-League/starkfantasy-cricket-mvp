import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

// User model interface
export interface User {
    address: string;
    points_balance: number;
    created_at: number;
}

// PoolUserBet model interface
export interface PoolUserBet {
    user: string;
    web2_pool_id: string; // Using felt252 as string in TypeScript
    prediction_value: string;
    pool_type: number;
    points_staked: number;
    is_claimed: boolean;
    created_at: number;
}

// Define additional models if needed

// SchemaType for all models
export interface SchemaType extends ISchemaType {
    starkfantasy: {
        User: User,
        UserValue: any,
        PoolUserBet: PoolUserBet,
        PoolUserBetValue: any,
        // Add other models as needed
    },
}

// Schema with default values
export const schema: SchemaType = {
    starkfantasy: {
        User: {
            address: "",
            points_balance: 0,
            created_at: 0,
        },
        UserValue: {
            points_balance: 0,
            created_at: 0,
        },
        PoolUserBet: {
            user: "",
            web2_pool_id: "",
            prediction_value: "",
            pool_type: 0,
            points_staked: 0,
            is_claimed: false,
            created_at: 0,
        },
        PoolUserBetValue: {
            prediction_value: "",
            pool_type: 0,
            points_staked: 0,
            is_claimed: false,
            created_at: 0,
        },
        // Add other models with default values
    },
};

// Model mapping for easy reference
export enum ModelsMapping {
    User = 'starkfantasy-User',
    PoolUserBet = 'starkfantasy-PoolUserBet',
    // Add other model mappings
}
