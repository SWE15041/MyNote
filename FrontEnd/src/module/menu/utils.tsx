import {escapeRegExp} from "lodash";
import {SearchPublishedMenuItemAJAXResponse$ModifierGroup, SearchPublishedMenuItemAJAXResponse$MenuItem} from "type/api";
import {IFormInput} from "./type";

export {px2vh, px2vw} from "utils/transform";

const filterByOption = (menuItems: SearchPublishedMenuItemAJAXResponse$MenuItem[], options: IFormInput) => {
    const {active, inactive, withModifier, withoutModifier, min, max} = options;
    const _min = min ? min : Number.MIN_SAFE_INTEGER;
    const _max = max ? max : Number.MAX_SAFE_INTEGER;
    const modifier: boolean[] = [];
    const status: boolean[] = [];
    withModifier && modifier.push(withModifier);
    withoutModifier && modifier.push(false);
    active && status.push(active);
    inactive && status.push(false);
    return menuItems.filter(item => item.price >= _min && item.price <= _max && (modifier.length ? modifier.some(v => v === item.has_modifier) : true) && (status.length ? status.some(v => v === item.is_active) : true));
};

export const localSearch = (menuItems: SearchPublishedMenuItemAJAXResponse$MenuItem[], keyword: string | null, options: IFormInput | null) => {
    const data = options ? filterByOption(menuItems, options) : menuItems;

    if (!keyword) return data;
    const reg = new RegExp(escapeRegExp(keyword), "ig");
    return data.filter(item => flatModifierGroup(item.modifier_groups, keyword).length > 0 || item.name.search(reg) > -1);
};

export const flatModifierGroup = (groups: SearchPublishedMenuItemAJAXResponse$ModifierGroup[], keyword: string) => {
    const args: string[] = [];
    const reg = new RegExp(escapeRegExp(keyword), "ig");
    groups.forEach(group => {
        group.modifier_options.forEach(option => {
            if (option.name.search(reg) > -1) {
                args.push(option.name);
            }
            option.sub_modifiers.forEach(subModifier => {
                if (subModifier.name.search(reg) > -1) {
                    args.push(subModifier.name);
                }
            });
        });
    });

    return args;
};

export const bolderKeywords = (str: string, keyword: string) => {
    const reg = new RegExp(escapeRegExp(keyword), "ig");
    return str.replace(reg, v => `<strong>${v}</strong>`);
};

export const saveAs = (blob: Blob, filename: string) => {
    const link = document.createElement("a");
    const body = document.querySelector("body");
    link.href = window.URL.createObjectURL(blob);
    link.download = decodeURIComponent(filename);
    link.style.display = "none";
    body?.appendChild(link);
    link.click();
    body?.removeChild(link);

    window.URL.revokeObjectURL(link.href);
};
