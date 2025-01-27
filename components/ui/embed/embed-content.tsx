import React from 'react';

interface IEmbedContent {
  embedCode: string;
  title?: string;
}

export default function EmbedContent({ embedCode, title }: IEmbedContent) {
  return (
    <div className="w-full h-full min-h-[400px]" dangerouslySetInnerHTML={{ __html: embedCode }} />
  );
} 