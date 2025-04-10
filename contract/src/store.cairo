// Starknet imports
use starknet::{ContractAddress, get_caller_address, get_block_timestamp};

// Dojo imports
use dojo::world::WorldStorage;
use dojo::model::ModelStorage;

// Models imports
use starkfantasy::models::user::{User, ZeroablePlayerTrait, AssertTrait};
use starkfantasy::models::pool_user_bet::{PoolUserBet, PoolUserBetImpl, PoolUserBetTrait};

// Types import
use starkfantasy::types::pool_type::{PoolType};

// Constants import
use starkfantasy::constants;

// Helper imports
use starkfantasy::helpers::timestamp::Timestamp;

// Store struct
#[derive(Copy, Drop)]
pub struct Store {
    world: WorldStorage,
}

// Implementation of the `StoreTrait` trait for the `Store` struct
#[generate_trait]
pub impl StoreImpl of StoreTrait {
    fn new(world: WorldStorage) -> Store {
        Store { world: world }
    }

    // --------- Getters ---------
    
    // Read a user from a specific address
    fn read_user_from_address(self: Store, user_address: ContractAddress) -> User {
        self.world.read_model(user_address)
    }

    // Read the user that is making the call
    fn read_user(self: Store) -> User {
        let user_address = get_caller_address();
        self.world.read_model(user_address)
    }

    // Read a bet from a specific user
    fn read_pool_user_bet(self: Store, user_address: ContractAddress, web2_pool_id: felt252) -> PoolUserBet {
        self.world.read_model((user_address, web2_pool_id))
    }

    // Read the current user's bet
    fn read_current_user_bet(self: Store, web2_pool_id: felt252) -> PoolUserBet {
        let user_address = get_caller_address();
        self.world.read_model((user_address, web2_pool_id))
    }

    // --------- Setters ---------
    
    // Write a user to the store
    fn write_user(mut self: Store, user: @User) {
        self.world.write_model(user)
    }

    // Write a bet to the store
    fn write_pool_user_bet(mut self: Store, bet: @PoolUserBet) {
        self.world.write_model(bet)
    }

    // --------- New entities ---------
    
    // Create a new user
    fn new_user(mut self: Store) {
        let caller = get_caller_address();
        let current_timestamp = get_block_timestamp();

        // Create a new user
        let new_user = User {
            address: caller,
            points_balance: constants::INITIAL_POINTS,
            created_at: Timestamp::unix_timestamp_to_day(current_timestamp),
        };

        self.world.write_model(@new_user);
    }

    // Create a new bet in a normal pool (match result)
    fn new_match_bet(
        mut self: Store, 
        web2_pool_id: felt252, 
        prediction_value: felt252, 
        points_staked: u32
    ) -> PoolUserBet {
        let user_address = get_caller_address();
        let current_timestamp = get_block_timestamp();
        
        // Verify that the user exists
        let mut user = self.read_user_from_address(user_address);
        
        // Create the bet
        let new_bet = PoolUserBet {
            user: user_address,
            web2_pool_id: web2_pool_id,
            prediction_value: prediction_value,
            pool_type: PoolType::Normal.into(),
            points_staked: points_staked,
            is_claimed: false,
            created_at: current_timestamp,
        };
        
        // Reduce the user's points balance
        user.points_balance -= points_staked;
        
        self.write_user(@user);
        self.write_pool_user_bet(@new_bet);
        
        new_bet
    }

    // Create a new bet in a special pool 
    fn new_special_bet(
        mut self: Store, 
        web2_pool_id: felt252, 
        prediction_value: felt252, 
        points_staked: u32
    ) -> PoolUserBet {
        let user_address = get_caller_address();
        let current_timestamp = get_block_timestamp();
        
        // Verify that the user exists
        let mut user = self.read_user_from_address(user_address);
        
        // Create the bet
        let new_bet = PoolUserBet {
            user: user_address,
            web2_pool_id: web2_pool_id,
            prediction_value: prediction_value,
            pool_type: PoolType::Special.into(),
            points_staked: points_staked,
            is_claimed: false,
            created_at: current_timestamp,
        };
        
        // Reduce the user's points balance
        user.points_balance -= points_staked;
        
        self.write_user(@user);
        self.write_pool_user_bet(@new_bet);
        
        new_bet
    }
    
    // Claim bet reward
    fn claim_bet_reward(
        mut self: Store, 
        web2_pool_id: felt252, 
        winning_value: felt252,
        multiplier: u32 
    ) -> u32 {
        let user_address = get_caller_address();
        
        // Read the bet
        let mut bet = self.read_pool_user_bet(user_address, web2_pool_id);
        
        // Claim reward will check if the bet is already claimed
        let base_reward = bet.claim_reward(winning_value);
        
        // Calculate final reward with multiplier
        let reward_amount = (base_reward * multiplier) / 100;
        
        // Update the user's points balance
        let mut user = self.read_user();
        user.points_balance += reward_amount;
        
        self.write_user(@user);
        self.write_pool_user_bet(@bet);
        
        reward_amount
    }
    
    // Add points to a user (for admin/test purposes)
    fn add_points(mut self: Store, user_address: ContractAddress, amount: u32) {
        let mut user = self.read_user_from_address(user_address);
        user.assert_exists();
        user.points_balance += amount;
        self.write_user(@user);
    }
}