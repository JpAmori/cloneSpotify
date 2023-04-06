import { Routes } from "@angular/router";
import { PlayerComponent } from "./player/player.component";
import { Component } from "@angular/core";
import { HomeComponent } from "../home/home.component";

export const PlayerRoutes: Routes =[
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            } 
        ]
    }
]