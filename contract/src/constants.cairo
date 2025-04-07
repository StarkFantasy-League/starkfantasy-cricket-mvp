use starknet::{ContractAddress, contract_address_const};

// Zero address
pub fn ZERO_ADDRESS() -> ContractAddress {
    contract_address_const::<0x0>()
}