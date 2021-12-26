import React from 'react'

const AccountsRoutes = [
    // {
    //     path: '/products/basic',
    //     component: React.lazy(() => import('./ProductForm')),
    // },
    // {
    //     path: '/updateproduct/:productid',
    //     component: React.lazy(() => import('./order-manage/Updateproduct')),
    // },
    {
        path: '/users/manage',
        component: React.lazy(() => import('./account-manage/AccountManage')),
    },
    {
        path: '/update-user/:userid',
        component: React.lazy(() => import('./account-manage/UpdateAccount')),
    },
    {
        path: '/users/restore',
        component: React.lazy(() => import('./account-manage/AccountRestore')),
    }
]

export default AccountsRoutes
