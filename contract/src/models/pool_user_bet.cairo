// Starknet import
use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct PoolUserBet {
    #[key]
    user: ContractAddress,   
    #[key]
    web2_pool_id: felt252,     
    prediction_value: felt252,   
    pool_type: u8,  
    points_staked: u32,     
    is_claimed: bool,       
    created_at: u64,    
}

// Traits implementation
#[generate_trait]
pub impl PoolUserBetImpl of PoolUserBetTrait {

    // Constructor
    fn new(user: ContractAddress, web2_pool_id: felt252, prediction_value: felt252, pool_type: u8, points_staked: u32, current_time: u64) -> PoolUserBet {
        PoolUserBet {
            user: user,
            web2_pool_id: web2_pool_id,
            prediction_value: prediction_value,
            points_staked: points_staked,
            pool_type: pool_type, 
            is_claimed: false,
            created_at: current_time,
        }
    }

    // Method to update the claimed status and recover the points staked
    fn claim_reward(ref self: PoolUserBet, winning_value: felt252) -> u32 {
        assert(self.prediction_value == winning_value, 'Prediction does not match');
        assert(!self.is_claimed, 'Already claimed');
        
        self.is_claimed = true;
        self.points_staked // Return the points staked as reward 
    }

}

#[cfg(test)]
mod tests {
    use super::{PoolUserBet, PoolUserBetImpl};
    use starknet::{ContractAddress, contract_address_const};

    #[test]
    #[available_gas(1000000)]
    fn test_pool_user_bet_initialization() {
        // Create a mock address
        let mock_address: ContractAddress = contract_address_const::<0x123>();
        let web2_pool_id: felt252 = 42;
        let prediction_value: felt252 = 100;
        let points_staked: u32 = 500;
        let is_claimed: bool = false;
        let created_at: u64 = 12345;

        let bet = PoolUserBet {
            user: mock_address,
            web2_pool_id: web2_pool_id,
            prediction_value: prediction_value,
            pool_type: 0, // Default value for pool_type
            points_staked: points_staked,
            is_claimed: is_claimed,
            created_at: created_at,
        };

        assert_eq!(
            bet.user, 
            mock_address, 
            "Bet user address should match the initialized address"
        );
        assert_eq!(
            bet.web2_pool_id, 
            web2_pool_id, 
            "Web2 pool ID should match the initialized value"
        );
        assert_eq!(
            bet.prediction_value, 
            prediction_value, 
            "Prediction value should match the initialized value"
        );
        assert_eq!(
            bet.points_staked, 
            points_staked, 
            "Points staked should match the initialized value"
        );
        assert_eq!(
            bet.is_claimed, 
            is_claimed, 
            "Is claimed should match the initialized value"
        );
        assert_eq!(
            bet.created_at, 
            created_at, 
            "Created at timestamp should match the initialized value"
        );
    }

    // New test for the 'new' constructor method
    #[test]
    #[available_gas(1000000)]
    fn test_pool_user_bet_new_constructor() {
        // Test parameters
        let user: ContractAddress = contract_address_const::<0x123>();
        let web2_pool_id: felt252 = 42;
        let prediction_value: felt252 = 100;
        let pool_type: u8 = 0; // Default value for pool_type
        let points_staked: u32 = 500;
        let current_time: u64 = 12345;

        // Create bet using the new constructor
        let bet = PoolUserBetImpl::new(
            user,
            web2_pool_id,
            prediction_value,
            pool_type,
            points_staked,
            current_time
        );

        // Verify all fields
        assert_eq!(bet.user, user, "User address should match");
        assert_eq!(bet.web2_pool_id, web2_pool_id, "Web2 pool ID should match");
        assert_eq!(bet.prediction_value, prediction_value, "Prediction value should match");
        assert_eq!(bet.points_staked, points_staked, "Points staked should match");
        assert_eq!(bet.is_claimed, false, "New bet should not be claimed");
        assert_eq!(bet.created_at, current_time, "Created at time should match");
    }

    // Test for claim_reward method - successful claim
    #[test]
    #[available_gas(1000000)]
    fn test_pool_user_bet_claim_reward_success() {
        // Create a bet
        let user: ContractAddress = contract_address_const::<0x123>();
        let web2_pool_id: felt252 = 42;
        let prediction_value: felt252 = 100;
        let pool_type: u8 = 0; // Default value for pool_type
        let points_staked: u32 = 500;
        let current_time: u64 = 12345;

        // Use the constructor for consistency
        let mut bet = PoolUserBetImpl::new(
            user,
            web2_pool_id,
            prediction_value,
            pool_type,
            points_staked,
            current_time
        );

        // Claim the reward with matching winning value
        let reward = bet.claim_reward(prediction_value);

        // Verify the bet is now claimed and reward amount is correct
        assert!(bet.is_claimed, "Bet should be marked as claimed after reward claim");
        assert_eq!(reward, points_staked, "Reward should match points staked");
    }

