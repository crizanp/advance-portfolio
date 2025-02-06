import dynamic from 'next/dynamic';

// Disable SSR for PDFConverter
const PDFConverter = dynamic(
  () => import('../../components/PDFConverter'),
  { ssr: false }
);

export default function Home() {
    return (
        <div style={styles.container}>
          <h1 style={styles.heading}>PDF to JPG Converter</h1>
          <PDFConverter />
        </div>
      );
}

const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
      backgroundColor: '#2c003e', // Dark purple background
      minHeight: '100vh',
      color: '#ffffff', // White text
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    fileInputLabel: {
      display: 'inline-block',
      padding: '15px 30px',
      backgroundColor: '#6a0dad', // Purple button
      color: '#ffffff',
      fontSize: '18px',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'background 0.3s',
    },
    hiddenInput: {
      display: 'none',
    },
  };
  
  