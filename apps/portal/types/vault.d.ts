export type MultivaultConfig = {
  entry_fee: string
  formatted_entry_fee: string
  exit_fee: string
  formatted_exit_fee: string
  protocol_fee: string
  admin: string
  protocol_vault: string
  fee_denominator: string
  min_deposit: string
  min_share: string
  atom_cost: string
  formatted_atom_cost: string
  atom_creation_fee: string
  formatted_atom_creation_fee: string
}

export type IdentityVaultDetails = {
  vault_id: string
  assets_sum: string
  formatted_assets_sum: string
  conviction_sum: string
  formatted_conviction_sum: string
  conviction_price: string
  formatted_conviction_price: string
  entry_fee: string
  formatted_entry_fee: string
  exit_fee: string
  formatted_exit_fee: string
  protocol_fee: string
  formatted_protocol_fee: string
  admin: string
  protocol_vault: string
  fee_denominator: string
  formatted_fee_denominator: string
  min_deposit: string
  formatted_min_deposit: string
  min_share: string
  formatted_min_share: string
  atom_cost: string
  formatted_atom_cost: string
  atom_creation_fee: string
  formatted_atom_creation_fee: string
  user_conviction?: string
  formatted_user_conviction?: string
  user_conviction_value?: string
  formatted_user_conviction_value?: string
}

export type VaultDetails = {
  assets_sum: string
  formatted_assets_sum: string
  conviction_sum: string
  formatted_conviction_sum: string
  conviction_price: string
  formatted_conviction_price: string
  user_conviction?: string
  formatted_user_conviction?: string
  user_conviction_value?: string
  formatted_user_conviction_value?: string
  against_assets_sum?: string
  formatted_against_assets_sum?: string
  against_conviction_sum?: string
  formatted_against_conviction_sum?: string
  against_conviction_price?: string
  formatted_against_conviction_price?: string
  user_conviction_against?: string
  formatted_user_conviction_against?: string
  user_conviction_against_value?: string
  formatted_user_conviction_against_value?: string
  entry_fee: string
  formatted_entry_fee: string
  exit_fee: string
  formatted_exit_fee: string
  protocol_fee: string
  formatted_protocol_fee: string
  admin: string
  protocol_vault: string
  fee_denominator: string
  min_deposit: string
  formatted_min_deposit: string
  min_share: string
  formatted_min_share: string
  atom_cost?: string
  formatted_atom_cost?: string
  atom_creation_fee?: string
  formatted_atom_creation_fee?: string
}
