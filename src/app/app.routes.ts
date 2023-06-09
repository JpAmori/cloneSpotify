import { Routes } from "@angular/router";
import { AuthenticatedGuard } from "./guards/authenticated.guard";

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'player/home',
        pathMatch: 'full'
    },
    {
        path: 'player',
        loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
        canLoad: [AuthenticatedGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
    }
]