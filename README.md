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

const withClasses = (Component, classes) => {
return (props) => (
    <div className={classes}>
        <Component {...props} />
    </div>
       );
};

export default withClasses;
```
* The component can be used in a different component like so.
```
<ToBeWrappedByHOC/>

```

# lift up setstate to parent

```
function Parent() {
  const [value, setValue] = React.useState("");

  function handleChange(newValue) {
    setValue(newValue);
  }

  // We pass a callback to MyInput
  return <MyInput value={value} onChange={handleChange} />;
}

function MyInput(props) {
  function handleChange(event) {
    // Here, we invoke the callback with the new value
    props.onChange(event.target.value);
  }
  
  return <input value={props.value} onChange={handleChange} />
}

```
# Javascript Map table example

```
import React, { Fragment } from "react";

<tbody>
      {myList.map((item, i) => {
        return (
          <Fragment>
            <tr key={i} onClick={toggleMobileOpen.bind(this, i)}>
              <td className="toggler">
                {item.mobile_open && <ArrowUp />}
                {!item.mobile_open && <ArrowDown />}
              </td>
              <td>{item.elem_one}</td>
              <td>{item.elem_two}</td>
              <td>{item.elem_three}</td>
            </tr>
            {item.mobile_open &&
              <tr className="test-td">
                <td>...</td>
              </tr>
            }
          </Fragment>
        );
      })}
    </tbody>

```
# Map, Reduce, and filter function example

https://javascript.plainenglish.io/javascript-array-for-interviews-filter-map-reduce-and-isarray-8ca4e93986a7
