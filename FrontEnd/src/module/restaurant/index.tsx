import {module} from "./module";
import React from "react";

const RestaurantComponent = () => <div style={{height: 0}} />;

export const restaurantActions = module.getActions();

export const Restaurant = module.attachLifecycle(RestaurantComponent);
