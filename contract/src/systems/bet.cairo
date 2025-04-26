use starkfantasy::models::pool_user_bet::{PoolUserBet};

// Interface definition
#[starknet::interface]
pub trait IBet<T> {
    // --- Write Methods (require gas) ---
    /// Places a bet on a match result pool
    fn place_match_bet(ref self: T, web2_pool_id: felt252, prediction_value: felt252, points_staked: u32);
    
    /// Places a bet on a special pool (player achievements, etc.)
    fn place_special_bet(ref self: T, web2_pool_id: felt252, prediction_value: felt252, points_staked: u32);

    /// Claims rewards for a winning bet
    /// Returns the amount of points awarded to the user
    fn claim_reward(ref self: T, web2_pool_id: felt252, winning_value: felt252, multiplier: u32) -> u32;
    
    // --- Read Methods (no gas cost) ---
    /// Retrieves details about a specific bet placed by the calling user
    fn get_user_bet(self: @T, web2_pool_id: felt252) -> PoolUserBet;
    
    /// Checks if a user has already placed a bet on a specific pool
    fn has_bet_on_pool(self: @T, web2_pool_id: felt252) -> bool;
    
    /// Checks if a bet is valid for claiming a reward
    fn is_bet_claimable(self: @T, web2_pool_id: felt252, winning_value: felt252) -> bool;
}

#[dojo::contract]
pub mod bet {
    // Local import
    use super::{IBet};
    
    // Model imports
    use starkfantasy::models::pool_user_bet::{PoolUserBet, PoolUserBetImpl};
    
    // Store import
    use starkfantasy::store::{StoreTrait};
    
    // Constants import
    use starkfantasy::constants;

    // Dojo Imports
    #[allow(unused_imports)]
    use dojo::model::{ModelStorage};
    
    // Constructor
    fn dojo_init(ref self: ContractState) {}
    
    // Implementation of the interface methods
    #[abi(embed_v0)]
    impl BetImpl of IBet<ContractState> {
        // ------------------------- Write Methods -------------------------
        // These methods modify state and require gas
        
        /// Places a bet on a match result pool (team scores, winners, etc.)
        /// This operation requires a transaction and consumes gas
        /// 
        /// # Arguments
        /// * `web2_pool_id` - Unique identifier for the pool from web2 backend
        /// * `prediction_value` - The predicted value (formatted according to pool type)
        /// * `points_staked` - Amount of points to stake on this bet
        fn place_match_bet(
            ref self: ContractState, 
            web2_pool_id: felt252, 
            prediction_value: felt252, 
            points_staked: u32
        ) {
            let mut world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            // Verify minimum bet amount
            assert(points_staked >= constants::MIN_BET_AMOUNT, 'Bet amount too low');
            
            // Create new bet for a match result pool
            store.new_match_bet(web2_pool_id, prediction_value, points_staked);
        }
        
        /// Places a bet on a special pool (player achievements, special events, etc.)
        /// This operation requires a transaction and consumes gas
        ///
        /// # Arguments
        /// * `web2_pool_id` - Unique identifier for the pool from web2 backend
        /// * `prediction_value` - The predicted value or player name
        /// * `points_staked` - Amount of points to stake on this bet
        fn place_special_bet(
            ref self: ContractState, 
            web2_pool_id: felt252, 
            prediction_value: felt252, 
            points_staked: u32
        ) {
            let mut world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            // Verify minimum bet amount
            assert(points_staked >= constants::MIN_BET_AMOUNT, 'Bet amount too low');
            
            // Create new bet for a special pool
            store.new_special_bet(web2_pool_id, prediction_value, points_staked);
        }
        
        /// Claims a reward for a winning bet
        /// This operation requires a transaction and consumes gas
        ///
        /// # Arguments
        /// * `web2_pool_id` - Identifier of the pool where bet was placed
        /// * `winning_value` - The actual winning value that matches the user's prediction
        /// * `multiplier` - Reward multiplier (in basis points: 100 = 1x, 200 = 2x)
        ///
        /// # Returns
        /// * The amount of points awarded to the user
        fn claim_reward(
            ref self: ContractState, 
            web2_pool_id: felt252, 
            winning_value: felt252,
            multiplier: u32
        ) -> u32 {
            let mut world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            // Claim the reward and return the amount won
            store.claim_bet_reward(web2_pool_id, winning_value, multiplier)
        }
        
        // ------------------------- Read Methods -------------------------
        // These methods only read state and don't consume gas
        
        /// Retrieves details of a specific bet placed by the calling user
        /// This is a view function that doesn't require a transaction
        ///
        /// # Arguments
        /// * `web2_pool_id` - Identifier of the pool to check
        ///
        /// # Returns
        /// * The complete bet data structure
        fn get_user_bet(self: @ContractState, web2_pool_id: felt252) -> PoolUserBet {
            let world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            // Return bet data without modifying state
            store.read_current_user_bet(web2_pool_id)
        }
        
        /// Checks if the calling user has already placed a bet on a specific pool
        /// This is a view function that doesn't require a transaction
        ///
        /// # Arguments
        /// * `web2_pool_id` - Identifier of the pool to check
        ///
        /// # Returns
        /// * Boolean indicating if user has an active bet on this pool
        fn has_bet_on_pool(self: @ContractState, web2_pool_id: felt252) -> bool {
            let world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            let bet = store.read_current_user_bet(web2_pool_id);
            
            // Check if bet exists by verifying it's not zero
            bet.points_staked > 0
        }
        
        /// Checks if a bet is valid for claiming a reward
        /// This is a view function that doesn't require a transaction
        ///
        /// # Arguments
        /// * `web2_pool_id` - Identifier of the pool to check
        /// * `winning_value` - The winning value to compare against prediction
        ///
        /// # Returns
        /// * Boolean indicating if the bet can be claimed (matches winning value and not yet claimed)
        fn is_bet_claimable(self: @ContractState, web2_pool_id: felt252, winning_value: felt252) -> bool {
            let world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            let bet = store.read_current_user_bet(web2_pool_id);
            
            // A bet is claimable if:
            // 1. It exists (points_staked > 0)
            // 2. It has the correct prediction
            // 3. It hasn't been claimed yet
            bet.points_staked > 0 && bet.prediction_value == winning_value && !bet.is_claimed
        }
    }
}