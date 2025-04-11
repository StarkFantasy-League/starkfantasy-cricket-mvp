#[cfg(test)]
mod tests {
    use dojo::model::{ModelStorage};
    
    // Import test utils
    use starkfantasy::tests::utils::utils::{
        PLAYER, create_test_world, create_user_system, create_bet_system, cheat_caller_address
    };
    
    // Import systems
    use starkfantasy::systems::user::IUserDispatcherTrait;
    use starkfantasy::systems::bet::IBetDispatcherTrait;
    
    // Import models and types
    use starkfantasy::models::user::{User};
    use starkfantasy::models::pool_user_bet::{PoolUserBet};
    
    // Import constants
    use starkfantasy::constants;

    #[test]
    #[available_gas(40000000)]
    fn test_place_match_bet() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user first
        cheat_caller_address(PLAYER());
        user_system.spawn_user();

        // Test action: place match bet
        let web2_pool_id: felt252 = 123;
        let prediction_value: felt252 = '2-1'; // Predicting home team scores 2, away team scores 1
        let points_staked: u32 = 100;

        bet_system.place_match_bet(web2_pool_id, prediction_value, points_staked);

        // Verify bet was placed correctly
        let bet: PoolUserBet = world.read_model((PLAYER(), web2_pool_id));
        assert(bet.user == PLAYER(), 'Wrong user address');
        assert(bet.web2_pool_id == web2_pool_id, 'Wrong pool ID');
        assert(bet.prediction_value == prediction_value, 'Wrong prediction');
        assert(bet.points_staked == points_staked, 'Wrong staked amount');
        assert(bet.pool_type == 0, 'Wrong pool type'); // 0 = Normal pool
        assert(!bet.is_claimed, 'Should not be claimed yet');

