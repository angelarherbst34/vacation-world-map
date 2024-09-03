import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from '@/App'
import Map from '@/views/Map'
import AddNew from '@/views/AddNew'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Map />} />
      <Route path="add-new" element={<AddNew />} />
    </Route>,
  ),
)

export default router
