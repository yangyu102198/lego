import { type RouteRecordRaw } from 'vue-router';

function createAppRouteRule(baseUrl: string) {
    const routeRule: RouteRecordRaw[] = [];
    routeRule.push(
        ...[
            {
                path: baseUrl + '/',
                component: () => import('@/components/layout.vue'),
                children: [
                    {
                        path: 'edit',
                        name: 'edit',
                        component: () => import('@/views/edit.vue')
                    }
                ]
            },
            {
                path: '/:pathMatch(.*)*',
                name: '404',
                component: () => import('@/views/404.vue')
            }
        ]
    );
    return routeRule;
}
export default createAppRouteRule;
