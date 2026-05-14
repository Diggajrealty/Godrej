const fs = require('fs');

const newCss = `    <style>
      /* Fix Nav visibility on light pages */
      #main-nav.at-top { background: #1B3A2D !important; border-bottom: 1px solid rgba(201,168,76,0.2) !important; }
      
      /* Enhanced Blog Layout */
      .single-blog-sec { padding: 9rem 2rem 5rem; background: #F5F0E8; min-height: 80vh; }
      .single-blog-inner { max-width: 900px; margin: 0 auto; background: #fff; padding: 4rem; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); }
      
      .single-blog-header { text-align: center; margin-bottom: 3rem; }
      .single-blog-tag { background: #1B3A2D; color: #C9A84C; padding: 0.4rem 1.2rem; font-size: 0.75rem; font-weight: 700; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block; margin-bottom: 1.5rem; }
      .single-blog-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1B3A2D; margin-bottom: 1rem; line-height: 1.2; padding: 0 2rem; }
      
      .single-blog-img { width: calc(100% + 4rem); margin-left: -2rem; aspect-ratio: 21/9; overflow: hidden; border-radius: 12px; margin-bottom: 3rem; box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
      .single-blog-img img { width: 100%; height: 100%; object-fit: cover; }
      
      @media (max-width: 768px) {
        .single-blog-img { width: 100%; margin-left: 0; aspect-ratio: 16/9; }
        .single-blog-inner { padding: 2rem 1.5rem; }
        .single-blog-title { font-size: 2rem; padding: 0; }
        .single-blog-sec { padding: 8rem 1rem 3rem; }
      }
      
      .single-blog-content { font-size: 1.1rem; color: #4a4a4a; line-height: 1.9; font-family: 'DM Sans', sans-serif; }
      .single-blog-content h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #1B3A2D; margin: 2.5rem 0 1rem; border-bottom: 1px solid rgba(201,168,76,0.3); padding-bottom: 0.5rem; }
      .single-blog-content p { margin-bottom: 1.5rem; }

      /* TOC & Key Takeaways */
      .toc { background: #fdfbf7; border: 1px solid rgba(201,168,76,0.3); border-left: 4px solid #C9A84C; padding: 2rem; border-radius: 12px; margin-bottom: 2.5rem; }
      .toc p strong { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #1B3A2D; display: block; margin-bottom: 1rem; }
      .toc ol { margin-left: 1.2rem; }
      .toc li { margin-bottom: 0.8rem; color: #1B3A2D; font-weight: 500; }
      .toc a { color: #5a5a5a; text-decoration: none; font-weight: 400; transition: 0.2s; border-bottom: 1px solid transparent; }
      .toc a:hover { color: #C9A84C; border-bottom: 1px solid #C9A84C; }

      .key-takeaways { background: rgba(27,58,45,0.03); border: 1px solid rgba(27,58,45,0.1); border-radius: 12px; padding: 2rem; margin-bottom: 2.5rem; }
      .key-takeaways p strong { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #1B3A2D; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.2rem; }
      .key-takeaways ul { margin-left: 1.5rem; list-style-type: none; }
      .key-takeaways li { margin-bottom: 0.8rem; position: relative; color: #4a4a4a; font-weight: 500; }
      .key-takeaways li::before { content: '✦'; position: absolute; left: -1.5rem; color: #C9A84C; font-size: 0.9rem; top: 0.2rem; }

      /* FAQs */
      .article-faq { margin-top: 3rem; background: #fdfbf7; border: 1px solid rgba(201,168,76,0.2); padding: 2.5rem; border-radius: 12px; }
      .article-faq h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #1B3A2D; margin-bottom: 1.5rem; }
      .article-faq details { margin-bottom: 1.2rem; border-bottom: 1px solid rgba(27,58,45,0.1); padding-bottom: 1.2rem; cursor: pointer; }
      .article-faq details:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
      .article-faq summary { font-weight: 600; font-size: 1.1rem; color: #1B3A2D; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'Playfair Display', serif; }
      .article-faq summary::-webkit-details-marker { display: none; }
      .article-faq summary::after { content: '+'; color: #C9A84C; font-size: 1.8rem; font-weight: 300; transition: 0.3s; }
      .article-faq details[open] summary::after { transform: rotate(45deg); }
      .article-faq p { margin-top: 1rem; font-size: 1rem; color: #5a5a5a; line-height: 1.7; }

      .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: #1B3A2D; font-weight: 600; text-decoration: none; margin-bottom: 2rem; transition: 0.3s; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid rgba(27,58,45,0.2); padding: 0.6rem 1.2rem; border-radius: 50px; }
      .back-link:hover { background: #1B3A2D; color: #fff; border-color: #1B3A2D; }
    </style>`;

const blogFiles = [
    'blog-investment-corridor.html',
    'blog-vanantara-vs-others.html',
    'blog-pink-line-metro.html',
    'blog-forest-living-philosophy.html',
    'blog-rera-approval.html',
    'blog-2bhk-vs-3bhk.html'
];

blogFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let html = fs.readFileSync(file, 'utf8');
        
        // replace style
        html = html.replace(/<style>\s*\.single-blog-sec \{[\s\S]*?<\/style>/, newCss);
        
        // replace header layout
        const regex = /(<a href="index\.html#blog" class="back-link">)←( Back to Blogs<\/a>)\s*<br>\s*<span class="single-blog-tag">(.*?)<\/span>\s*<h1 class="single-blog-title">(.*?)<\/h1>/;
        const replacement = `$1<span>←</span>$2\n        <div class="single-blog-header">\n          <span class="single-blog-tag">$3</span>\n          <h1 class="single-blog-title">$4</h1>\n        </div>`;
        html = html.replace(regex, replacement);
        
        fs.writeFileSync(file, html, 'utf8');
    }
});
