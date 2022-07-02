<img width="1226" alt="screen shot 2018-08-29 at 2 11 47 pm" src="https://user-images.githubusercontent.com/4441991/44815864-8aaefa00-ab95-11e8-9557-4936f26f9ca0.png">

1.Download package
 command line: npm i


# The following is an over simplified example of using HOC with functional components.

* The functional component to be "wrapped":
```
import React from 'react'
import withClasses from '../withClasses'

const ToBeWrappedByHOC = () => {
return (
    <div>
        <p>I'm wrapped by a higher order component</p>
    </div>
       )
}

export default withClasses(ToBeWrappedByHOC, "myClassName");
```

* The Higher Order Component:
```
import React from 'react'

const withClasses = (WrappedComponent, classes) => {
return (props) => (
    <div className={classes}>
        <WrappedComponent {...props} />
    </div>
       );
};

export default withClasses;
```
* The component can be used in a different component like so.
```
<ToBeWrappedByHOC/>

```
