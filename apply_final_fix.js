const fs = require('fs');
const path = 'index.html';

// Use a buffer and decode to handle potentially corrupted encoding
const buf = fs.readFileSync(path);
let content = buf.toString('utf8');

// If it looks like Mojibake (corrupted characters), try to find a clean part or re-read
// For now, we perform common fixes

// 1. Article Link for custom-domain-migration.html
const newArticleHtml = `
                            <article class="article-card wrap" style="border: 2px solid #16a085;">
                                <div class="card-content">
                                    <p class="meta"><time>2026/03/03</time> <span class="badge" style="background: #16a085; color:#fff; padding:2px 8px; border-radius:10px; font-size:0.8em; font-weight:bold;">NEW</span></p>
                                    <h3 class="title"><a href="./articles/custom-domain-migration.html">【実録】エックスサーバーからGitHub Pagesへ！サクッと独自ドメインを移行して年間維持費を0円にした完全手順</a></h3>
                                    <p class="description">脱WordPressシリーズ第2弾！エックスサーバーで管理していた独自ドメインを、無料で使えるGitHub Pagesの爆速サーバーに接続し直す手順を画像付きで分かりやすく解説します。</p>
                                    <p class="cat"><a href="#" style="border-color:#16a085; color:#16a085;">副業・稼ぎ方</a></p>
                                    <div class="readmore"><a href="./articles/custom-domain-migration.html">READ MORE</a></div>
                                </div>
                            </article>`;

// Find where to insert (before the first existing article)
// Based on previous reads, the first article often follows a specific pattern
if (content.includes('class="article-card wrap"') && !content.includes('custom-domain-migration.html')) {
    content = content.replace(/<article class="article-card wrap"/, newArticleHtml + '\n                            <article class="article-card wrap"');
    console.log('Inserted new article link into index.html');
}

// 2. Favicon Fix (ensure it is in head)
if (!content.includes('rel="icon"')) {
    content = content.replace('<head>', '<head>\n    <link rel="icon" href="./assets/img/cryptninjya01jin.png">');
    console.log('Added missing favicon tag');
}

// 3. OGP Image path fix
content = content.replace(/cryptninjya01jin\.png\.html/g, 'cryptninjya01jin.png');

fs.writeFileSync(path, content, 'utf8');
console.log('Finished updating index.html');
