// Starknet import
use starknet::ContractAddress;
use core::num::traits::zero::Zero;

// Constants imports
use starkfantasy::constants;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct User {
    #[key]
    pub address: ContractAddress,
    pub points_balance: u32,  
    pub created_at: u64,    
}

#[generate_trait]
pub impl PlayerAssert of AssertTrait {
    #[inline(always)]
    fn assert_exists(self: User) {
        assert(self.is_non_zero(), 'User: Does not exist');
    }

    #[inline(always)]
    fn assert_not_exists(self: User) {
        assert(self.is_zero(), 'User: Already exist');
    }
}

pub impl ZeroablePlayerTrait of Zero<User> {
    #[inline(always)]
    fn zero() -> User {
        User {
            address: constants::ZERO_ADDRESS(),
            points_balance: 0,
            created_at: 0,
        }
    }

    #[inline(always)]
    fn is_zero(self: @User) -> bool {
       *self.address == constants::ZERO_ADDRESS()
    }

    #[inline(always)]
    fn is_non_zero(self: @User) -> bool {
        !self.is_zero()
    }
}

#[cfg(test)]
mod tests {
    use super::{User, ZeroablePlayerTrait, AssertTrait};
    use starkfantasy::constants;
    use starknet::{ContractAddress, contract_address_const};

    #[test]
    #[available_gas(1000000)]
    fn test_user_initialization() {
        // Create a mock address
        let mock_address: ContractAddress = contract_address_const::<0x123>();
        let points_balance: u32 = 1000;
        let created_at: u64 = 12345;

        let user = User {
            address: mock_address,
            points_balance: points_balance,
            created_at: created_at,
        };

        assert_eq!(
            user.address, 
            mock_address, 
            "User address should match the initialized address"
        );
        assert_eq!(
            user.points_balance, 
            points_balance, 
            "Points balance should match the initialized value"
        );
        assert_eq!(
            user.created_at, 
            created_at, 
            "Created at timestamp should match the initialized value"
        );
    }

    #[test]
    #[available_gas(1000000)]
    fn test_user_zero() {
        let user: User = ZeroablePlayerTrait::zero();

        assert_eq!(
            user.address, 
            constants::ZERO_ADDRESS(), 
            "Zero user address should match the zero address constant"
        );
        assert_eq!(
            user.points_balance, 
            0, 
            "Zero user points balance should be 0"
        );
        assert_eq!(
            user.created_at, 
            0, 
            "Zero user created_at should be 0"
        );
    }

    #[test]
    #[available_gas(1000000)]
    fn test_is_zero_and_non_zero() {
        // Test zero user
        let zero_user: User = ZeroablePlayerTrait::zero();
        assert!(
            zero_user.is_zero(), 
            "Zero user should be identified as zero"
        );
        assert!(
            !zero_user.is_non_zero(), 
            "Zero user should not be identified as non-zero"
        );

        // Test non-zero user
        let mock_address: ContractAddress = contract_address_const::<0x123>();
        let user = User {
            address: mock_address,
            points_balance: 1000,
            created_at: 12345,
        };
        
        assert!(
            !user.is_zero(), 
            "Non-zero user should not be identified as zero"
        );
        assert!(
            user.is_non_zero(), 
            "Non-zero user should be identified as non-zero"
        );
    }

    #[test]
    #[available_gas(1000000)]
    #[should_panic(expected: 'User: Does not exist')]
    fn test_assert_exists_fails() {
        let zero_user: User = ZeroablePlayerTrait::zero();
        zero_user.assert_exists();
    }

    #[test]
    #[available_gas(1000000)]
    fn test_assert_exists_succeeds() {
        let mock_address: ContractAddress = contract_address_const::<0x123>();
        let user = User {
            address: mock_address,
            points_balance: 1000,
            created_at: 12345,
        };
        
        // This should not panic
        user.assert_exists();
    }

    #[test]
    #[available_gas(1000000)]
    #[should_panic(expected: 'User: Already exist')]
    fn test_assert_not_exists_fails() {
        let mock_address: ContractAddress = contract_address_const::<0x123>();
        let user = User {
            address: mock_address,
            points_balance: 1000,
            created_at: 12345,
        };
        
        user.assert_not_exists();
    }

    #[test]
    #[available_gas(1000000)]
    fn test_assert_not_exists_succeeds() {
        let zero_user: User = ZeroablePlayerTrait::zero();
        
        // This should not panic
        zero_user.assert_not_exists();
    }

    #[test]
    #[available_gas(1000000)]
    fn test_user_address_uniqueness() {
        let address1: ContractAddress = contract_address_const::<0x123>();
        let address2: ContractAddress = contract_address_const::<0x456>();

        let user1 = User {
            address: address1,
            points_balance: 1000,
            created_at: 12345,
        };

        let user2 = User {
            address: address2,
            points_balance: 2000,
            created_at: 12346,
        };

        assert!(
            user1.address != user2.address, 
            "Users should have unique addresses"
        );
    }
}