



# cs site

取order_number

module

```
def orderServiceInterfaceVersion = '18.0.0'
com.wonder:order-service-interface:${orderServiceInterfaceVersion}
```



```java
@PUT
@Path("/ajax/order")
SearchOrderAJAXResponse search(SearchOrderAJAXRequest request);
    @GET
    @Path("/bo/v5/order/:orderId")
    BOGetOrderV5Response getOrderV5(@PathParam("orderId") String orderId);

def orderServiceInterfaceVersion = '18.0.0'
com.wonder:order-service-interface:${orderServiceInterfaceVersion}
```





取truck_session_id

module

```java
def orderServiceInterfaceVersion = '18.0.0'
com.wonder:order-service-interface:${orderServiceInterfaceVersion}
```



```java
@GET
@Path("/ajax/v3/order/:orderId/tracking")
GetOrderTrackingAJAXResponseV3 getOrderTracking(@PathParam("orderId") String orderId);
    @GET
    @Path("/bo/v2/order/:orderId/tracking")
    BOGetOrderTrackingListV2Response getOrderTrackingListV2(@PathParam("orderId") String orderId);


```



# simulator site

取truck session相关信息

module

```java
def truckServiceInterfaceVersion = '17.0.0'
com.wonder:truck-service-interface:${truckServiceInterfaceVersion}
```



```java
@GET
@Path("/ajax/working-truck-session/:id")
GetWorkingTruckSessionAJAXResponse get(@PathParam("id") Long id);

		@GET
    @Path("/bo/working-truck-session/:id")
    BOGetWorkingTruckSessionResponse get(@PathParam("id") Long id);
```



开始->Received (ASSIGNED or PRE_ROUTE_PREP or READY_TO_DRIVE)

```java
click Place order, redirect to Order Received Page
```

Received-->Driving 

```java
  @POST
  @Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/in-progress")
  void inProgress(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
(ASSIGNED or PRE_ROUTE_PREP or READY_TO_DRIVE)->IN_TRANSIT
  
     @PUT
     @Path("/truck-session/:id/assignment/:assignmentId/in-progress")
     void startNavigation(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, InProgressRequest request);

```

Driving-->Cooking 

```java
  @POST
  @Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/arrival")
void arrive(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
IN_TRANSIT -> ARRIVED
  
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/arrival")
    void arrive(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, ArriveRequest request);

```

Cooking-->Serving

```java
@POST
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/in-cooking")
void cooking(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
ARRIVED-> IN_COOKING
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/in-cooking")
    void cooking(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, InCookingRequest request);


@POST
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/food-is-ready")
void setFoodIsReady(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
IN_COOKING->FOOD_IS_READY
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/food-is-ready")
    void setFoodIsReady(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, SetFoodIsReadyRequest request);
 
```

Serving->结束 (DELIVERED)

```java
@POST
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/delivery-start")
void startDelivery(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
FOOD_IS_READY -> DELIVERY_START
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/delivery-start")
    void startDelivery(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, StartDeliveryRequest request);

  
@POST
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/delivered")
void endDelivery(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
DELIVERY_START->DELIVERED
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/delivered")
    void endDelivery(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, EndDeliveryRequest request);

```





Other API (DELIVERED) （必须调用，否则无法处理下一个订单）

```java
@PUT
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/start-reconciliation")
void startReconciliation(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
  (assignments.status_v2=DELIVERED or Canceled) &&  assignment_status_transactions.status == COOKING 
assignment_status_transactions.actualStartTime != null

    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/start-reconciliation")
    void startReconciliation(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, StartReconciliationRequest request);

  
@PUT
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/end-reconciliation")
void endReconciliation(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
assignments.reconcileStartTime != null 
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/end-reconciliation")
    void endReconciliation(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, EndReconciliationRequest request);


@PUT
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/start-cleaning")
void startCleaning(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
assignments.reconcileEndTime != null
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/start-cleaning")
    void startCleaning(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, StartCleaningRequest request);


@PUT
@Path("/ajax/truck-tool/truck-session/:id/assignment/:assignmentId/end-cleaning")
void endCleaning(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId);
assignments.cleaningStartTime!=null
    @POST
    @Path("/truck-session/:id/assignment/:assignmentId/end-cleaning")
    void endCleaning(@PathParam("id") Long truckSessionId, @PathParam("assignmentId") String assignmentId, EndCleaningRequest request);

```



# design



# Code



```java
   String fromStatus = assignment.status.name();
            String toStatus = requestStatus.name();
//            Status current = list.stream().filter(status -> status.from.equals(beginStatus)).findFirst().orElse(null);
//            while (current != null) {
//                pushStatus(current.from, current.to);
//                if (current.to.equals(endStatus)) break;
//                String nextFrom = current.to;
//                current = list.stream().filter(status -> status.from.equals(nextFrom)).findFirst().orElse(null);
//            }

```





```java
 boolean start = false;
            for (Status status : list) {
                if (status.to.equals(toStatus)) {
                    pushStatus(status.from, status.to, truckSessionId, assignment.id);
                    break;
                }
                if (status.from.equals(fromStatus)) {
                    start = true;
                }
                if (start) pushStatus(status.from, status.to, truckSessionId, assignment.id);
            }
```



```java
   StartReconciliationRequest startReconciliationRequest = new StartReconciliationRequest();
        startReconciliationRequest.requestedBy = "test-agent-site";
        assignmentWebService.startReconciliation(truckSessionId, assignmentId, startReconciliationRequest);
	
        EndReconciliationRequest endReconciliationRequest = new EndReconciliationRequest();
        endReconciliationRequest.requestedBy = "test-agent-site";
        assignmentWebService.endReconciliation(truckSessionId, assignmentId, endReconciliationRequest);

        StartCleaningRequest startCleaningRequest = new StartCleaningRequest();
        startCleaningRequest.requestedBy = "test-agent-site";
        assignmentWebService.startCleaning(truckSessionId, assignmentId, startCleaningRequest);

        EndCleaningRequest endCleaningRequest = new EndCleaningRequest();
        endCleaningRequest.requestedBy = "test-agent-site";
        assignmentWebService.endCleaning(truckSessionId, assignmentId, endCleaningRequest);
```



# dependency service

- Bo-api-util

  ```
  truck-logistics-site-interface 
  get idel-cor
  create truck session
  picking list planning
  load-inventory
  
  simulator-site-interface
  online truck 
  
  command-site-interface
  offline truck
  
  customer-service-site-interface
  credit
  ```

- Foodtruck-test-data

  ```
  command-site-interface
  customer-service-site-interface
  truck-logistics-site-interface
  common-interface
  truck-alert-service-interface
  truck-service-interface
  ```

- Foodtruck-regression-test-project

  ```
  => mobile-api
  startSession
  login
  makerOrder
  cancelOrder
  updateAllergens
  addItem
  removeAddressIsNot
  removePaymentIsNot
  emptyShopCart
  
  ```

  

- Foodtrcuk-test-automation

  - Test-report-site

  ```
  => mongo
  => kafka
  => com.wonder:core-ext-snowflake
  mparticle event
  ```

  - Test-agent-site

  ```
  => kafka 
  log
  => com.wonder:order-service-interface
  => com.wonder:truck-service-interface
  ```

  
