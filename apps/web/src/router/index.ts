import { createRouter, createWebHistory } from 'vue-router';
import createAppRouteRule from './routeRules';

function createWebRouter(baseUrl: string = '') {
    return createRouter({
        history: createWebHistory(baseUrl),
        routes: createAppRouteRule(baseUrl)
    });
}
export default createWebRouter;
