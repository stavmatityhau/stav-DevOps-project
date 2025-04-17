import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../../src/components/Header';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';

// בדיקות לקומפוננטת Header
describe('Header Component', () => {
  test('renders header correctly', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </BrowserRouter>
    );
    
    // Test for navigation links that should be present in the Header
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test('contains the correct navigation links', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </BrowserRouter>
    );
    
    // Verify that links exist and have correct href attributes
    const homeLink = screen.getByText(/home/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    
    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    
    const contactLink = screen.getByText(/contact/i);
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('has the correct styling classes', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </BrowserRouter>
    );
    
    // Check if the header has appropriate styling classes
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });
});

// בדיקות לקומפוננטת Navigation
describe('Navigation Component', () => {
  test('renders navigation links correctly', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navigation />
      </BrowserRouter>
    );
    
    // Check if navigation links are present
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test('has correct link destinations', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navigation />
      </BrowserRouter>
    );
    
    // Check if links have correct href attributes
    const homeLink = screen.getByText(/home/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    
    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    
    const contactLink = screen.getByText(/contact/i);
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('renders as nav element', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navigation />
      </BrowserRouter>
    );
    
    // Check if the Navigation component renders as a nav element
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

// בדיקות לקומפוננטת Footer
describe('Footer Component', () => {
  test('renders footer correctly', () => {
    render(<Footer />);
    
    // Check if copyright text is present
    expect(screen.getByText(/© 2025 My DevOps Project/i)).toBeInTheDocument();
  });

  test('has the correct class name', () => {
    render(<Footer />);
    
    // Check if footer has the correct class
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('App-footer');
  });

  test('contains a paragraph element', () => {
    render(<Footer />);
    
    // Check if footer contains a paragraph
    const paragraphElement = screen.getByText(/© 2025 My DevOps Project/i);
    expect(paragraphElement.tagName).toBe('P');
  });
});