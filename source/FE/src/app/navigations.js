import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        label: '____________________________________',
        type: 'label',
    },
    {
        name: 'Trang chủ',
        icon: 'account_balance',
        path: '/dashboard',
    },
    {
        name: 'Quản lý sản phẩm',
        icon: 'wc',
        path: '/products/manage',
    },
    {
        name: 'Quản lý tài khoản',
        icon: 'person_pin',
        path: '/users/manage',
    },
    {
        name: 'Quản lý đơn hàng',
        icon: 'event_note',
        path: '/Orders/manage',
    },
    {
        name: 'Quản lý danh mục',
        icon: 'format_align_left',
        path: '/category/manage',
    },
    {
        name: 'Quản lý giao diện',
        icon: 'desktop_windows',
        path: '/material/dialog',
    },
]
