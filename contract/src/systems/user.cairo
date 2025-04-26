use starkfantasy::models::user::{User};

// Interface definition
#[starknet::interface]
pub trait IUser<T> {
    // --- Write Methods (require gas) ---
    /// Creates a new user account for the caller
    fn spawn_user(ref self: T);
    
    // --- Read Methods (no gas cost) ---
    /// Retrieves the complete data of the calling user
    fn get_user_data(self: @T) -> User;
    /// Returns only the points balance of the calling user
    fn get_points_balance(self: @T) -> u32;
}

#[dojo::contract]
pub mod user {
    // Local import
    use super::{IUser};
    
    // Model imports
    use starkfantasy::models::user::{User, ZeroablePlayerTrait};
    
    // Store import
    use starkfantasy::store::{StoreTrait};

    // Dojo Imports
    #[allow(unused_imports)]
    use dojo::model::{ModelStorage};
    
    // Constructor
    fn dojo_init(ref self: ContractState) {}
    
    // Implementation of the interface methods
    #[abi(embed_v0)]
    impl UserImpl of IUser<ContractState> {
        // ------------------------- Write Methods -------------------------
        // These methods modify state and require gas
        
        /// Creates a new user in the system
        /// This operation requires a transaction and consumes gas
        fn spawn_user(ref self: ContractState) {
            let mut world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            // Create new user record with default values
            store.new_user();
        }
        
        // ------------------------- Read Methods -------------------------
        // These methods only read state and don't consume gas
        
        /// Returns all user data for the calling address
        /// This is a view function that doesn't require a transaction
        fn get_user_data(self: @ContractState) -> User {
            let world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            // Simply return the user data without modifying state
            store.read_user()
        }
        
        /// Returns only the points balance for the calling user
        /// This is a view function optimized for frequent balance checks
        fn get_points_balance(self: @ContractState) -> u32 {
            let world = self.world(@"starkfantasy");
            let store = StoreTrait::new(world);
            
            let user = store.read_user();
            user.points_balance
        }
    }
}