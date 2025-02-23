import { PortableText } from '@portabletext/react';
import React from 'react';
import TreeIcon from 'components/icons/TreeIcon';

const BlockContent = ({ blockContent, ...rest }) => (
  <div className={'h-screen container mx-auto px-4 md:px-24 md:py-44 text-xl'}>
    <div className="items-top grid md:grid-cols-1 lg:grid-cols-2 pb-20">
      <div className="rounded-lg mb-auto border-2 border-tepurple py-5 px-5 md:py-10 md:px-16">
        <PortableText value={blockContent} />
      </div>
      <div className="mx-auto mt-10">
        <TreeIcon />
      </div>
    </div>
    <div className="hidden md:block mx-3 mt-3 h-0.5 bg-tepurple w-full"></div>
  </div>
);

export default BlockContent;
