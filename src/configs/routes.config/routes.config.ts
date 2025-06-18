import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'amenities',
        path: '/amenities',
        component: lazy(() => import('@/views/amenities/Amenities')),
        authority: [],
    },
    {
        key: 'customization',
        path: '/customization',
        component: lazy(() => import('@/views/customization/Customization')),
        authority: [],
    },
    {
        key: 'chalets',
        path: '/chalets',
        component: lazy(() => import('@/views/chalets/Chalets')),
        authority: [],
    },
    {
        key: 'viewTypes',
        path: '/viewTypes',
        component: lazy(() => import('@/views/viewTypes/ViewTypes')),
        authority: [],
    },
    {
        key: 'badges',
        path: '/badges',
        component: lazy(() => import('@/views/badges/Badges')),
        authority: [],
    },
    {
        key: 'booking',
        path: '/booking',
        component: lazy(() => import('@/views/booking/Booking')),
        authority: [],
    },
    {
        key: 'users',
        path: '/users',
        component: lazy(() => import('@/views/users/Users')),
        authority: [],
    },
    /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     component: lazy(() => import('@/views/demo/SingleMenuView')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView1'),
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView2'),
    //     ),
    //     authority: [],
    // },
    ...othersRoute,
]
