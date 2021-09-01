// Denpendencies
import React from 'react';

// HOC

function printHOC(WrppedComponent) {
    return class NewComponent extends React.Component{
        print = param => console.log({ param });

        render() {
            return <WrppedComponent print={this.print} {...this.props}/>
        }
    }
}

export default printHOC;