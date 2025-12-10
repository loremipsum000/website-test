import React from 'react';
import Image from 'next/image';

export const Summit2025 = (props: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <div className={`flex items-center justify-center h-full ${props.className || ''}`}>
      <Image
        src="/images/summit25/Summit-White.svg"
        alt="Sonic Summit"
        width={240}
        height={120}
        className="w-[80%] h-auto"
      />
    </div>
  );
};
