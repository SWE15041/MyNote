import {register, Module, SagaGenerator} from "@wonder/core-fe";
import {RootState} from "type/state";
import {initialState} from "./state";
import {Query} from "./type";
import {produce} from "immer";

class OrderHistoryModule extends Module<RootState, "orderHistory"> {
    *setQuery(query: Partial<Query>): SagaGenerator {
        this.setState({
            query: produce(this.state.query, draft => {
                return {...draft, ...query};
            }),
        });
    }
}

export const module = register(new OrderHistoryModule("orderHistory", initialState));
export const actions = module.getActions();
