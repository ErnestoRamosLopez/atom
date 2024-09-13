declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGElement>>;
    const src: string;
    export default src;
}

declare module 'react-inlinesvg' {
    //TESTED ONLY ON VERSION 4.1.3
    import React from 'react';
    import { Props } from 'react-inlinesvg';
    
    const InlineSVG: React.FC<Props>;
    export default InlineSVG;
}