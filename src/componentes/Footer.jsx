export default function Footer() {
  return (
    <footer style={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      padding: "2rem",
      backgroundColor: "#f2f2f2",
      borderTop: "1px solid #ccc"
    }}>
      {/* Columna izquierda */}
      <div style={{ flex: "1", minWidth: "200px" }}>
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>Impresiones a tu casa</h3>
        <p style={{ fontSize: "1rem" }}>Temperley, Buenos Aires</p>
        <p style={{ fontSize: "1rem" }}>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://impresionesatucasa.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
          >
            impresionesatucasa.com.ar
          </a>
        </p>
      </div>

      {/* Columna derecha */}
      <div style={{ flex: "1", minWidth: "200px", textAlign: "right" }}>
        <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Contacto</h4>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "1.2rem" }}>
          <a
            href="https://wa.me/5491166800053"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", fontSize: "1.05rem", marginRight: "12px" }}
          >
            WhatsApp
          </a>
          <img
            src="/logoWhatsap.png"
            alt="WhatsApp"
            style={{ width: "32px" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "1.2rem" }}>
          <a
            href="mailto:impresionesatucasaa@gmail.com"
            style={{ textDecoration: "none", color: "inherit", fontSize: "1.05rem", marginRight: "12px" }}
          >
            impresionesatucasaa@gmail.com
          </a>
          <img
            src="/logoGmail.png"
            alt="Email"
            style={{ width: "32px" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "1.2rem" }}>
          <a
            href="https://www.facebook.com/impresionesatucasa"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", fontSize: "1.05rem", marginRight: "12px" }}
          >
            Facebook
          </a>
          <img
            src="/logoFacebook.png"
            alt="Facebook"
            style={{ width: "32px" }}
          />
        </div>
      </div>
    </footer>
  );
}
