export interface ReplaceCloudMessageTokenRequest {
    old_message_token: string | null;
    new_message_token: string; // constraints: notBlank=true
}
export interface UserChangePasswordAJAXRequest {
    old_password: string; // constraints: notBlank=true, size=(8, 25)
    new_password: string; // constraints: notBlank=true, pattern=^(?![0-9]+$)(?![a-zA-Z]+$)[\s\S]{8,25}$
}
export interface UpdateUserCurrentRestaurantAJAXRequest {
    restaurant_id: string; // constraints: notBlank=true
}
export interface GetCurrentUserAJAXResponse {
    user_id: string; // constraints: notBlank=true
    email: string; // constraints: notBlank=true
    first_name: string; // constraints: notBlank=true
    last_name: string; // constraints: notBlank=true
    phone_number: string | null; // constraints: notBlank=true
    restaurant_id: string; // constraints: notBlank=true
    restaurant_name: string; // constraints: notBlank=true
    restaurant_portal_logo_image: ImageAJAXView;
    restaurant_count: number;
    user_permission: GetCurrentUserAJAXResponse$UserPermission;
}
export interface ImageAJAXView {
    image_key: string | null; // constraints: notBlank=true
    original_file_name: string | null; // constraints: notBlank=true
}
export interface GetCurrentUserAJAXResponse$UserPermission {
    roles: GetCurrentUserAJAXResponse$Role[];
    permission_codes: string[];
}
export interface GetCurrentUserAJAXResponse$Role {
    role_id: string; // constraints: notBlank=true
    role_name: string; // constraints: notBlank=true
}
export interface UserLoginAJAXRequest {
    email: string; // constraints: notBlank=true, pattern=^[a-zA-Z0-9\._\+-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
    password: string; // constraints: notBlank=true, size=(8, 25)
}
export interface ListUserRestaurantsAJAXResponse {
    restaurants: ListUserRestaurantsAJAXResponse$Restaurant[]; // constraints: size=(1, -1)
}
export interface ListUserRestaurantsAJAXResponse$Restaurant {
    id: string; // constraints: notBlank=true
    name: string; // constraints: notBlank=true
    portal_logo_image: ImageAJAXView;
    status: ListUserRestaurantsAJAXResponse$AvailabilityStatusAJAXView;
}
export enum ListUserRestaurantsAJAXResponse$AvailabilityStatusAJAXView {
    ACTIVE = "ACTIVE",
    OUT_SERVICE = "OUT_SERVICE",
    CLOSED = "CLOSED",
    INACTIVE = "INACTIVE",
    PAUSE_ORDERS = "PAUSE_ORDERS",
    UNPUBLISHED = "UNPUBLISHED",
    FORCE_CLOSED = "FORCE_CLOSED",
}
export interface GetOrderAJAXResponse {
    id: string; // constraints: notBlank=true
    order_number: string; // constraints: notBlank=true
    customer_name: string; // constraints: notBlank=true
    customer_first_name: string; // constraints: notBlank=true
    customer_last_name: string; // constraints: notBlank=true
    customer_phone: string | null; // constraints: notBlank=true
    order_date: Date;
    dining_option: OrderDiningOptionView;
    delivery_address: string | null; // constraints: notBlank=true
    status: OrderStatusView;
    estimated_delivery_time: number | null;
    estimated_pickup_time: number | null;
    note: string | null; // constraints: notBlank=true
    subtotal: number;
    delivery_fee: number;
    delivery_type: GetOrderAJAXResponse$DeliveryType | null;
    delivery_fee_tax: number;
    tax: number;
    tip: number;
    total_amount: number;
    tip_type: OrderTipTypeView;
    item_count: number;
    item_quantity: number;
    need_utensils: boolean | null;
    show_special_instructions: boolean;
    display_utensils_toggle: boolean;
    delivery_instructions: string | null; // constraints: notBlank=true
    order_items: GetOrderAJAXResponse$OrderItem[];
    is_new: boolean;
    is_new_canceled: boolean;
    payout_summary: GetOrderAJAXResponse$PayoutSummary | null;
}
export enum OrderDiningOptionView {
    DELIVERY = "DELIVERY",
    PICKUP = "PICKUP",
}
export enum OrderStatusView {
    PAID = "PAID",
    IN_PROGRESS = "IN_PROGRESS",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    IN_TRANSIT = "IN_TRANSIT",
    COMPLETE = "COMPLETE",
    CANCELED = "CANCELED",
}
export enum GetOrderAJAXResponse$DeliveryType {
    WONDER_DELIVERY = "WONDER_DELIVERY",
    RESTAURANT_DELIVERY = "RESTAURANT_DELIVERY",
}
export enum OrderTipTypeView {
    FIFTEEN_PERCENT = "FIFTEEN_PERCENT",
    EIGHTEEN_PERCENT = "EIGHTEEN_PERCENT",
    TWENTY_PERCENT = "TWENTY_PERCENT",
    CUSTOM = "CUSTOM",
}
export interface GetOrderAJAXResponse$OrderItem {
    order_item_id: string;
    item_quantity: number;
    item_name: string; // constraints: notBlank=true
    display_name: string; // constraints: notBlank=true
    special_instructions: string | null; // constraints: notBlank=true
    modifier_groups: GetOrderAJAXResponse$ModifierGroup[];
    subtotal: number; // constraints: min=0
}
export interface GetOrderAJAXResponse$ModifierGroup {
    modifier_group_name: string; // constraints: notBlank=true
    modifier_group_options: GetOrderAJAXResponse$ModifierGroupOption[] | null; // constraints: size=(1, -1)
}
export interface GetOrderAJAXResponse$ModifierGroupOption {
    option_name: string; // constraints: notBlank=true
    option_price: number; // constraints: min=0
    sub_modifiers: GetOrderAJAXResponse$SubModifier[];
}
export interface GetOrderAJAXResponse$SubModifier {
    name: string; // constraints: notBlank=true, size=(-1, 50)
    sub_modifier_price: number; // constraints: min=0
}
export interface GetOrderAJAXResponse$PayoutSummary {
    deducted_tax: number;
    deducted_delivery_fee: number | null;
    deducted_tip: number | null;
    commission_rate_in_percentage: number;
    deducted_commission_fee: number;
    total_payout: number;
    deducted_customer_refund: number | null;
    deducted_restaurant_refund: number | null;
}
export interface ConfirmOrderRequest {
    estimated_preparation_time_in_minutes: number; // constraints: min=0
}
export interface GetOrderPreparationTimeResponse {
    preparation_time: number;
}
export interface UpdateOrderPreparationTimeAJAXRequest {
    preparation_time_in_minutes: number; // constraints: min=0
}
export interface CreateOrderViewHistoryAJAXRequest {
    view_type: CreateOrderViewHistoryAJAXRequest$ViewType;
}
export enum CreateOrderViewHistoryAJAXRequest$ViewType {
    NEW = "NEW",
    CANCELED = "CANCELED",
}
export interface GetDashboardAJAXResponse {
    dashboard_items: GetDashboardAJAXResponse$DashboardItem[];
}
export interface GetDashboardAJAXResponse$DashboardItem {
    status: GetDashboardAJAXResponse$OrderStatus;
    count: number;
}
export enum GetDashboardAJAXResponse$OrderStatus {
    PAID = "PAID",
    IN_PROGRESS = "IN_PROGRESS",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    IN_TRANSIT = "IN_TRANSIT",
    COMPLETE = "COMPLETE",
}
export interface SearchOrderByStatusAJAXRequest {
    status: SearchOrderByStatusAJAXRequest$OrderStatus;
    pickup_type: SearchOrderByStatusAJAXRequest$PickupType | null;
    skip: number; // constraints: min=0
    limit: number; // constraints: min=1
}
export enum SearchOrderByStatusAJAXRequest$OrderStatus {
    PAID = "PAID",
    IN_PROGRESS = "IN_PROGRESS",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    IN_TRANSIT = "IN_TRANSIT",
    COMPLETE = "COMPLETE",
}
export enum SearchOrderByStatusAJAXRequest$PickupType {
    CUSTOMER_PICKUP = "CUSTOMER_PICKUP",
    COURIER_DELIVERY = "COURIER_DELIVERY",
    ALL = "ALL",
}
export interface SearchOrderByStatusAJAXResponse {
    total: number;
    orders: SearchOrderByStatusAJAXResponse$Order[];
}
export interface SearchOrderByStatusAJAXResponse$Order {
    id: string; // constraints: notBlank=true
    order_number: string; // constraints: notBlank=true
    customer_name: string; // constraints: notBlank=true
    order_date: Date;
    dining_option: OrderDiningOptionView;
    order_amount: number;
}
export interface SearchOrderAJAXRequestV3 {
    customer_name: string | null; // constraints: notBlank=true, size=(-1, 50)
    order_number: string | null; // constraints: notBlank=true, size=(-1, 50)
    order_statuses: SearchOrderAJAXRequestV3$OrderStatus[];
    fulfillment_types: OrderDiningOptionView[];
    contains_refund: boolean | null;
    order_amount_min: number | null; // constraints: min=0
    order_amount_max: number | null; // constraints: min=0
    from_date: Date | null;
    to_date: Date | null;
    skip: number; // constraints: min=0
    limit: number; // constraints: min=1
}
export enum SearchOrderAJAXRequestV3$OrderStatus {
    COMPLETE = "COMPLETE",
    CANCELED = "CANCELED",
}
export interface SearchOrderAJAXResponse {
    total: number;
    orders: SearchOrderAJAXResponse$Order[];
    completed_order_summary: SearchOrderAJAXResponse$CompletedOrderSummary | null;
}
export interface SearchOrderAJAXResponse$Order {
    id: string; // constraints: notBlank=true
    order_number: string; // constraints: notBlank=true
    customer_name: string; // constraints: notBlank=true
    order_date: Date;
    dining_option: OrderDiningOptionView;
    status: OrderStatusView;
    order_amount: number;
    item_quantity: number;
    containsRefund: boolean;
    refund_amount: number | null;
}
export interface SearchOrderAJAXResponse$CompletedOrderSummary {
    order_count: number;
    order_summary_amount: number;
    estimated_payout: number;
}
export interface UpdatePublishedRestaurantStatusAJAXRequest {
    status: AvailabilityStatusAJAXView;
    pause_orders_duration_in_minutes: number | null; // constraints: min=1, max=1440
    reason_for_closure: RestaurantManualCloseReasonAJAXView | null;
}
export enum AvailabilityStatusAJAXView {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    PAUSE_ORDERS = "PAUSE_ORDERS",
}
export enum RestaurantManualCloseReasonAJAXView {
    KITCHEN_TOO_BUSY = "KITCHEN_TOO_BUSY",
    NOT_ENOUGH_STAFF = "NOT_ENOUGH_STAFF",
    CHANGE_IN_OPERATING_HOURS = "CHANGE_IN_OPERATING_HOURS",
    PLANNED_CLOSURE = "PLANNED_CLOSURE",
    UNPLANNED_CLOSURE = "UNPLANNED_CLOSURE",
}
export interface GetPrintingSettingsResponse {
    enable_star_cloud_prnt: boolean;
    enable_print_auto_confirmed_order: boolean | null;
    copies_number_of_print: number | null;
}
export interface ExtendPauseOrdersDurationAJAXRequest {
    duration_in_minutes: number; // constraints: min=1, max=1440
}
export interface ListPublishedMenuAJAXResponse {
    menus: ListPublishedMenuAJAXResponse$Menu[];
}
export interface ListPublishedMenuAJAXResponse$Menu {
    menu_id: string; // constraints: notBlank=true
    name: string; // constraints: notBlank=true
    display_name: string; // constraints: notBlank=true
    categories: ListPublishedMenuAJAXResponse$Category[];
}
export interface ListPublishedMenuAJAXResponse$Category {
    id: string | null; // constraints: notBlank=true
    name: string; // constraints: notBlank=true
    number_of_items: number; // constraints: min=0
}
export interface SearchPublishedMenuItemAJAXRequest {
    menu_id: string; // constraints: notBlank=true
    category_id: string | null; // constraints: notBlank=true
    menu_item_name: string | null; // constraints: notBlank=true
}
export interface SearchPublishedMenuItemAJAXResponse {
    menu_items: SearchPublishedMenuItemAJAXResponse$MenuItem[];
}
export interface SearchPublishedMenuItemAJAXResponse$MenuItem {
    menu_item_id: string;
    logo_image: ImageAJAXView | null;
    name: string; // constraints: notBlank=true
    display_name: string; // constraints: notBlank=true
    has_modifier: boolean;
    category: string; // constraints: notBlank=true
    price: number;
    is_active: boolean;
    modifier_groups: SearchPublishedMenuItemAJAXResponse$ModifierGroup[];
}
export interface SearchPublishedMenuItemAJAXResponse$ModifierGroup {
    modifier_options: SearchPublishedMenuItemAJAXResponse$ModifierOption[];
}
export interface SearchPublishedMenuItemAJAXResponse$ModifierOption {
    name: string;
    sub_modifiers: SearchPublishedMenuItemAJAXResponse$SubModifier[];
}
export interface SearchPublishedMenuItemAJAXResponse$SubModifier {
    name: string;
}
export interface PublishedMenuItemAJAXResponse {
    logo_image: ImageAJAXView | null;
    status: PublishedMenuItemStatusAJAXView;
    base_info: PublishedMenuItemBaseInfoAJAXView;
    times_ordered_in_last_30_days: number;
    modifier_groups: PublishedModifierGroupAJAXView[];
}
export enum PublishedMenuItemStatusAJAXView {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
export interface PublishedMenuItemBaseInfoAJAXView {
    name: string; // constraints: notBlank=true
    display_name: string; // constraints: notBlank=true
    long_description: string | null; // constraints: notBlank=true
    spicy_level: SpicyLevelAJAXView | null;
    base_price: number; // constraints: min=0
}
export enum SpicyLevelAJAXView {
    MILD = "MILD",
    MEDIUM = "MEDIUM",
    HOT = "HOT",
}
export interface PublishedModifierGroupAJAXView {
    name: string; // constraints: notBlank=true
    selection_info: string;
    options: PublishedModifierGroupAJAXView$ModifierOption[]; // constraints: size=(1, -1)
}
export interface PublishedModifierGroupAJAXView$ModifierOption {
    name: string; // constraints: notBlank=true
    selection_info: string;
    price: number; // constraints: min=0
    sub_modifiers: PublishedModifierGroupAJAXView$SubModifier[];
}
export interface PublishedModifierGroupAJAXView$SubModifier {
    name: string; // constraints: notBlank=true, size=(-1, 50)
    price: number; // constraints: min=0
}
export interface GetServingInfoAJAXResponse {
    availability_status: GetServingInfoAJAXResponse$AvailabilityStatus;
    operating_hour: GetServingInfoAJAXResponse$OperatingHour | null;
    next_operating_hour: GetServingInfoAJAXResponse$OperatingHour | null;
    paused_status_end_time: Date | null;
    paused_status_left_time_in_seconds: number | null;
}
export enum GetServingInfoAJAXResponse$AvailabilityStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    PAUSE_ORDERS = "PAUSE_ORDERS",
    INACTIVE = "INACTIVE",
    UNPUBLISHED = "UNPUBLISHED",
    FORCE_CLOSED = "FORCE_CLOSED",
}
export interface GetServingInfoAJAXResponse$OperatingHour {
    day_of_week: DayOfWeekAJAXView;
    service_hours: GetServingInfoAJAXResponse$ServiceHour[];
}
export enum DayOfWeekAJAXView {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
}
export interface GetServingInfoAJAXResponse$ServiceHour {
    start_time: Date;
    end_time: Date;
}
export interface UnsubscribeWeeklySummaryEmailAJAXRequest {
    unsubscribe_key: string; // constraints: notBlank=true
}
export interface UpdatePublishedMenuItemStatusAJAXRequest {
    status: MPPublishedMenuItemStatusAJAXView;
    inactive_type: UpdatePublishedMenuItemStatusAJAXRequest$InactiveType | null;
    duration_hours: number | null; // constraints: min=1, max=1000
}
export enum MPPublishedMenuItemStatusAJAXView {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
export enum UpdatePublishedMenuItemStatusAJAXRequest$InactiveType {
    TODAY = "TODAY",
    X_HOURS = "X_HOURS",
    INDEFINITELY = "INDEFINITELY",
}
export interface GetSupportPhoneNumber {
    phone_number: string; // constraints: notBlank=true
}
export interface UpdateCategoryStatusAJAXRequest {
    status: UpdateCategoryStatusAJAXRequest$Status;
    inactive_type: UpdateCategoryStatusAJAXRequest$InactiveType | null;
    duration_hours: number | null; // constraints: min=1, max=1000
}
export enum UpdateCategoryStatusAJAXRequest$Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
export enum UpdateCategoryStatusAJAXRequest$InactiveType {
    TODAY = "TODAY",
    X_HOURS = "X_HOURS",
    INDEFINITELY = "INDEFINITELY",
}
export interface GetCategoryStatusAJAXResponse {
    status: GetCategoryStatusAJAXResponse$Status;
}
export enum GetCategoryStatusAJAXResponse$Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
export interface ErrorResponse {
    id: string | null;
    errorCode: string | null;
    message: string | null;
}
export interface WSWebClientMessage {}
export interface WSWebServerNotifyMessage {
    message_type: WSWebServerNotifyMessage$MessageType;
    order_event_message: WSOrderEventNotifyMessage | null;
    restaurant_status_change: WSRestaurantStatusChangeNotifyMessage | null;
}
export enum WSWebServerNotifyMessage$MessageType {
    ORDER_EVENT = "ORDER_EVENT",
    RESTAURANT_STATUS_CHANGE = "RESTAURANT_STATUS_CHANGE",
    RESTAURANT_PAUSE_DURATION_CHANGE = "RESTAURANT_PAUSE_DURATION_CHANGE",
}
export interface WSOrderEventNotifyMessage {
    order_id: string;
    order_number: string;
    event: WSOrderEventNotifyMessage$OrderEventType;
    need_alerting: boolean;
    operated_source: WSOrderEventNotifyMessage$OperatedSource;
}
export enum WSOrderEventNotifyMessage$OrderEventType {
    RECEIVE = "RECEIVE",
    IN_PROGRESS = "IN_PROGRESS",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    IN_TRANSIT = "IN_TRANSIT",
    COMPLETE = "COMPLETE",
    CANCELED = "CANCELED",
}
export enum WSOrderEventNotifyMessage$OperatedSource {
    RESTAURANT_PORTAL = "RESTAURANT_PORTAL",
    WONDER_BO = "WONDER_BO",
    OTHER = "OTHER",
}
export interface WSRestaurantStatusChangeNotifyMessage {
    restaurant_name: string; // constraints: notBlank=true
    restaurant_id: string; // constraints: notBlank=true
    status: WSRestaurantStatusChangeNotifyMessage$RestaurantStatus;
    next_opening_time: Date | null;
}
export enum WSRestaurantStatusChangeNotifyMessage$RestaurantStatus {
    UNPUBLISHED = "UNPUBLISHED",
    INACTIVE = "INACTIVE",
    OPEN = "OPEN",
    OPENING_SOON = "OPENING_SOON",
    CLOSED = "CLOSED",
    PAUSE_ORDERS = "PAUSE_ORDERS",
    FORCE_CLOSED = "FORCE_CLOSED",
}
export interface SearchOrderHistoryRequest {
    customer_name: string | null; // constraints: notBlank=true, size=(-1, 50)
    order_number: string | null; // constraints: notBlank=true, size=(-1, 50)
    order_statuses: SearchOrderHistoryRequest$OrderStatus[];
    dining_options: MPOrderDiningOptionView[];
    contains_refund: boolean | null;
    order_amount_min: number | null; // constraints: min=0
    order_amount_max: number | null; // constraints: min=0
    from_date: Date | null;
    to_date: Date | null;
}
export enum SearchOrderHistoryRequest$OrderStatus {
    COMPLETE = "COMPLETE",
    CANCELED = "CANCELED",
}
export enum MPOrderDiningOptionView {
    DELIVERY = "DELIVERY",
    PICKUP = "PICKUP",
}
