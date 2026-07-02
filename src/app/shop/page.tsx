import { Suspense } from 'react'
import { ShopPage } from '../../components/pages/ShopPage'
import { Loading } from '../../components/common/Loading'

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ShopPage />
    </Suspense>
  )
}
