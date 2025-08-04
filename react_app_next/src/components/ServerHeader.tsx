import { css } from 'zero-css';

type ServerHeaderProps = {
  bookCount: number;
  totalValue: number;
};

// Static styles defined outside component for SSR compatibility
const headerStyles = css({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '2rem 1rem',
  marginBottom: '2rem',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
});

const titleStyles = css({
  fontSize: '3rem',
  fontWeight: '800',
  marginBottom: '0.5rem',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  position: 'relative',
  zIndex: '1',
  '@media (max-width: 768px)': {
    fontSize: '2rem',
  },
});

const subtitleStyles = css({
  fontSize: '1.25rem',
  fontWeight: '300',
  marginBottom: '1.5rem',
  opacity: '0.9',
  position: 'relative',
  zIndex: '1',
  '@media (max-width: 768px)': {
    fontSize: '1rem',
  },
});

const statsContainerStyles = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  flexWrap: 'wrap',
  position: 'relative',
  zIndex: '1',
  '@media (max-width: 768px)': {
    gap: '1rem',
  },
});

const statItemStyles = css({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  padding: '1rem 1.5rem',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  minWidth: '120px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
});

const statNumberStyles = css({
  fontSize: '2rem',
  fontWeight: '700',
  display: 'block',
  marginBottom: '0.25rem',
  '@media (max-width: 768px)': {
    fontSize: '1.5rem',
  },
});

const statLabelStyles = css({
  fontSize: '0.9rem',
  opacity: '0.8',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontWeight: '500',
});

const decorativeIconStyles = css({
  position: 'absolute',
  fontSize: '8rem',
  opacity: '0.05',
  right: '2rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: '0',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

// This is a Server Component that uses zero-css for SSR testing
export default function ServerHeader({ bookCount, totalValue }: ServerHeaderProps) {

  return (
    <header className={headerStyles}>
      <div className={decorativeIconStyles}>📚</div>
      
      <h1 className={titleStyles}>
        📖 Bookstore Manager
      </h1>
      
      <p className={subtitleStyles}>
        Server-Side Rendered with Zero-CSS
      </p>
      
      <div className={statsContainerStyles}>
        <div className={statItemStyles}>
          <span className={statNumberStyles}>{bookCount}</span>
          <span className={statLabelStyles}>Total Books</span>
        </div>
        
        <div className={statItemStyles}>
          <span className={statNumberStyles}>${totalValue.toFixed(0)}</span>
          <span className={statLabelStyles}>Collection Value</span>
        </div>
        
        <div className={statItemStyles}>
          <span className={statNumberStyles}>
            {bookCount > 0 ? (totalValue / bookCount).toFixed(1) : '0.0'}
          </span>
          <span className={statLabelStyles}>Avg. Price</span>
        </div>
      </div>
    </header>
  );
}