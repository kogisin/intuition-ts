import { CURRENT_ENV } from 'consts'
import type { GetContractReturnType } from 'viem'

import { getChainEnvConfig } from '../utils/environment'
import { useContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useBatchCreateTriple = () => {
  const multivault = useMultivaultContract(
    getChainEnvConfig(CURRENT_ENV).chainId.toString(),
  ) as GetContractReturnType

  return useContractWriteAndWait({
    ...multivault,
    functionName: 'batchCreateTriple',
  })
}
