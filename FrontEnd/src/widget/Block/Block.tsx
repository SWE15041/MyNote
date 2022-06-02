import React from "react";

const Block = React.memo(({show, children}: {show: boolean; children: React.ReactNode}) => <>{show && children}</>);
export default Block;
