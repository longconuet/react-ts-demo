import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

function Breadcrumb() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const items = [
    {
      title: 'Home',
      href: '/',
    },
    ...pathnames.map((name, index) => ({
      title: name.charAt(0).toUpperCase() + name.slice(1),
      href: '/' + pathnames.slice(0, index + 1).join('/'),
    })),
  ]

  return (
    <AntdBreadcrumb items={items} className="mb-4" />
  )
}

export default Breadcrumb