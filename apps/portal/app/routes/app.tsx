import { UserPresenter, UsersService } from '@0xintuition/api'

import SidebarNav from '@components/sidebar-nav'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { isSanctioned } from '@server/ofac'
import { Address } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, 'Unauthorized')

  const isWalletSanctioned = await isSanctioned(wallet as Address)
  if (isWalletSanctioned) {
    return redirect('/sanctioned')
  }

  const userObject = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet,
    },
  })

  return json({
    userObject,
  })
}

export default function Index() {
  const { userObject } = useLoaderData<{
    userObject: UserPresenter
  }>()
  return (
    <div className="flex items-start h-screen min-h-screen">
      <SidebarNav userObject={userObject}>
        <Outlet />
      </SidebarNav>
    </div>
  )
}
