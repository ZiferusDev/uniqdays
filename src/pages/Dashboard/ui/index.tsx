import { Dashboard as DashboardPage } from './Dashboard'
import { GlobalSearchProvider } from './GlobalSearchContext'

export { CreateUniqThingForm } from './CreateUniqThingForm'

export const Dashboard = () => (
  <GlobalSearchProvider>
    <DashboardPage />
  </GlobalSearchProvider>
)
