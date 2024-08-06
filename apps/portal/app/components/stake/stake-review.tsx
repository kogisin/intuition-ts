import { useEffect, useState } from 'react'

import {
  Button,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  Identity,
  IdentityTag,
  Tag,
  Text,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import {
  formatDisplayBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PATHS } from 'consts'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

interface StakeReviewProps {
  val: string
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  direction: 'for' | 'against'
  isError?: boolean
  modalType: 'identity' | 'claim' | null | undefined
  identity?: IdentityPresenter
  claim?: ClaimPresenter
  entry_fee: string
  exit_fee: string
}

export default function StakeReview({
  val,
  mode,
  dispatch,
  state,
  direction,
  isError,
  modalType,
  identity,
  claim,
  entry_fee,
  exit_fee,
}: StakeReviewProps) {
  const [statusText, setStatusText] = useState<string>('')

  useEffect(() => {
    const newText = isError
      ? 'Transaction failed'
      : state.status === 'transaction-pending' || state.status === 'confirm'
        ? 'Attestation in progress'
        : state.status === 'transaction-confirmed' ||
            state.status === 'complete'
          ? mode === 'deposit'
            ? 'Deposited successfully'
            : 'Redeemed successfully'
          : state.status === 'error'
            ? 'Transaction failed'
            : mode === 'deposit'
              ? 'Deposit'
              : 'Redeem'
    if (newText !== statusText) {
      setStatusText(newText)
    }
  }, [isError, state.status, mode, statusText])

  return (
    <>
      <DialogHeader>
        <DialogTitle className="justify-between">
          <div className="flex flex-row gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                dispatch({ type: 'START_TRANSACTION' })
              }}
              variant="ghost"
              size="icon"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
            </Button>
            {direction !== undefined && (
              <Tag variant={direction === 'for' ? 'for' : 'against'}>
                {direction === 'for' ? 'FOR' : 'AGAINST'}
              </Tag>
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-grow flex-col justify-center items-center h-[358px]">
        <div className="flex flex-col justify-center items-center gap-5">
          <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
          <div className="gap-5 flex flex-col items-center">
            <Text
              variant="headline"
              weight="medium text-white/70 leading-[30x]"
            >
              {mode === 'deposit' ? 'Deposit' : 'Redeem'}{' '}
              {formatDisplayBalance(Number(val), 2)} ETH on{' '}
              {modalType === 'identity' ? 'identity' : 'claim'}
            </Text>
            {modalType === 'identity' ? (
              <IdentityTag
                imgSrc={identity?.user?.image ?? identity?.image}
                variant={identity?.user ? Identity.user : Identity.nonUser}
              >
                {identity?.user?.display_name ?? identity?.display_name}
              </IdentityTag>
            ) : (
              <Claim
                size="md"
                link={`${PATHS.CLAIM}/${claim?.claim_id}`}
                subject={{
                  variant: claim?.subject?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label: getAtomLabel(claim?.subject as IdentityPresenter),
                  imgSrc: getAtomImage(claim?.subject as IdentityPresenter),
                  id: claim?.subject?.identity_id,
                  description: getAtomDescription(
                    claim?.subject as IdentityPresenter,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    claim?.subject as IdentityPresenter,
                  ),
                  link: getAtomLink(claim?.subject as IdentityPresenter),
                }}
                predicate={{
                  variant: claim?.predicate?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label: getAtomLabel(claim?.predicate as IdentityPresenter),
                  imgSrc: getAtomImage(claim?.predicate as IdentityPresenter),
                  id: claim?.predicate?.identity_id,
                  description: getAtomDescription(
                    claim?.predicate as IdentityPresenter,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    claim?.predicate as IdentityPresenter,
                  ),
                  link: getAtomLink(claim?.predicate as IdentityPresenter),
                }}
                object={{
                  variant: claim?.object?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label: getAtomLabel(claim?.object as IdentityPresenter),
                  imgSrc: getAtomImage(claim?.object as IdentityPresenter),
                  id: claim?.object?.identity_id,
                  description: getAtomDescription(
                    claim?.object as IdentityPresenter,
                  ),
                  ipfsLink: getAtomIpfsLink(claim?.object as IdentityPresenter),
                  link: getAtomLink(claim?.object as IdentityPresenter),
                }}
              />
            )}
            <Text
              variant="base"
              weight="normal"
              className="m-auto text-neutral-50/50 leading-normal"
            >
              Estimated Fees:{' '}
              {(+val * (mode === 'deposit' ? +entry_fee : +exit_fee)).toFixed(
                6,
              )}{' '}
              ETH
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}
