import {register, Module, SagaGenerator, Loading, call} from "@wonder/core-fe";
import {PublishedRestaurantAJAXWebService} from "service/PublishedRestaurantAJAXWebService";
import handleAJAXError from "utils/handleAJAXError";
import {localSearch} from "./utils";
import {RootState} from "type/state";
import {initialState} from "./state";
import {IFormInput, LOADING_MENU_ITEM_DATA, LOADING_MENU_ITEM_LIST, LOADING_UPDATE_CATEGORY_STATUS, LOADING_UPDATE_MENU_ITEM_STATUS} from "./type";
import {GetCategoryStatusAJAXResponse$Status, ListPublishedMenuAJAXResponse$Category, SearchPublishedMenuItemAJAXResponse$MenuItem, UpdateCategoryStatusAJAXRequest, UpdatePublishedMenuItemStatusAJAXRequest} from "type/api";
import {PublishedMenuAJAXWebService} from "../../service/PublishedMenuAJAXWebService";
import {PublishedMenuItemAJAXWebService} from "../../service/PublishedMenuItemAJAXWebService";

class MenuModule extends Module<RootState, "menu"> {
    @Loading(LOADING_UPDATE_MENU_ITEM_STATUS)
    *updateMenuItemStatus(menuItemId: string, request: UpdatePublishedMenuItemStatusAJAXRequest, cb?: () => void): SagaGenerator {
        yield* call(PublishedMenuItemAJAXWebService.updateStatus, menuItemId, request);
        cb && cb();
        yield* this.search();
    }

    @Loading(LOADING_UPDATE_CATEGORY_STATUS)
    *updateCategoryStatus(request: UpdateCategoryStatusAJAXRequest, cb?: () => void): SagaGenerator {
        const {selectedCategory, selectedMenu} = this.state;
        if (selectedCategory?.id && selectedMenu?.menu_id) {
            yield* call(PublishedMenuAJAXWebService.updateCategoryStatus, selectedMenu.menu_id, selectedCategory?.id, request);
            cb && cb();
        }
        yield* this.search();
    }

    *getCategoryStatus(menuId: string, categoryId: string): SagaGenerator {
        const res = yield* call(PublishedMenuAJAXWebService.getCategoryStatus, menuId, categoryId);
        this.setState({
            selectedCategoryStatus: res.status === GetCategoryStatusAJAXResponse$Status.ACTIVE,
        });
    }

    *setSelectedCategory(category: ListPublishedMenuAJAXResponse$Category): SagaGenerator {
        this.setState({
            selectedCategory: category,
        });
        yield* this.search();
    }

    *changeCategoryAndSearch(category: ListPublishedMenuAJAXResponse$Category, callback: (menuItems: SearchPublishedMenuItemAJAXResponse$MenuItem[]) => void): SagaGenerator {
        this.setState({
            selectedCategory: category,
        });

        yield* this.search();
        callback(this.state.menuItems);
    }

    *setFilterItemName(filterItemName: string | null): SagaGenerator {
        this.setState({
            filterItemName,
        });
    }

    *setSelectedMenuItem(selectedMenuItem: SearchPublishedMenuItemAJAXResponse$MenuItem | null): SagaGenerator {
        this.setState({
            selectedMenuItem,
        });
    }

    *setFilterOption(filterOption: Partial<IFormInput> | null): SagaGenerator {
        this.setState(state => {
            state.filterOption = filterOption ? ({...state.filterOption, ...filterOption} as IFormInput) : null;
        });
    }

    *setIsDetail(isDetail: boolean): SagaGenerator {
        this.setState({
            isDetail,
        });
    }

    @Loading(LOADING_MENU_ITEM_DATA)
    *getMenuItem(menuItemId: string): SagaGenerator {
        try {
            const res = yield* call(PublishedRestaurantAJAXWebService.getMenuItem, menuItemId);
            this.setState({
                menuItem: res,
            });
        } catch (error) {
            handleAJAXError(error);
        }
    }

    @Loading(LOADING_MENU_ITEM_LIST)
    *search(): SagaGenerator {
        const {selectedMenu, selectedCategory, filterItemName, filterOption} = this.state;

        try {
            if (selectedMenu && selectedCategory) {
                const params = {
                    menu_id: selectedMenu.menu_id,
                    category_id: selectedCategory.id,
                    menu_item_name: null,
                };
                if (selectedMenu?.menu_id && selectedCategory?.id) {
                    yield* this.getCategoryStatus(selectedMenu.menu_id, selectedCategory.id);
                }
                const res = yield* call(PublishedRestaurantAJAXWebService.search, params);
                if (selectedCategory.id === null) {
                    this.setState({
                        autoCompleteOptions: res.menu_items.map(item => item.name),
                    });
                }

                const arr = localSearch(res.menu_items, filterItemName, filterOption);

                this.setState({
                    menuItems: arr,
                    total: res.menu_items.length,
                });
            }
        } catch (error) {
            handleAJAXError(error);
        }
    }

    *turnToDetail(menuItemId: string, categoryName: string): SagaGenerator {
        const {selectedMenu} = this.state;
        this.setState({
            isDetail: true,
        });
        yield* this.pushHistory(`/menu/${selectedMenu!.menu_id}/menuItem/${menuItemId}`, {category: categoryName, menu: selectedMenu?.name});
    }

    *onLocationMatched(routeParam: {id: string}): SagaGenerator {
        if (this.rootState.app.restaurant.menus.length !== 0) {
            const {id} = routeParam;
            if (id) {
                yield* this.initPage(id);
            } else {
                yield* this.pushHistory(`/menu/${this.rootState.app.restaurant.menus[0].menu_id}`);
            }
        }
    }

    *initPage(menuId: string): SagaGenerator {
        this.setState({
            filterItemName: null,
        });

        if (menuId) {
            const selectedMenu = this.rootState.app.restaurant.menus.find(menu => menu.menu_id === menuId);
            if (selectedMenu) {
                this.setState(state => {
                    state.selectedMenu = selectedMenu;
                    // back from detail should remain the selectedCategory
                    const isValidateCategory = state.selectedCategory?.id === null ? false : selectedMenu.categories.some(item => item.id === state.selectedCategory?.id);
                    state.selectedCategory = !isValidateCategory ? selectedMenu.categories[0] : state.selectedCategory;
                });
                yield* this.search();
            }
        }
    }

    *onDestroy() {
        if (this.state.isDetail) {
            this.setState({
                filterItemName: null,
                isDetail: false,
            });
        } else {
            this.setState({
                ...initialState,
            });
        }
    }
}

export const module = register(new MenuModule("menu", initialState));
export const actions = module.getActions();