    // Test for claim_reward method - prediction mismatch
    #[test]
    #[available_gas(1000000)]
    #[should_panic(expected: 'Prediction does not match')]
    fn test_pool_user_bet_claim_reward_prediction_mismatch() {
        // Create a bet
        let user: ContractAddress = contract_address_const::<0x123>();
        let web2_pool_id: felt252 = 42;
        let prediction_value: felt252 = 100;
        let pool_type: u8 = 0; // Default value for pool_type
        let wrong_winning_value: felt252 = 200; // Different from prediction
        let points_staked: u32 = 500;
        let current_time: u64 = 12345;

        // Use the constructor for consistency
        let mut bet = PoolUserBetImpl::new(
            user,
            web2_pool_id,
            prediction_value,
            pool_type,
            points_staked,
            current_time
        );

        // This should panic because winning value doesn't match prediction
        let _reward = bet.claim_reward(wrong_winning_value);
    }

    // Test for claim_reward method - already claimed
    #[test]
    #[available_gas(1000000)]
    #[should_panic(expected: 'Already claimed')]
    fn test_pool_user_bet_claim_reward_already_claimed() {
        // Create a bet
        let user: ContractAddress = contract_address_const::<0x123>();
        let web2_pool_id: felt252 = 42;
        let prediction_value: felt252 = 100;
        let pool_type: u8 = 0; // Default value for pool_type
        let points_staked: u32 = 500;
        let current_time: u64 = 12345;

        // Use the constructor for consistency
        let mut bet = PoolUserBetImpl::new(
            user,
            web2_pool_id,
            prediction_value,
            pool_type,
            points_staked,
            current_time
        );

        // First claim (should succeed)
        let _reward = bet.claim_reward(prediction_value);
        
        // Second claim (should fail)
        let _reward2 = bet.claim_reward(prediction_value);
    }

    #[test]
    #[available_gas(1000000)]
    fn test_pool_user_bet_with_claimed_status() {
        let mock_address: ContractAddress = contract_address_const::<0x123>();
        
        // Create a bet that has been claimed
        let bet = PoolUserBet {
            user: mock_address,
            web2_pool_id: 42,
            prediction_value: 100,
            pool_type: 0, // Default value for pool_type
            points_staked: 500,
            is_claimed: true,
            created_at: 12345,
        };

        assert!(
            bet.is_claimed, 
            "Bet should be marked as claimed"
        );
    }

    #[test]
    #[available_gas(1000000)]
    fn test_pool_user_bet_unique_keys() {
        let address1: ContractAddress = contract_address_const::<0x123>();
        let address2: ContractAddress = contract_address_const::<0x456>();
        let pool_id1: felt252 = 42;
        let pool_id2: felt252 = 43;

        // Create bets with the constructor
        let bet1 = PoolUserBetImpl::new(
            address1,
            pool_id1,
            100,
            0,
            500,
            12345
        );

        let bet2 = PoolUserBetImpl::new(
            address1,
            pool_id2,
            200,
            0,
            700,
            12346
        );

        let bet3 = PoolUserBetImpl::new(
            address2,
            pool_id1,
            300,
            0,
            900,
            12347
        );

        // Test different key combinations
        assert!(
            bet1.user == bet2.user && bet1.web2_pool_id != bet2.web2_pool_id,
            "Bets with same user but different pool IDs should be distinguishable"
        );
        
        assert!(
            bet1.user != bet3.user && bet1.web2_pool_id == bet3.web2_pool_id,
            "Bets with different users but same pool IDs should be distinguishable"
        );
        
        // Verify unique key combinations create different bets
        assert!(
            !(bet1.user == bet2.user && bet1.web2_pool_id == bet2.web2_pool_id),
            "Bets should not have identical composite keys"
        );
        
        assert!(
            !(bet1.user == bet3.user && bet1.web2_pool_id == bet3.web2_pool_id),
            "Bets should not have identical composite keys"
        );
    }

    #[test]
    #[available_gas(1000000)]
    fn test_pool_user_bet_with_zero_points_staked() {
        let mock_address: ContractAddress = contract_address_const::<0x123>();
        
        // Create a bet with zero points staked using the constructor
        let bet = PoolUserBetImpl::new(
            mock_address,
            42,
            100,
            0,
            0,
            12345
        );

        assert_eq!(
            bet.points_staked,
            0,
            "Points staked should be zero"
        );
    }
}