import React from 'react';
import type { GatsbySSR } from "gatsby";

const UMDBrandComponent = [
    <script src="https://umd-header.umd.edu/build/bundle.js?search=0&search_domain=&events=0&news=0&schools=0&admissions=0&support=0&support_url=&wrapper=1100&sticky=0"></script>
];

export const onRenderBody: GatsbySSR["onRenderBody"] = (
    {setPostBodyComponents}
) => {
    setPostBodyComponents(UMDBrandComponent);
};