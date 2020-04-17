# Test Plan

## Scope

### Testing of the app can be broken down into these 6 categories. Within each category are listed tasks as well as software for completing these tasks.

## 1. Functionality Testing
- Tools: [Micro Focus Unified Functional Testing(UFT) Tool](http://www.automationrepository.com/2012/12/hp-unified-functional-testing-uft-11-5-new-features/), [Selenium](https://www.leapwork.com/discover/selenium-testing) 
- input checking (Data validation, data-type checks, range check)
- verify no dead pages or invalid redirects
- verify data integrity( accuracy and consistency of data over its entire life-cycle)
- test cookies are working as expected
- test all links
## 2. Usability Testing
- Tools: [Userinput.io](https://www.userinput.io/#/), [UsabilityHub](https://usabilityhub.com/), [inspectlet](https://www.inspectlet.com/), [Clicktale](https://www.clicktale.com/), [Chalkmark](https://www.optimalworkshop.com/chalkmark/)
- test the navigation and controls
- content checking
- conduct user iterviews
- A/B testing
## 3. Compatibilty Testing
- browser compatibility
  - Tools: [CrossBowserTesting](https://crossbrowsertesting.com/), [BrowserStack](https://www.browserstack.com/) 
- operating system compatibility
  - Tools: Virtual Desktops such as [VirtualBox](https://www.virtualbox.org/)
## 4. Interface Testing
- Tools: [Ranorex](https://www.ranorex.com/)
- test requests are sent correctly to database
- test server is handling all requests
- test dataflow from one system to another
## 5. Performance Testing
- Load Testing & Stress Testing
  - Tools: [LoadNinja](https://loadninja.com), [LoadRunner](https://www.microfocus.com/en-us/products/loadrunner-professional), [Apache JMeter](https://jmeter.apache.org/)
## 6. Security Testing  
 - Tools: [Brute Force Binary Tester](http://bfbtester.sourceforge.net/), [Babel Enterprise Security Dashboard](http://babel.sourceforge.net/en/)
- SQL Injections
- Cross Site Scripting(CSS) Attacks
- Cross-Site Request Foregery(CSRF)
- Check sessions are automatcially destroyed afte long period of user inactivity
  

### Testing suites(All in one): [Ranorex](https://www.ranorex.com/)

## Outside of Scope
- Database Testing
- Testing HTML and CSS for SEO

## Test Approach
The testing will be done **reactively**, after the production of the app. The different testing areas require different approaches.
- Heuristic Approach: usability testing
- Dynamic Approach: functional testing, interface testing
- Methodical Approach: compatibility testing, security testing
- Statistical(Data) Approach: performance testing


