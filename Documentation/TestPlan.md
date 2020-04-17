# Test Plan


## 1. Functionality Testing
- input checking
- verify no dead pages or invalid redirects
- verify data integrity( accuracy and consistency of data over its entire life-cycle)
- test cookies are working as expected
- test all links
## 2. Usability Testing
- test the navigation and controls
- content checking
- conduct user iterviews
- A/B testing
## 3. Compatibilty Testing
- borser compatibility
  - Tools: [CrossBowserTesting](https://crossbrowsertesting.com/)
 - operating system compatibility
## 4. Interface Testing
- test requests are sent correctly to database
- test server is handling all requests
- test dataflow from one system to another
## 5. Performance Testing
- Load Testing & Stress Testing
  - Tools: [LoadNinja](https://loadninja.com), [LoadRunner](https://www.microfocus.com/en-us/products/loadrunner-professional), Apache JMeter
## 6. Security Testing
- SQL Injections
- Cross Site Scripting(CSS) Attacks
- Cross-Site Request Foregery(CSRF)

Testing suites: [Ranorex](https://www.ranorex.com/)
