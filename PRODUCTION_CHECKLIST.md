# Production Deployment Checklist

This document outlines the steps and considerations for deploying the MVP whitepaper to production.

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] Run `npm run pre-commit` to ensure all checks pass
- [ ] Run `npm run type-check` to verify TypeScript types
- [ ] Run `npm run lint` to check for code issues
- [ ] Run `npm run format:check` to verify code formatting
- [ ] Review all changes with `git diff`

### 2. Dependencies
- [ ] Update dependencies: `npm update`
- [ ] Run `npm audit` to check for vulnerabilities
- [ ] Fix security issues: `npm audit fix`
- [ ] Verify all dependencies in package.json are production-ready

### 3. Build Process
- [ ] Clean previous builds: `rm -rf build dist .docusaurus`
- [ ] Fetch latest data: `npm run fetch`
- [ ] Generate documentation: `npm run generate`
- [ ] Generate figures: `npm run figures`
- [ ] Build production bundle: `npm run build`
- [ ] Test build locally: `npm run serve`
- [ ] Generate PDFs: `npm run pdf`

### 4. Content Verification
- [ ] Verify all MDX files are generated correctly
- [ ] Check all links are working (`onBrokenLinks: "throw"`)
- [ ] Verify images and figures are loading
- [ ] Check Mermaid diagrams are rendered
- [ ] Validate data in `analysis/snapshot.json`

## Deployment Configuration

### Environment Variables
Set the following environment variables in production:

```bash
NODE_ENV=production
NODE_OPTIONS=--max_old_space_size=4096
```

### Vercel Deployment (Recommended)

#### Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Vercel CLI installed (optional): `npm i -g vercel`

#### Deployment Steps
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. The `vercel.json` file is already configured with:
   - Framework detection for Docusaurus
   - Build command and output directory
   - Security headers
   - Cache policies for static assets

#### Vercel Configuration
The project includes a `vercel.json` file with:
- Security headers (X-Frame-Options, CSP, etc.)
- Cache control for static assets (1 year immutable caching)
- Proper rewrites for client-side routing
- Puppeteer skip for faster builds

#### Automatic Builds
Vercel will automatically:
- Build on every push to main branch
- Deploy preview builds for pull requests
- Optimize build for edge delivery

## Post-Deployment

### 1. Verification
- [ ] Check site loads correctly in all browsers
- [ ] Verify HTTPS is working
- [ ] Test all navigation links
- [ ] Verify dark/light mode toggle
- [ ] Check responsive design on mobile
- [ ] Test print functionality
- [ ] Verify PDF downloads work

### 2. Performance
- [ ] Run Lighthouse audit
- [ ] Check PageSpeed Insights score
- [ ] Verify Core Web Vitals metrics
- [ ] Check font loading performance
- [ ] Verify image optimization

### 3. Security
- [ ] Check security headers: securityheaders.com
- [ ] Verify CSP is working correctly
- [ ] Test for XSS vulnerabilities
- [ ] Check for mixed content issues
- [ ] Verify SSL certificate is valid

### 4. Monitoring
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure analytics (if needed)
- [ ] Set up uptime monitoring
- [ ] Create alerts for downtime

## Maintenance

### Regular Tasks
1. **Weekly**:
   - Check for dependency updates
   - Run security audit
   - Review error logs

2. **Monthly**:
   - Update dependencies
   - Refresh on-chain data
   - Check content accuracy

3. **Quarterly**:
   - Full security review
   - Performance audit
   - Accessibility audit

## Troubleshooting

### Common Issues

1. **Build Fails**:
   - Clear cache: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version: `node -v` (should be >=18)
   - Verify all scripts are executable

2. **Data Fetch Fails**:
   - Check Etherscan and MVP site availability
   - Verify network connectivity
   - Check rate limiting

3. **PDF Generation Fails**:
   - Install Pandoc and Tectonic
   - Verify Mermaid CLI is installed
   - Check diagram syntax

### Emergency Procedures

1. **Site Down**:
   - Check deployment logs
   - Verify DNS propagation
   - Check SSL certificate

2. **Security Incident**:
   - Revoke compromised certificates
   - Rotate API keys
   - Deploy emergency patch

## Support

For issues related to:
- **Docusaurus**: Check [Docusaurus documentation](https://docusaurus.io/docs)
- **Deployment**: Refer to platform-specific documentation
- **Security**: Follow security best practices guide

Remember to keep this checklist updated with any platform-specific requirements or additional steps specific to your deployment environment.