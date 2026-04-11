import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update favicons properly first
html = html.replace('<link rel="icon" type="image/png" href="assets/showroom_bg.png">', 
                    '<link rel="icon" type="image/png" href="assets/favicon-32x32.png">')
html = html.replace('<link rel="apple-touch-icon" href="assets/showroom_bg.png">', 
                    '<link rel="apple-touch-icon" href="assets/icon-192x192.png">')

# 2. Update OG and Twitter images (can use showroom interior)
html = html.replace('content="https://royalbatteries.netlify.app/assets/showroom_bg.png"', 
                    'content="https://royalbatteries.netlify.app/assets/images/showroom_interior.png"')

# 3. Preload image
html = html.replace('<link rel="preload" as="image" href="assets/showroom_bg.png" fetchpriority="high">', 
                    '<link rel="preload" as="image" href="assets/images/showroom_interior.png" fetchpriority="high">')

# 4. Hero section bg
html = html.replace('<img src="assets/showroom_bg.png" alt="Royal Batteries Premium EXIDE CARE Showroom" class="hero-bg-img"',
                    '<img src="assets/images/showroom_interior.png" alt="Royal Batteries Premium EXIDE CARE Showroom" class="hero-bg-img"')

# 5. Gallery / Showcase replacements
# expert_portrait -> expert_at_work
html = html.replace('src="assets/expert_portrait.png"', 'src="assets/images/expert.png"')

# hero_bg used as a side showcase photo -> service_bay
html = html.replace('src="assets/hero_bg.png"', 'src="assets/images/service_bay.png"')

# remaining showroom_bg.png -> showroom_interior.png
html = html.replace('src="assets/showroom_bg.png"', 'src="assets/images/showroom_interior.png"')

# Any battery_showcase.png 
html = html.replace('src="assets/battery_showcase.png"', 'src="assets/images/battery_shelf.png"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html")
