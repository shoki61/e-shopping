import ReactImageZoom from 'react-image-zoom';

const ImageZoom = ({ zoomPosition = 'original', width, height, zoomWidth = width, img, onZoom }) => (
  <div onMouseOver={() => onZoom && onZoom(true)} onMouseLeave={() => onZoom && onZoom(false)}>
    <ReactImageZoom zoomPosition={zoomPosition} width={width} height={height} zoomWidth={zoomWidth} img={img} />
  </div>
);

export default ImageZoom;
