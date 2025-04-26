#[cfg(test)]
mod tests {
    use dojo::model::{ModelStorage};
    
    // Import test utils
    use starkfantasy::tests::utils::utils::{
        PLAYER, create_test_world, create_user_system, cheat_caller_address
    };
    
    // Import systems
    use starkfantasy::systems::user::IUserDispatcherTrait;
    
    // Import models
    use starkfantasy::models::user::{User};
    
    // Import constants
    use starkfantasy::constants;

    #[test]
    #[available_gas(40000000)]
    fn test_spawn_user() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);

        // Set caller address for test
        cheat_caller_address(PLAYER());

        // Test action: spawn new user
        user_system.spawn_user();

        // Verification
        let user: User = world.read_model(PLAYER());
        assert(user.address == PLAYER(), 'Invalid user address');
        assert(user.points_balance == constants::INITIAL_POINTS, 'Wrong initial points');
    }

    #[test]
    #[available_gas(40000000)]
    fn test_get_user_data() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);

        // Create user first
        cheat_caller_address(PLAYER());
        user_system.spawn_user();

        // Test read action
        let user_data = user_system.get_user_data();

        // Verification
        assert(user_data.address == PLAYER(), 'Wrong user address');
        assert(user_data.points_balance == constants::INITIAL_POINTS, 'Wrong points balance');
    }

    #[test]
    #[available_gas(40000000)]
    fn test_get_points_balance() {
        // Setup
        let world = create_test_world();
        let user_system = create_user_system(world);

        // Create user first
        cheat_caller_address(PLAYER());
        user_system.spawn_user();

        // Test read action
        let balance = user_system.get_points_balance();

        // Verification
        assert(balance == constants::INITIAL_POINTS, 'Wrong points balance');
    }

}