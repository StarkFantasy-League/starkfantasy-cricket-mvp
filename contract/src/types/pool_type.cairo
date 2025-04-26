use core::traits::Into;

#[derive(Copy, Drop, Serde)]
pub enum PoolType {
    Normal,
    Special,
}

pub impl IntoPoolTypeFelt252 of Into<PoolType, felt252> {
    #[inline(always)]
    fn into(self: PoolType) -> felt252 {
        match self {
            PoolType::Normal => 'Normal',
            PoolType::Special => 'Special',
        }
    }
}

pub impl IntoPoolTypeu8 of Into<PoolType, u8> {
    #[inline(always)]
    fn into(self: PoolType) -> u8 {
        match self {
            PoolType::Normal => 0,
            PoolType::Special => 1,
        }
    }
}

pub impl Intou8PoolType of Into<u8, PoolType> {
    #[inline]
    fn into(self: u8) -> PoolType {
        match self {
            0 => PoolType::Normal,
            1 => PoolType::Special,
            _ => PoolType::Normal // Default to Normal for invalid values
        }
    }
}


#[cfg(test)]
mod tests {
    use super::{PoolType, IntoPoolTypeFelt252, IntoPoolTypeu8, Intou8PoolType};

    #[test]
    #[available_gas(1000000)]
    fn test_pool_type_into_felt252() {
        let normal = PoolType::Normal;
        let special = PoolType::Special;

        assert_eq!(normal.into(), 'Normal', "Should be converted to 'Normal");
        assert_eq!(special.into(), 'Special', "Should be converted to 'Special");
    }

    #[test]
    #[available_gas(1000000)]
    fn test_pool_type_into_u8() {
        let normal = PoolType::Normal;
        let special = PoolType::Special;

        assert_eq!(normal.into(), 0_u8, "Should be converted to 0");
        assert_eq!(special.into(), 1_u8, "Should be converted to 1");
    }

    #[test]
    #[available_gas(1000000)]
    fn test_u8_into_pool_type() {
        let normal_u8: u8 = 0;
        let special_u8: u8 = 1;
        let invalid_u8: u8 = 99;

        let normal_type: PoolType = normal_u8.into();
        let special_type: PoolType = special_u8.into();
        let default_type: PoolType = invalid_u8.into();

        let normal_type_u8: u8 = normal_type.into();
        let special_type_u8: u8 = special_type.into();
        let default_type_u8: u8 = default_type.into();

        assert_eq!(normal_type_u8, 0_u8, "0 should convert to PoolType::Normal (0)");
        assert_eq!(special_type_u8, 1_u8, "1 should convert to PoolType::Special (1)");
        assert_eq!(default_type_u8, 0_u8, "Invalid value should default to PoolType::Normal (0)");
    }
}
