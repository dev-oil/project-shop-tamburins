import { createPortal } from 'react-dom';

type OverlayProps = {
  onClick?: () => void;
};

const Overlay = ({ onClick }: OverlayProps) => {
  return createPortal(
    <div
      className='fixed inset-0 bg-black/50 z-[var(--z-overlay)]'
      onClick={onClick}
    />,
    document.body
  );
};

export default Overlay;
