'use client';

import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { useCallback, useState } from 'react';
import { Document, Page, pdfjs, } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './polyfill';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

export default function Litepaper({ url }: { url: string }) {
  const [file, setFile] = useState<PDFFile>(url);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div className='relative theme-dark bg-background'>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-sonic-mirrored animate-gradient opacity-20" style={{
        animationDuration: '20s',
      }} />
      <div className="container mx-auto min-h-screen rounded-lg overflow-hidden py-6" ref={setContainerRef}>
        <Document className={'flex items-center flex-col gap-y-2 rounded-lg overflow-hidden'} file={file} options={options} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_el, index) => (
            <Page
              className={'rounded-lg overflow-hidden'}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}