pub mod utils {
    // Starknet imports
    use starknet::testing::{set_contract_address, set_account_contract_address, set_block_timestamp};
    use starknet::{ContractAddress};
    
    // Dojo imports
    use dojo_cairo_test::WorldStorageTestTrait;
    use dojo::world::{WorldStorageTrait, WorldStorage};
    use dojo_cairo_test::{
        spawn_test_world, NamespaceDef, TestResource, ContractDefTrait, ContractDef,
    };

    // System imports
    use starkfantasy::systems::bet::{bet, IBetDispatcher};
    use starkfantasy::systems::user::{user, IUserDispatcher};

    // Models imports
    use starkfantasy::models::user::{m_User};
    use starkfantasy::models::pool_user_bet::{m_PoolUserBet};

    // ------- Constants -------
    pub fn PLAYER() -> ContractAddress {
        starknet::contract_address_const::<'PLAYER'>()
    }

     // ------- Definitions -------
    pub fn namespace_def() -> NamespaceDef {
        let ndef = NamespaceDef {
            namespace: "starkfantasy",
            resources: [
                TestResource::Model(m_User::TEST_CLASS_HASH),
                TestResource::Model(m_PoolUserBet::TEST_CLASS_HASH),
                TestResource::Contract(user::TEST_CLASS_HASH),
                TestResource::Contract(bet::TEST_CLASS_HASH),
            ].span(),
        };

        ndef
    }

    pub fn contract_defs() -> Span<ContractDef> {
        [
            ContractDefTrait::new(@"starkfantasy", @"user")
                .with_writer_of([dojo::utils::bytearray_hash(@"starkfantasy")].span()),
            ContractDefTrait::new(@"starkfantasy", @"bet")
                .with_writer_of([dojo::utils::bytearray_hash(@"starkfantasy")].span()),
                
        ]
            .span()
    }

    pub fn create_bet_system(world: WorldStorage) -> IBetDispatcher {
         let (contract_address, _) = world.dns(@"bet").unwrap();

         let bet_system = IBetDispatcher { contract_address };

         bet_system
    }

    pub fn create_user_system(world: WorldStorage) -> IUserDispatcher {
        let (contract_address, _) = world.dns(@"user").unwrap();

        let user_system = IUserDispatcher { contract_address };

        user_system
   }

    pub fn create_test_world() -> WorldStorage {
         // Initialize test environment
         let ndef = namespace_def();

         // Register the resources.
         let mut world = spawn_test_world([ndef].span());
 
         // Ensures permissions and initializations are synced.
         world.sync_perms_and_inits(contract_defs());

         world
    }
    

    // ------- Custom cheat functions -------

    // set_contract_address: used to define the address of the calling contract,
    // set_account_contract_address: used to define the address of the account used for the current
    // transaction.
    pub fn cheat_caller_address(address: ContractAddress) {
        set_contract_address(address);
        set_account_contract_address(address);
    }

    pub fn cheat_block_timestamp(timestamp: u64) {
        set_block_timestamp(timestamp);
    }

     // ------- Events testing functions -------
    pub fn drop_all_events(address: ContractAddress) {
        loop {
            match starknet::testing::pop_log_raw(address) {
                core::option::Option::Some(_) => {},
                core::option::Option::None => { break; },
            };
        }
    }
    
}
