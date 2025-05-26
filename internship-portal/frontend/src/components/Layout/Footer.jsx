import { useContext } from 'react'
import {Context} from "../../main"

function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer 
      className={isAuthorized ? "footerShow" : "footerHide"}
      style={{
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid #333',
        padding: '40px 0 30px',
        marginTop: 'auto'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px'
      }}>
        {/* Logo and Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <img 
            src="/careerconnect-white.png" 
            alt="Career Connect" 
            style={{
              height: '32px',
              width: 'auto'
            }}
          />
          <div>
            <h3 style={{
              margin: '0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff'
            }}>Career Connect</h3>
            <p style={{
              margin: '2px 0 0 0',
              fontSize: '13px',
              color: '#888',
              fontWeight: '400'
            }}>Connecting talent with opportunity</p>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '5px'
        }}>
          <a href="/about" style={{
            color: '#ccc',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'color 0.2s ease'
          }} onMouseEnter={e => e.target.style.color = '#fff'} 
             onMouseLeave={e => e.target.style.color = '#ccc'}>
            About Us
          </a>
          <a href="/privacy" style={{
            color: '#ccc',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'color 0.2s ease'
          }} onMouseEnter={e => e.target.style.color = '#fff'} 
             onMouseLeave={e => e.target.style.color = '#ccc'}>
            Privacy Policy
          </a>
          <a href="/terms" style={{
            color: '#ccc',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'color 0.2s ease'
          }} onMouseEnter={e => e.target.style.color = '#fff'} 
             onMouseLeave={e => e.target.style.color = '#ccc'}>
            Terms of Service
          </a>
          <a href="/contact" style={{
            color: '#ccc',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'color 0.2s ease'
          }} onMouseEnter={e => e.target.style.color = '#fff'} 
             onMouseLeave={e => e.target.style.color = '#ccc'}>
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid #333',
          paddingTop: '20px',
          width: '100%',
          textAlign: 'center',
          justifyContent: 'center'
        }}>
          <p style={{
            margin: '0',
            fontSize: '14px',
            color: '#888'
          }}>
            © 2024 Career Connect. All rights reserved. Built by AK.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer