import './footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
        <div className="footer-container">
            <p>© {currentYear} HireKey</p>
        </div>
    </footer>
  )
}

export default Footer