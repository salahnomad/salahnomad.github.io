$SCSS_FILE = "H:\Salah-Nomad\NewBlog\themes\salah-nomad-theme\assets\scss\pages\start-here-v2.scss"

Write-Host "?? Correction de l'erreur SCSS..." -ForegroundColor Yellow
Copy-Item $SCSS_FILE "$SCSS_FILE.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
$content = Get-Content $SCSS_FILE -Raw
$content = $content -replace 'rgba\(\$color-text-accent-rgb, 0\.2\)', 'rgba(244, 162, 97, 0.2)'
$content = $content -replace 'rgba\(\$color-text-accent-rgb, 0\.3\)', 'rgba(244, 162, 97, 0.3)'
$content = $content -replace 'rgba\(\$color-text-accent-rgb, 0\.15\)', 'rgba(244, 162, 97, 0.15)'
$content = $content -replace 'rgba\(\$color-text-accent-rgb, 0\.1\)', 'rgba(244, 162, 97, 0.1)'
$content | Set-Content $SCSS_FILE -Encoding UTF8
Write-Host "? Erreur SCSS corrigée !" -ForegroundColor Green
hugo --gc --minify
