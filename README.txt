ZOOPPLEMENTS ORDER v1
======================

PURPOSE
A first working front-end prototype for a separate ZOOPPLEMENTS self-service ordering tablet,
plus a prepared staff-phone screen.

CONFIRMED MENU USED
Protein shakes:
- Chocolate
- Vanilla
- Strawberry
- Banana
- Cookies & Cream
- Water €3.50
- Milk €4.00
- Creatine +€0.50

CUSTOMER FLOW
Welcome > flavour > water/milk > creatine > quantity > customer name > review > place order.

IMPORTANT
- Payment is NOT processed in v1. The screen tells customers to pay at the bar.
- The customer UI and price calculations are built.
- Staff order delivery is NOT yet connected. This is intentional.
- Do not put real customer orders into public GitHub data files.
- The next stage is a small live order backend plus staff phone order queue.
- The supplied ZOOPPLEMENTS logo is preserved as the brand asset.
- 90-second inactivity reset is enabled.

FILES
index.html              Customer tablet
styles.css              Tablet styling
app.js                  Ordering flow / totals / reset
config.js               Backend connection setting
staff.html              Prepared staff-phone screen
zoopplements-logo.jpg   Supplied logo
README.txt              This file


CONNECTED BUILD
===============
Customer tablet is configured for the live ZOOPPLEMENTS Apps Script backend.
Next: host on HTTPS and place one test order. Staff phone live queue is not connected yet.