        // Verify user's points were reduced
        let user: User = world.read_model(PLAYER());
        assert(user.points_balance == constants::INITIAL_POINTS - points_staked, 'Wrong points balance');
    }

    #[test]
    #[available_gas(40000000)]
    fn test_place_special_bet() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user first
        cheat_caller_address(PLAYER());
        user_system.spawn_user();

        // Test action: place special bet
        let web2_pool_id: felt252 = 456;
        let prediction_value: felt252 = 'Messi'; // Predicting Messi as top scorer
        let points_staked: u32 = 150;

        bet_system.place_special_bet(web2_pool_id, prediction_value, points_staked);

        // Verify bet was placed correctly
        let bet: PoolUserBet = world.read_model((PLAYER(), web2_pool_id));
        assert(bet.user == PLAYER(), 'Wrong user address');
        assert(bet.web2_pool_id == web2_pool_id, 'Wrong pool ID');
        assert(bet.prediction_value == prediction_value, 'Wrong prediction');
        assert(bet.points_staked == points_staked, 'Wrong staked amount');
        assert(bet.pool_type == 1, 'Wrong pool type'); // 1 = Special pool
        assert(!bet.is_claimed, 'Should not be claimed yet');

        // Verify user's points were reduced
        let user: User = world.read_model(PLAYER());
        assert(user.points_balance == constants::INITIAL_POINTS - points_staked, 'Wrong points balance');
    }

    #[test]
    #[available_gas(40000000)]
    fn test_claim_reward() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user and place bet
        cheat_caller_address(PLAYER());
        user_system.spawn_user();
        
        let web2_pool_id: felt252 = 123;
        let prediction_value: felt252 = '2-1';
        let points_staked: u32 = 100;
        let multiplier: u32 = 200; // 2x reward
        
        bet_system.place_match_bet(web2_pool_id, prediction_value, points_staked);
        
        // Record balance after placing bet
        let pre_claim_balance = user_system.get_points_balance();
        
        // Test action: claim reward
        let reward = bet_system.claim_reward(web2_pool_id, prediction_value, multiplier);
        
        // Expected reward calculation: staked * multiplier / 100
        let expected_reward = (points_staked * multiplier) / 100;
        assert(reward == expected_reward, 'Wrong reward amount');
        
        // Verify bet is now claimed
        let bet: PoolUserBet = world.read_model((PLAYER(), web2_pool_id));
        assert(bet.is_claimed, 'Bet should be marked claimed');
        
        // Verify user's balance increased by reward amount
        let post_claim_balance = user_system.get_points_balance();
        assert(post_claim_balance == pre_claim_balance + reward, 'Balance not updated correctly');
    }

    #[test]
    #[should_panic]
    #[available_gas(40000000)]
    fn test_claim_reward_wrong_prediction() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user and place bet
        cheat_caller_address(PLAYER());
        user_system.spawn_user();
        
        let web2_pool_id: felt252 = 123;
        let prediction_value: felt252 = '2-1';
        let wrong_value: felt252 = '1-1';
        let points_staked: u32 = 100;
        let multiplier: u32 = 200;
        
        bet_system.place_match_bet(web2_pool_id, prediction_value, points_staked);
        
        // Attempt to claim with wrong prediction - should fail
        bet_system.claim_reward(web2_pool_id, wrong_value, multiplier);
    }

    #[test]
    #[available_gas(40000000)]
    fn test_get_user_bet() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user and place bet
        cheat_caller_address(PLAYER());
        user_system.spawn_user();
        
        let web2_pool_id: felt252 = 123;
        let prediction_value: felt252 = '2-1';
        let points_staked: u32 = 100;
        
        bet_system.place_match_bet(web2_pool_id, prediction_value, points_staked);
        
        // Test read action
        let bet = bet_system.get_user_bet(web2_pool_id);
        
        // Verification
        assert(bet.user == PLAYER(), 'Wrong user address');
        assert(bet.web2_pool_id == web2_pool_id, 'Wrong pool ID');
        assert(bet.prediction_value == prediction_value, 'Wrong prediction');
        assert(bet.points_staked == points_staked, 'Wrong staked amount');
    }

    #[test]
    #[available_gas(40000000)]
    fn test_has_bet_on_pool() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user and place bet
        cheat_caller_address(PLAYER());
        user_system.spawn_user();
        
        let web2_pool_id: felt252 = 123;
        let non_existent_pool_id: felt252 = 999;
        let prediction_value: felt252 = '2-1';
        let points_staked: u32 = 100;
        
        // Check before placing bet
        assert(!bet_system.has_bet_on_pool(web2_pool_id), 'Should not have bet yet');
        
        // Place bet
        bet_system.place_match_bet(web2_pool_id, prediction_value, points_staked);
        
        // Test action and verification
        assert(bet_system.has_bet_on_pool(web2_pool_id), 'Should have bet now');
        assert(!bet_system.has_bet_on_pool(non_existent_pool_id), 'Not have bet on different pool');
    }

    #[test]
    #[available_gas(40000000)]
    fn test_is_bet_claimable() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user and place bet
        cheat_caller_address(PLAYER());
        user_system.spawn_user();
        
        let web2_pool_id: felt252 = 123;
        let prediction_value: felt252 = '2-1';
        let wrong_value: felt252 = '1-1';
        let points_staked: u32 = 100;
        let multiplier: u32 = 200;
        
        bet_system.place_match_bet(web2_pool_id, prediction_value, points_staked);
        
        // Test claimable with correct prediction
        assert(bet_system.is_bet_claimable(web2_pool_id, prediction_value), 'Should be claimable');
        
        // Test not claimable with wrong prediction
        assert(!bet_system.is_bet_claimable(web2_pool_id, wrong_value), 'Not be claimable - wrong value');
        
        // Claim the bet
        bet_system.claim_reward(web2_pool_id, prediction_value, multiplier);
        
        // Test not claimable after already claimed
        assert(!bet_system.is_bet_claimable(web2_pool_id, prediction_value), 'Not be claimable after claimed');
    }

    #[test]
    #[should_panic]
    #[available_gas(40000000)]
    fn test_place_bet_insufficient_balance() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);
        let bet_system = create_bet_system(world);

        // Create user first
        cheat_caller_address(PLAYER());
        user_system.spawn_user();

        // Attempt to place bet with more points than available
        let web2_pool_id: felt252 = 123;
        let prediction_value: felt252 = '2-1';
        let points_staked: u32 = constants::INITIAL_POINTS + 1; // More than initial balance
        
        // Should fail with insufficient balance
        bet_system.place_match_bet(web2_pool_id, prediction_value, points_staked);
    }
}